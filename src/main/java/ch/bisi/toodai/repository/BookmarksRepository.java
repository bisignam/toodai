package ch.bisi.toodai.repository;

import static ch.bisi.toodai.jooqgenerated.tables.Bookmarks.BOOKMARKS;

import org.jooq.DSLContext;
import org.jooq.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ch.bisi.toodai.jooqgenerated.tables.records.BookmarksRecord;

@Repository
public class BookmarksRepository {
	
	@Autowired
	private DSLContext dsl;

	public Result<BookmarksRecord> findByUser(Long userId){
		return dsl.selectFrom(BOOKMARKS).where(BOOKMARKS.USER_ID.equal(userId)).fetch();
	}
}
