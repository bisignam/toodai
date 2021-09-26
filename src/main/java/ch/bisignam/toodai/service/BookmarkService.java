package ch.bisignam.toodai.service;

import ch.bisignam.toodai.dto.BookmarkDTO;
import ch.bisignam.toodai.dto.PinboardBookmarkImportDto;
import ch.bisignam.toodai.model.Bookmark;
import ch.bisignam.toodai.model.User;
import ch.bisignam.toodai.repository.BookmarkRepository;
import ch.bisignam.toodai.security.SecurityUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.primitives.Booleans;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.BooleanUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookmarkService {

  private final BookmarkRepository bookmarkRepository;

  private final ModelMapper modelMapper;

  private final ObjectMapper objectMapper;

  private final SecurityUtils securityUtils;

  @Autowired
  public BookmarkService(BookmarkRepository bookmarkRepository,
      ModelMapper modelMapper,
      ObjectMapper objectMapper, SecurityUtils securityUtils) {
    this.bookmarkRepository = bookmarkRepository;
    this.modelMapper = modelMapper;
    this.objectMapper = objectMapper;
    this.securityUtils = securityUtils;
  }

  public void create(User user, BookmarkDTO bookmarkDTO) {
    Bookmark bookmark = modelMapper.map(bookmarkDTO, Bookmark.class);
    bookmark.setUser(user);
    bookmarkRepository.save(bookmark);
  }

  public void delete(Long id) {
    Optional<Bookmark> bookmark = bookmarkRepository.findById(id);
    if (bookmark.isPresent() && bookmark.get().getUser() != null
        && bookmark.get().getUser()
        .getUsername()
        .equals(securityUtils.getCurrentPrincipal())) {
      bookmarkRepository.deleteById(id);
    } else {
      throw new IllegalStateException(
          "(Delete Operation) The bookmark with id " + id
              + " you are trying to delete doesn't exist or doesn't belong to the currently logged user");
    }
  }

  public void importBookmarks(InputStream inputStream, User user) throws IOException {
    try (InputStreamReader inputStreamReader = new InputStreamReader(inputStream)) {
      PinboardBookmarkImportDto[] importedBookmarks = objectMapper
          .readerFor(PinboardBookmarkImportDto[].class).readValue(inputStreamReader);
      List<BookmarkDTO> bookmarksToImport = new LinkedList<>();
      for (PinboardBookmarkImportDto importedBookmark : importedBookmarks) {
        BookmarkDTO bookmarkDTO = new BookmarkDTO();
        bookmarkDTO.setUrl(importedBookmark.getHref());
        bookmarkDTO.setTitle(importedBookmark.getDescription());
        bookmarkDTO.setDescription(importedBookmark.getExtended());
        bookmarkDTO.setToRead(BooleanUtils.toBoolean(importedBookmark.getToread(), "yes", "no"));
        bookmarkDTO.setCreationDateTime(importedBookmark.getTime());
        bookmarkDTO.setTags(Arrays.asList(importedBookmark.getTags().split(" ")));
        bookmarksToImport.add(bookmarkDTO);
      }
      create(user, bookmarksToImport);
    }
  }

  private void create(User user, List<BookmarkDTO> bookmarkDTOs) {
    List<Bookmark> bookmarks = bookmarkDTOs.stream()
        .map(dto -> modelMapper.map(dto, Bookmark.class)).collect(
            Collectors.toList());
    bookmarks.forEach(b -> b.setUser(user));
    bookmarkRepository.saveAll(bookmarks);
  }

  public Page<BookmarkDTO> getBookmarks(User user, int page, int size) {
    return bookmarkRepository.findByUser(user, Pageable.ofSize(size).withPage(page))
        .map((bookmark) -> modelMapper.map(bookmark, BookmarkDTO.class));
  }

  public void update(BookmarkDTO bookmarkDTO) {
    if (bookmarkDTO.getId() < 0) {
      throw new IllegalArgumentException(
          "The input bookmark dto doesn't have an id");
    }
    Optional<Bookmark> bookmark = bookmarkRepository.findById(bookmarkDTO.getId());
    if (bookmark.isPresent() && bookmark.get().getUser() != null
        && bookmark.get().getUser()
        .getUsername()
        .equals(securityUtils.getCurrentPrincipal())) {
      Bookmark updatedBookmark = modelMapper.map(bookmarkDTO, Bookmark.class);
      bookmarkRepository.save(updatedBookmark);
    } else {
      throw new IllegalStateException(
          "The bookmark with id " + bookmarkDTO.getId()
              + " you are trying to update doesn't exist or doesn't belong to the currently logged user");
    }
  }
}
