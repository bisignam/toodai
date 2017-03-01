package ch.bisi.toodai.service;

import static ch.bisi.toodai.jooqgenerated.tables.Tags.TAGS;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ch.bisi.toodai.dto.Bookmark;
import ch.bisi.toodai.jooqgenerated.tables.records.BookmarksRecord;
import ch.bisi.toodai.repository.BookmarksRepository;
import ch.bisi.toodai.repository.TagsRepository;
import ch.bisi.toodai.repository.UserRepository;

@Service
public class BookmarkService {

	@Autowired
	private BookmarksRepository bookmarkRepository;

	@Autowired
	private TagsRepository tagsRepository;
	
	@Autowired
	private UserRepository userRepository;

	public List<Bookmark> findByUser(String username){
		Long userId = userRepository.findByUsername(username).getId();
		List<BookmarksRecord> bookmarksRecords = bookmarkRepository.findByUser(userId);		
		return bookmarksRecords.stream().map(r -> {
			return new Bookmark(r.getId(), r.getTitle(), r.getUrl(), 
					r.getDescription(), tagsRepository.findTagsByBookmark(r.getId()).stream().map(t -> t.get(TAGS.NAME)).collect(Collectors.toList()));
		}).collect(Collectors.toList());
	}
}
