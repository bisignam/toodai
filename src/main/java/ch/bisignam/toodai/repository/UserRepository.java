package ch.bisignam.toodai.repository;


import ch.bisignam.toodai.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Integer > {

  boolean existsByUsername(String username);

  User findByUsername(String username);

  void deleteByUsername(String username);

}
