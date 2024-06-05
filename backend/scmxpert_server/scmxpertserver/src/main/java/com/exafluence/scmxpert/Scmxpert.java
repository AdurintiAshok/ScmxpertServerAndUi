package com.exafluence.scmxpert;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class Scmxpert {
	public static void main(String[] args) {
		SpringApplication.run(Scmxpert.class, args);
	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();

		// Set allowed origins (e.g., "http://localhost:5500" or "*" for any)
		config.addAllowedOrigin("*");


		// Set allowed HTTP methods (e.g., GET, POST, PUT, DELETE)
		config.addAllowedMethod("*");

		// Set allowed headers (e.g., "content-type, authorization")
		config.addAllowedHeader("*");

		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

}
