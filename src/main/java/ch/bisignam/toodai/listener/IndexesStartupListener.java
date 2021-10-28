package ch.bisignam.toodai.listener;

import static ch.bisignam.toodai.common.Constants.BOOKMARKS_INDEX;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.ResourceUtil;
import org.springframework.data.elasticsearch.core.document.Document;
import org.springframework.data.elasticsearch.core.index.Settings;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class IndexesStartupListener {

  public static final String ELASTICSEARCH_SETTINGS_BOOKMARKS_JSON = "elasticsearch/settings/bookmarks.json";
  public static final String ELASTICSEARCH_MAPPINGS_BOOKMARKS_JSON = "elasticsearch/mappings/bookmarks.json";
  private final ElasticsearchOperations elasticsearchOperations;

  public IndexesStartupListener(
      ElasticsearchOperations elasticsearchOperations) {
    this.elasticsearchOperations = elasticsearchOperations;
  }

  @EventListener
  public void onApplicationEvent(ContextRefreshedEvent event) {
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
        log.info("Reindexing {}", BOOKMARKS_INDEX);
        indexOperations.delete(); //TODO better to do a swap using aliases
        createIndex(indexOperations, settings, mapping);
      } else {
        log.info("Index {} configuration has not changed, nothing to do", BOOKMARKS_INDEX);
      }
    } else {
      log.info("Index {} doesn't exist", BOOKMARKS_INDEX);
      log.info("Creating index {}", BOOKMARKS_INDEX);
      createIndex(indexOperations, settings, mapping);
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

  private void createIndex(IndexOperations indexOperations, Settings settings,
      Document mapping) {
    indexOperations
        .create(settings, mapping);
    Map<String, Object> hashMetaData = new HashMap<>();
    String currentConfigurationHash = computeHashFromConfiguration(settings, mapping);
    log.info("Storing hash _meta field with value {} in index {}",
        currentConfigurationHash,
        indexOperations.getIndexCoordinates().getIndexName());
    hashMetaData.put("_meta",
        Collections.singletonMap("hash", currentConfigurationHash));
    indexOperations.putMapping(Document.from(hashMetaData));
  }

  private String computeHashFromConfiguration(Settings settings, Document mapping) {
    return DigestUtils
        .md5Hex(settings.toJson() + mapping.toJson()).toUpperCase();
  }

}