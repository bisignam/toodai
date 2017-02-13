package ch.bisi.toodai.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtSettings {

    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.issuer}")
    private String issuer;
    
    @Value("${jwt.expirationTime}")
    private String expirationTime;
    
    public String getIssuer() {
		return issuer;
	}
    
    public String getSecret() {
		return secret;
	}
    
    public Integer getExpirationTime() {
		return Integer.valueOf(expirationTime);
	}
}
