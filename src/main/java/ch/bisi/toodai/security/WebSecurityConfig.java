package ch.bisi.toodai.security;

import java.util.Arrays;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import ch.bisi.toodai.security.jwt.JwtAuthenticationEntryPoint;
import ch.bisi.toodai.security.jwt.JwtAuthenticationProcessingFilter;
import ch.bisi.toodai.security.jwt.JwtAuthenticationProvider;
import ch.bisi.toodai.security.util.MatchAllExcept;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationProvider tokenAuthenticationProvider;

	@Autowired
	private JwtAuthenticationEntryPoint authenticationEntryPoint;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private AuthenticationFailureHandler failureHandler;
	
	@Autowired
	private AuthenticationSuccessHandler successHandler;

	@Autowired
	private javax.sql.DataSource dataSource;

	/** Paths not subject to the authentication process **/
	private String[] unsecuredPaths = new String[]{"/", "/**/*.css", "/**/*.html", "/**/*.js", "/**/*.woff", "/**/*.woff2", "/**/*.ttf", "/favicon.ico", "/login", "/home"};
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable() // JWT is protected against csrf attacks
				.exceptionHandling()
				.authenticationEntryPoint(authenticationEntryPoint)
					.and()
				.authorizeRequests()
					.antMatchers(unsecuredPaths).permitAll()
					.anyRequest().authenticated()
					.and()
				.sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
					.and()
				.formLogin()
					.loginPage("/login")
					.successHandler(successHandler)
					.failureHandler(failureHandler)
					.and()
				.logout()
					.permitAll()
					.and()
				.addFilterBefore(buildJwtTokenAuthenticationProcessingFilter(),
						UsernamePasswordAuthenticationFilter.class);
	}

	private Filter buildJwtTokenAuthenticationProcessingFilter() {
		JwtAuthenticationProcessingFilter filter = new JwtAuthenticationProcessingFilter(failureHandler,
				new MatchAllExcept(Arrays.asList(unsecuredPaths)));
		filter.setAuthenticationManager(authenticationManager);
		return filter;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		JdbcDaoImpl userDetailsJdbc = new JdbcDaoImpl();
		userDetailsJdbc.setEnableAuthorities(true);
		userDetailsJdbc.setEnableGroups(false);
		userDetailsJdbc.setDataSource(dataSource);
		auth.userDetailsService(userDetailsJdbc).passwordEncoder(new BCryptPasswordEncoder());
		auth.authenticationProvider(tokenAuthenticationProvider); //add token auth provider
	}

}