CREATE database toodai;

CREATE TABLE users (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	username varchar(50) NOT NULL,
	password varchar(60) NOT NULL, --60 characters is the length of bcrypt hashes
	enabled TINYINT(1) NOT NULL DEFAULT 1,
	PRIMARY KEY (id)
) ENGINE=InnoDB;


CREATE TABLE authorities (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	username varchar(50) NOT NULL,
	authority varchar(50) NOT NULL,
	PRIMARY KEY (id)
)ENGINE=InnoDB;

INSERT INTO users (username, password, enabled) VALUES ('mario', '$2a$10$WXoyyr0B9koAcfSpq0rlJOb75Z7xbnRyo8YQQi3r8m9Ox.ixk.0pq', true);
INSERT INTO authorities (username, authority) VALUES ('mario', 'USER');