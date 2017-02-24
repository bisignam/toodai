package ch.bisi.toodai.repository;

import static ch.bisi.toodai.jooqgenerated.tables.Bookmarks.BOOKMARKS;
import static ch.bisi.toodai.jooqgenerated.tables.Tags.TAGS;
import static ch.bisi.toodai.jooqgenerated.tables.Tagsref.TAGSREF;

import org.jooq.DSLContext;
import org.jooq.Record1;
import org.jooq.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TagsRepository {

	@Autowired
	private DSLContext dslContext;

	public Result<Record1<String>> findTagsByBookmark(Long bookmarkId) {
		return dslContext.select(TAGS.NAME).from(BOOKMARKS).join(TAGSREF).onKey()
					.join(TAGS).onKey().where(BOOKMARKS.ID.equal(bookmarkId)).fetch();
	}
}
