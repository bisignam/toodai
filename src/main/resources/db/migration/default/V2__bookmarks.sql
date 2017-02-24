CREATE TABLE bookmarks (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	user_id BIGINT(20) NOT NULL,
	title varchar(255) NOT NULL,
	url varchar(255) NOT NULL,
	description varchar(500),
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE tags (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	name varchar(100),
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE tagsref (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	bookmark_id BIGINT(20) NOT NULL,
	tag_id BIGINT(20) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (bookmark_id) REFERENCES bookmarks(id),
	FOREIGN KEY (tag_id) REFERENCES tags(id)
) ENGINE=InnoDB;
