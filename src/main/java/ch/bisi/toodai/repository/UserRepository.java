package ch.bisi.toodai.repository;

import static ch.bisi.toodai.jooqgenerated.tables.Users.USERS;

import org.jooq.DSLContext;
import org.jooq.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ch.bisi.toodai.jooqgenerated.tables.records.UsersRecord;

@Repository
public class UserRepository {

	@Autowired
	private DSLContext dslContext;
	
	public UsersRecord findByUsername(String username){
		return this.dslContext.selectFrom(USERS).where(USERS.USERNAME.eq(username)).fetchOne();
	}
}
