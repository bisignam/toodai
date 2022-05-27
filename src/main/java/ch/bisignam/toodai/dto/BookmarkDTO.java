package ch.bisignam.toodai.dto;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

public class BookmarkDTO {

  private long id = -1;
  private String title;
  @NotEmpty
  @URL
  private String url;
  @Length(max = 5000)
  private String description;
  private List<String> tags;
  @NotNull
  private LocalDateTime creationDateTime;
  @NotNull
  private Boolean toRead;

  private Map<String, List<String>> highlights = new HashMap<>();

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String extended) {
    this.description = extended;
  }

  public List<String> getTags() {
    return tags;
  }

  public void setTags(List<String> tags) {
    this.tags = tags;
  }

  public LocalDateTime getCreationDateTime() {
    return creationDateTime;
  }

  public void setCreationDateTime(LocalDateTime creationDateTime) {
    this.creationDateTime = creationDateTime;
  }

  public Boolean getToRead() {
    return toRead;
  }

  public void setToRead(Boolean toRead) {
    this.toRead = toRead;
  }

  public void setHighlights(Map<String, List<String>> highlights) {
    this.highlights = highlights;
  }

  public Map<String, List<String>> getHighlights() {
    return highlights;
  }

  public BookmarkDTO withHighlights(Map<String, List<String>> highlights) {
    this.highlights = highlights;
    return this;
  }

}
