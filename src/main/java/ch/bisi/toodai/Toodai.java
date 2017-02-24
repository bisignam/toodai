package ch.bisi.toodai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication
@EnableAutoConfiguration(exclude={FlywayAutoConfiguration.class})
public class Toodai {

	public static void main(String[] args) {
		SpringApplication.run(Toodai.class, args);			
	}

}