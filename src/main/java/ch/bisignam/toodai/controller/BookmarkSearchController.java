package ch.bisignam.toodai.controller;

import ch.bisignam.toodai.dto.BookmarkDTO;
import ch.bisignam.toodai.service.BookmarksSearchService;
import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookmarks/search")
public class BookmarkSearchController {

  private final BookmarksSearchService bookmarksSearchService;

  @Autowired
  public BookmarkSearchController(
      BookmarksSearchService bookmarksSearchService) {
    this.bookmarksSearchService = bookmarksSearchService;
  }

  @GetMapping(path = "/tagsSuggestions")
  public List<String> getTagSuggestions(@RequestParam String tag) {
    return bookmarksSearchService.fetchTagSuggestions(tag);
  }

  @GetMapping("/bookmarks")
  public Page<BookmarkDTO> searchBookmarks(
      @RequestParam(required = false) List<String> tags,
      @RequestParam String search, @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int pageSize) {
    return bookmarksSearchService.searchBookmarks(tags == null ? new LinkedList<>() : tags, search,
        page, pageSize);
  }
}
