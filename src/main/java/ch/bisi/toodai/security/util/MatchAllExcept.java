package ch.bisi.toodai.security.util;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

/**
 * {@link RequestMatcher} implementation which matches all requests excepts the specified paths.
 *
 */
public class MatchAllExcept implements RequestMatcher {

	/** The paths to not match **/
	private List<String> skipPaths;

	/**
	 * Constructor for {@link MatchAllExcept}.
	 * 
	 * @param skipPaths the paths to not match
	 */
	public MatchAllExcept(List<String> skipPaths) {
		this.skipPaths = skipPaths;
	}

	
	/* (non-Javadoc)
	 * @see org.springframework.security.web.util.matcher.RequestMatcher#matches(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public boolean matches(HttpServletRequest request) {
		List<RequestMatcher> matchers = skipPaths.stream().map(path -> new AntPathRequestMatcher(path))
				.collect(Collectors.toList());
		if (new OrRequestMatcher(matchers).matches(request)) {
			return false;
		}
		return true;
	}
}
