package ch.bisignam.toodai.model.elastic;

import static ch.bisignam.toodai.common.Constants.BOOKMARKS_INDEX;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName=BOOKMARKS_INDEX, createIndex = false)
public class Bookmark {

  @Id
  private String id;

  @Field(type = FieldType.Text)
  private String title;

  @Field(type = FieldType.Text)
  private String url;

  @Field(type = FieldType.Text)
  private String description;

  @Field
  private List<String> tags;

  @Field(type = FieldType.Boolean)
  private Boolean toRead;

  @Field(type = FieldType.Date, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
  private LocalDateTime creationDateTime;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public String getUrl() {
    return url;
  }

  public String getDescription() {
    return description;
  }

  public List<String> getTags() {
    return tags;
  }

  public void setTags(List<String> tags) {
    this.tags = tags;
  }

  public Boolean getToRead() {
    return toRead;
  }

  public LocalDateTime getCreationDateTime() {
    return creationDateTime;
  }
}
