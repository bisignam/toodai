CREATE TABLE users (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	username varchar(50) NOT NULL,
	password varchar(60) NOT NULL, -- 60 characters is the length of bcrypt hashes
	enabled TINYINT(1) NOT NULL DEFAULT 1,
	PRIMARY KEY (id)
) ENGINE=InnoDB;


CREATE TABLE authorities (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	username varchar(50) NOT NULL,
	authority varchar(50) NOT NULL,
	PRIMARY KEY (id)
)ENGINE=InnoDB;