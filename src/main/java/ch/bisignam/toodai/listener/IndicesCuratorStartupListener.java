package ch.bisignam.toodai.listener;

import static ch.bisignam.toodai.common.Constants.BOOKMARKS_INDEX;

import java.io.IOException;
import java.time.Instant;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.reindex.ReindexRequest;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.ResourceUtil;
import org.springframework.data.elasticsearch.core.document.Document;
import org.springframework.data.elasticsearch.core.index.AliasAction;
import org.springframework.data.elasticsearch.core.index.AliasActionParameters;
import org.springframework.data.elasticsearch.core.index.AliasActions;
import org.springframework.data.elasticsearch.core.index.AliasData;
import org.springframework.data.elasticsearch.core.index.Settings;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class IndicesCuratorStartupListener {

  public static final String ELASTICSEARCH_SETTINGS_BOOKMARKS_JSON = "elasticsearch/settings/bookmarks.json";
  public static final String ELASTICSEARCH_MAPPINGS_BOOKMARKS_JSON = "elasticsearch/mappings/bookmarks.json";

  private final ElasticsearchOperations elasticsearchOperations;
  private final RestHighLevelClient restHighLevelClient;

  public IndicesCuratorStartupListener(
      ElasticsearchOperations elasticsearchOperations,
      RestHighLevelClient restHighLevelClient) {
    this.elasticsearchOperations = elasticsearchOperations;
    this.restHighLevelClient = restHighLevelClient;
  }

  //The event specification is needed in order to tell spring to only perform reindexing checks after all beans in the context are available
  @SuppressWarnings("unused")
  @EventListener
  public void onApplicationEvent(ContextRefreshedEvent event) throws IOException {
    log.info("Startup check for index: {}", BOOKMARKS_INDEX);
    Settings settings = Settings
        .parse(ResourceUtil.readFileFromClasspath(ELASTICSEARCH_SETTINGS_BOOKMARKS_JSON));
    Document mapping = Document
        .parse(ResourceUtil.readFileFromClasspath(ELASTICSEARCH_MAPPINGS_BOOKMARKS_JSON));
    IndexOperations indexOperations = elasticsearchOperations
        .indexOps(IndexCoordinates.of(BOOKMARKS_INDEX));
    if (indexOperations.exists()) {
      log.info("Index {} already exists", BOOKMARKS_INDEX);
      log.info("Checking local configuration for index {} at {} and {}", BOOKMARKS_INDEX,
          ELASTICSEARCH_SETTINGS_BOOKMARKS_JSON, ELASTICSEARCH_MAPPINGS_BOOKMARKS_JSON);
      if (hasIndexChanged(indexOperations, mapping, settings)) {
        log.info("Index {} configuration has changed", BOOKMARKS_INDEX);
        log.info("Create index and swap the index alias {} currently points to", BOOKMARKS_INDEX);
        Pair<String, String> oldAndNewIndexName = createIndexAndAlias(settings, mapping);
        reindex(oldAndNewIndexName.getLeft(), oldAndNewIndexName.getRight());
        log.info("Removing old index {}", oldAndNewIndexName.getLeft());
        elasticsearchOperations
            .indexOps(IndexCoordinates.of(oldAndNewIndexName.getLeft())).delete();
      } else {
        log.info("Index {} configuration has not changed, nothing to do", BOOKMARKS_INDEX);
      }
    } else {
      log.info("Index {} doesn't exist", BOOKMARKS_INDEX);
      log.info("Creating index {}", BOOKMARKS_INDEX);
      createIndexAndAlias(settings, mapping);
    }
  }

  private boolean hasIndexChanged(IndexOperations indexOperations,
      Document mapping, Settings settings) {
    String indexName = indexOperations.getIndexCoordinates().getIndexName();
    log.info("Checking if index {} configuration has changed", indexName);
    if (!(indexOperations.getMapping().get("_meta") instanceof Map)) {
      log.info("No _meta field present in {} index, assuming index has changed", indexName);
      return true;
    }
    Object indexHash = ((Map<?, ?>) indexOperations.getMapping().get("_meta")).get("hash");
    if (!(indexHash instanceof String)) {
      log.info("No hash _meta field present in {} index, assuming index has changed", indexName);
      return true;
    }
    String currentConfigurationHash = computeHashFromConfiguration(settings, mapping);
    log.info("Hash of current configuration {}, hash of current index {}",
        currentConfigurationHash, indexHash);
    return !indexHash
        .equals(currentConfigurationHash);
  }

  private void reindex(String oldIndexName, String newIndexName) throws IOException {
    if (oldIndexName != null && newIndexName != null) {
      log.info("Reindexing {} into {}", oldIndexName, newIndexName);
      ReindexRequest request = new ReindexRequest();
      request.setSourceIndices(oldIndexName);
      request.setDestIndex(newIndexName);
      restHighLevelClient.reindex(request, RequestOptions.DEFAULT);
    }
  }

  /**
   * Create a new bookmarks index suffixed by the current date and swap the alias to point to the
   * newly created index
   */
  private Pair<String, String> createIndexAndAlias(Settings settings,
      Document mapping) throws IOException {
    String newIndexName = BOOKMARKS_INDEX + "-" + Instant.now().toEpochMilli();
    IndexOperations indexOperations = elasticsearchOperations
        .indexOps(IndexCoordinates.of(newIndexName));
    Optional<String> oldIndexName = getCurrentIndexRoutingForAlias(indexOperations);

    AliasActions aliasActions;
    if (oldIndexName.isPresent()) {
      log.info("Alias {} currently points to index {}", BOOKMARKS_INDEX, oldIndexName.get());
      aliasActions = new AliasActions().add(
          new AliasAction.Add(AliasActionParameters.builder().withIndices(newIndexName)
              .withAliases(BOOKMARKS_INDEX)
              .build()),
          new AliasAction.Remove(
              AliasActionParameters.builder().withAliases(BOOKMARKS_INDEX)
                  .withIndices(oldIndexName.get()).build()));
    } else {
      log.info("Alias {} is currently not set", BOOKMARKS_INDEX);
      aliasActions = new AliasActions().add(
          new AliasAction.Add(AliasActionParameters.builder().withIndices(newIndexName)
              .withAliases(BOOKMARKS_INDEX)
              .build())
      );
    }

    log.info("Creating index {}", newIndexName);
    indexOperations.create(settings, mapping);
    if (oldIndexName.isPresent()) {
      log.info("Associating index {} and removing index {} from alias {}", newIndexName,
          oldIndexName.get(), BOOKMARKS_INDEX);
    } else {
      reindex(BOOKMARKS_INDEX, newIndexName);
      log.info("Removing {} index and creating an alias with same name", BOOKMARKS_INDEX);
      elasticsearchOperations
          .indexOps(IndexCoordinates.of(BOOKMARKS_INDEX)).delete();
      log.info("Associating index {} to alias {}", newIndexName,
          BOOKMARKS_INDEX);
    }
    indexOperations.alias(aliasActions);
    Map<String, Object> hashMetaData = new HashMap<>();
    String currentConfigurationHash = computeHashFromConfiguration(settings, mapping);
    log.info("Storing hash _meta field with value {} in index {}",
        currentConfigurationHash,
        newIndexName);
    hashMetaData.put("_meta",
        Collections.singletonMap("hash", currentConfigurationHash));
    indexOperations.putMapping(Document.from(hashMetaData));
    return Pair.of(oldIndexName.orElse(null), newIndexName);
  }

  private Optional<String> getCurrentIndexRoutingForAlias(IndexOperations indexOperations) {
    Map<String, Set<AliasData>> aliases = indexOperations.getAliases(BOOKMARKS_INDEX);
    if (aliases.isEmpty()) {
      return Optional.empty();
    }
    if (aliases.size() > 1) {
      throw new IllegalStateException(
          "Unexpected configuration encountered, the alias " + BOOKMARKS_INDEX
              + " has been associated to more than one index, associated indexes "
              + aliases.keySet()
              + ", please check your elasticsearch configuration or reset the indexes and aliases settings");
    }
    return Optional.ofNullable(aliases.keySet().toArray(new String[]{})[0]);
  }

  private String computeHashFromConfiguration(Settings settings, Document mapping) {
    return DigestUtils
        .md5Hex(settings.toJson() + mapping.toJson()).toUpperCase();
  }

}