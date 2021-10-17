package ch.bisignam.toodai.listener;

import ch.bisignam.toodai.model.mongo.Bookmark;
import ch.bisignam.toodai.service.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class BookmarkModelListener extends AbstractMongoEventListener<Bookmark> {

  private final SequenceGeneratorService sequenceGeneratorService;

  @Autowired
  public BookmarkModelListener(SequenceGeneratorService sequenceGeneratorService) {
    this.sequenceGeneratorService = sequenceGeneratorService;
  }

  @Override
  public void onBeforeConvert(BeforeConvertEvent<Bookmark> event) {
    if (event.getSource().getId() < 0) {
      event.getSource().setId(sequenceGeneratorService.generateSequence(Bookmark.SEQUENCE_NAME));
    }
  }

}
