package ch.bisi.toodai.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ch.bisi.toodai.dto.Bookmark;
import ch.bisi.toodai.service.BookmarkService;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarksController {
	
	@Autowired
	private BookmarkService bookmarkService;

	@RequestMapping
	public List<Bookmark> getBookmarks(@RequestParam(value = "user", required = true) String username) {
		return bookmarkService.findByUser(username);
	}
}
