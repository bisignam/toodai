package ch.bisi.toodai.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Bookmark {

	private Long id;
	private String title;
	private String url;
	private String description;
	private List<String> tags;

	public Bookmark() {
		//default constructor
	}
	
	public Bookmark(Long id, String title, String url, String description, List<String> tags) {
		super();
		this.id = id;
		this.title = title;
		this.url = url;
		this.description = description;
		this.tags = tags;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

}
