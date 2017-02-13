package ch.bisi.toodai.security.jwt;

import org.springframework.security.core.AuthenticationException;

public class JwtTokenMissingException extends AuthenticationException {

	public JwtTokenMissingException(String message) {
		super(message);
	}

}
