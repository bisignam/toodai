package ch.bisi.toodai.security.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import ch.bisi.toodai.dto.ErrorResponse;

@Component
public class JwtAuthenticationFailureHandler implements AuthenticationFailureHandler {
	/** Bean for reading and writing JSON */
	private final ObjectMapper mapper;

	@Autowired
	public JwtAuthenticationFailureHandler(ObjectMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException e) throws IOException, ServletException {

		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);

		if (e instanceof BadCredentialsException) {
			mapper.writeValue(response.getWriter(), new ErrorResponse("Invalid username or password"));
		} else if (e instanceof JwtExpiredTokenException) {
			mapper.writeValue(response.getWriter(), new ErrorResponse("Token has expired"));
		} else if (e instanceof JwtTokenMissingException) {
			mapper.writeValue(response.getWriter(), new ErrorResponse("Token is missing"));
		}

		mapper.writeValue(response.getWriter(), new ErrorResponse("Authentication failed"));
	}
}