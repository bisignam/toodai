package ch.bisi.toodai.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ch.bisi.toodai.dto.Bookmark;
import ch.bisi.toodai.jooqgenerated.tables.records.BookmarksRecord;
import ch.bisi.toodai.repository.BookmarksRepository;
import ch.bisi.toodai.repository.TagsRepository;

@Service
public class BookmarkService {

	@Autowired
	private BookmarksRepository bookmarkRepository;

	@Autowired
	private TagsRepository tagsRepository;

	public List<Bookmark> findByUser(Long userId){
		List<BookmarksRecord> bookmarksRecords = bookmarkRepository.findByUser(userId);		
		return bookmarksRecords.stream().map(r -> {
			return new Bookmark(r.getId(), r.getTitle(), r.getUrl(), 
					r.getDescription(), tagsRepository.findTagsByBookmark(r.getId()).stream().map(t -> t.value1()).collect(Collectors.toList()));
		}).collect(Collectors.toList());
	}
}
