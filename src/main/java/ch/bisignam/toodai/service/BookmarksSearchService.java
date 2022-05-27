package ch.bisignam.toodai.service;

import static ch.bisignam.toodai.common.Constants.BOOKMARKS_INDEX;

import ch.bisignam.toodai.dto.BookmarkDTO;
import ch.bisignam.toodai.model.elastic.Bookmark;
import java.util.LinkedList;
import java.util.List;
import org.apache.commons.collections.CollectionUtils;
import org.apache.lucene.util.automaton.RegExp;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.TermsQueryBuilder;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.terms.IncludeExclude;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.jetbrains.annotations.Nullable;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHitSupport;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class BookmarksSearchService {

  private static final String TAGS_AGGREGATION_NAME = "aggregate-tags";

  private final ElasticsearchOperations elasticsearchOperations;
  private final ModelMapper modelMapper;

  @Autowired
  public BookmarksSearchService(
      ElasticsearchOperations elasticsearchOperations, ModelMapper modelMapper) {
    this.elasticsearchOperations = elasticsearchOperations;
    this.modelMapper = modelMapper;
  }

  public Page<BookmarkDTO> searchBookmarks(List<String> tags, String text, int page, int pageSize) {
    MultiMatchQueryBuilder titleAndDescriptionQuery = QueryBuilders
        .multiMatchQuery(text, "title", "description");
    BoolQueryBuilder tagsAndTextQuery = QueryBuilders.boolQuery().must(titleAndDescriptionQuery);
    if (!CollectionUtils.isEmpty(tags)) {
      tagsAndTextQuery = tagsAndTextQuery.must(QueryBuilders.termsQuery("tags", tags));
    }
    Query query = new NativeSearchQueryBuilder().withPageable(
            Pageable.ofSize(pageSize).withPage(page))
        .withQuery(tagsAndTextQuery)
        .withHighlightFields(
            new HighlightBuilder.Field("title"), new HighlightBuilder.Field("description"))
        .build();
    SearchHits<Bookmark> searchHits = elasticsearchOperations
        .search(query, Bookmark.class, IndexCoordinates.of(BOOKMARKS_INDEX));
    return SearchHitSupport.searchPageFor(searchHits, query.getPageable()).map(
        bookmarkSearchHit -> modelMapper.map(bookmarkSearchHit.getContent(), BookmarkDTO.class)
            .withHighlights(bookmarkSearchHit.getHighlightFields()));
  }

  public List<String> fetchTagSuggestions(String tag) {
    TermsAggregationBuilder aggregationBuilder = new TermsAggregationBuilder(TAGS_AGGREGATION_NAME);
    aggregationBuilder.includeExclude(new IncludeExclude(new RegExp(tag + ".*"), new RegExp("#")));
    aggregationBuilder.field("tags");
    aggregationBuilder.size(10);
    Query searchQuery = new NativeSearchQueryBuilder().addAggregation(aggregationBuilder)
        .build();

    //We are only interested in aggregation results, not in the hits
    Aggregations returnedAggregations =
        elasticsearchOperations.search(searchQuery, Bookmark.class,
            IndexCoordinates.of(BOOKMARKS_INDEX)).getAggregations();

    List<String> suggestions = new LinkedList<>();
    if (returnedAggregations != null) {
      Aggregation tagsAggregationResults = returnedAggregations.get(TAGS_AGGREGATION_NAME);
      if (tagsAggregationResults instanceof ParsedStringTerms) {
        ((ParsedStringTerms) tagsAggregationResults).getBuckets()
            .forEach(bucket -> suggestions.add(bucket.getKeyAsString()));
      }
    }
    return suggestions;
  }

}
