package ch.bisi.toodai.security.jwt;

import org.springframework.security.core.AuthenticationException;

public class JwtExpiredTokenException extends AuthenticationException {

	public JwtExpiredTokenException(String msg) {
		super(msg);
	}

}
