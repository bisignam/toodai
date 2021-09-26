package ch.bisignam.toodai.dto;

import java.time.LocalDateTime;
import java.util.List;

public class BookmarkDTO {
  private long id = -1;
  private String title;
  private String url;
  private String extended;
  private List<String> tags;
  private LocalDateTime creationDateTime;
  private Boolean toRead;

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
    return extended;
  }

  public void setDescription(String extended) {
    this.extended = extended;
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
}
