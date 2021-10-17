package ch.bisignam.toodai.service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import ch.bisignam.toodai.model.mongo.DatabaseSequence;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class SequenceGeneratorService {

  private final MongoTemplate mongoTemplate;

  @Autowired
  public SequenceGeneratorService(MongoTemplate mongoTemplate) {
    this.mongoTemplate = mongoTemplate;
  }

  public long generateSequence(String seqName) {
    DatabaseSequence counter = mongoTemplate.findAndModify(query(where("_id").is(seqName)),
        new Update().inc("seq",1), options().returnNew(true).upsert(true),
        DatabaseSequence.class);
    return !Objects.isNull(counter) ? counter.getSeq() : 1;
  }

}
