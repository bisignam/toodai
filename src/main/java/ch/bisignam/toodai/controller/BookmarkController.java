package ch.bisignam.toodai.controller;

import ch.bisignam.toodai.dto.BookmarkDTO;
import ch.bisignam.toodai.service.BookmarkService;
import ch.bisignam.toodai.service.UserService;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

  private final ModelMapper modelMapper;

  private final UserService userService;

  private final BookmarkService bookmarkService;

  @Autowired
  public BookmarkController(ModelMapper modelMapper,
      UserService userService, BookmarkService bookmarkService) {
    this.modelMapper = modelMapper;
    this.userService = userService;
    this.bookmarkService = bookmarkService;
  }

  @PostMapping
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  public void create(@RequestBody BookmarkDTO bookmarkDTO, HttpServletRequest req) {
    bookmarkService
        .create(userService.whoami(req), bookmarkDTO);
  }

  @DeleteMapping("/{bookmarkId}")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  public void delete(@PathVariable Long bookmarkId) {
    bookmarkService.delete(bookmarkId);
  }

  @PutMapping
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  public void update(@RequestBody BookmarkDTO bookmarkDTO, HttpServletRequest req) {
    bookmarkService
        .update(bookmarkDTO);
  }

  @GetMapping(value = "/myBookmarks")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  public Page<BookmarkDTO> myBookmarks(@RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int pageSize, HttpServletRequest req) {
    return bookmarkService.getBookmarks(userService.whoami(req), page, pageSize);
  }

  @PostMapping(value = "/import")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  public void importBookmarks(@RequestParam("file") MultipartFile file, HttpServletRequest req)
      throws IOException {
    bookmarkService.importBookmarks(file.getInputStream(), userService.whoami(req));
  }

}
