package ch.bisignam.toodai.dto;

import java.time.LocalDateTime;

/**
 *  Format example:
 *
 * * {"href":"http:\/\/stackoverflow.com\/questions\/173919\/is-there-a-theirs-version-of-git-merge-s-ours","description":"Is
 * * there a \"theirs\" version of \"git merge -s ours\"? - Stack Overflow","extended":"","meta":"61e62daf8e20ad462fb30cfd71855a3a",
 * * "hash":"907c2d250125d0c2571f8e56106cfd2f","time":"2016-05-19T09:18:17Z","shared":"yes","toread":"no","tags":"git
 * * merge theirs"}
 *
 */
public class PinboardBookmarkImportDto {

  private String href;
  private String description;
  private String extended;
  private String meta;
  private String hash;
  private LocalDateTime time;
  private String shared;
  private String toread;
  private String tags;

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getHref() {
    return href;
  }

  public void setHref(String href) {
    this.href = href;
  }

  public String getExtended() {
    return extended;
  }

  public void setExtended(String extended) {
    this.extended = extended;
  }

  public String getMeta() {
    return meta;
  }

  public void setMeta(String meta) {
    this.meta = meta;
  }

  public String getHash() {
    return hash;
  }

  public void setHash(String hash) {
    this.hash = hash;
  }

  public LocalDateTime getTime() {
    return time;
  }

  public void setTime(LocalDateTime time) {
    this.time = time;
  }

  public String getShared() {
    return shared;
  }

  public void setShared(String shared) {
    this.shared = shared;
  }

  public String getToread() {
    return toread;
  }

  public void setToread(String toread) {
    this.toread = toread;
  }

  public String getTags() {
    return tags;
  }

  public void setTags(String tags) {
    this.tags = tags;
  }
}
