package ch.bisignam.toodai.listener;

import ch.bisignam.toodai.model.mongo.User;
import ch.bisignam.toodai.service.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class UserModelListener extends AbstractMongoEventListener<User> {

  private final SequenceGeneratorService sequenceGeneratorService;

  @Autowired
  public UserModelListener(SequenceGeneratorService sequenceGeneratorService) {
    this.sequenceGeneratorService = sequenceGeneratorService;
  }

  @Override
  public void onBeforeConvert(BeforeConvertEvent<User> event) {
    if (event.getSource().getId() < 0) {
      event.getSource().setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
    }
  }

}
