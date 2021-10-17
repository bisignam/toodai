package ch.bisignam.toodai.repository.mongo;


import ch.bisignam.toodai.model.mongo.Bookmark;
import ch.bisignam.toodai.model.mongo.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookmarkRepository extends MongoRepository<Bookmark, Long> {

  Page<Bookmark> findByUser(User user, Pageable pageable);

}
