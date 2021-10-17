package ch.bisignam.toodai.service;

import ch.bisignam.toodai.model.elastic.Bookmark;
import java.util.LinkedList;
import java.util.List;
import org.apache.lucene.util.automaton.RegExp;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.terms.IncludeExclude;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class BookmarksSearchService {

  private static final String BOOKMARKS_INDEX = "bookmarks";
  private static final String TAGS_AGGREGATION_NAME = "aggregate-tags";

  private final ElasticsearchOperations elasticsearchOperations;

  @Autowired
  public BookmarksSearchService(
      ElasticsearchOperations elasticsearchOperations) {
    this.elasticsearchOperations = elasticsearchOperations;
  }

  public List<String> fetchTagSuggestions(String tag) {
    TermsAggregationBuilder aggregationBuilder = new TermsAggregationBuilder(TAGS_AGGREGATION_NAME);
    aggregationBuilder.includeExclude(new IncludeExclude(new RegExp(tag + ".*"), new RegExp("#")));
    aggregationBuilder.field("tags.keyword");
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
