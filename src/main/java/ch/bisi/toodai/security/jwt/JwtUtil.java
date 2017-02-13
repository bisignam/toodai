package ch.bisi.toodai.security.jwt;

import java.util.Date;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.lang.Collections;

@Component
public class JwtUtil {

	private final JwtSettings settings;

	@Autowired
	public JwtUtil(JwtSettings settings) {
		this.settings = settings;
	}

	/**
	 * Tries to parse specified String as a JWT token. If successful, returns
	 * {@link User} object with username and authorities filled. If unsuccessful
	 * (token is invalid or not containing all required user properties), simply
	 * returns null.
	 * 
	 * @param token
	 *            the JWT token to parse
	 * @return the User object extracted from specified token or null if a token
	 *         is invalid.
	 */
	public User parseToken(String token) {
		try {
			Claims body = Jwts.parser().setSigningKey(settings.getSecret()).parseClaimsJws(token).getBody();

			return new User(body.getSubject(), "[PROTECTED]" /* protected password */,
					AuthorityUtils.commaSeparatedStringToAuthorityList((String) body.get("scopes")));

		} catch (JwtException | ClassCastException e) {
			return null;
		}
	}

	/**
	 * Generates a JWT token containing username as subject, and authorities as
	 * claims. These properties are taken from the specified {@link User}
	 * object.
	 * 
	 * @param user
	 *            the user for which the token will be generated
	 * @return the JWT token
	 */
	public String generateToken(User user) {

		if (StringUtils.isBlank(user.getUsername())) {
			throw new IllegalArgumentException("Cannot create JWT Token: user has no username");
		}

		if (Collections.isEmpty(user.getAuthorities())) {
			throw new IllegalArgumentException("Cannot create JWT Token: user has no authorities");
		}

		Claims claims = Jwts.claims().setSubject(user.getUsername());
		claims.put("scopes", user.getAuthorities().stream().map(Object::toString).collect(Collectors.joining(",")));

		Date currentTime = new Date();
		return Jwts.builder().setClaims(claims).setIssuer(settings.getIssuer())
				.signWith(SignatureAlgorithm.HS512, settings.getSecret()).setIssuedAt(currentTime)
				.setExpiration(DateUtils.addMinutes(currentTime, settings.getExpirationTime())).compact();
	}

}