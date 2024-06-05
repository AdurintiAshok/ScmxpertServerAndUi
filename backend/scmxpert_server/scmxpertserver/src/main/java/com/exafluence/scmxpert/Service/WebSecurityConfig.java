package com.exafluence.scmxpert.Service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig
{
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws  Exception{
        http.cors(cors -> cors.configure(http));
//		http.headers().httpStrictTransportSecurity().disable();
//		http.cors().and().cors().disable();
        http.csrf(csrf -> csrf.disable());
//        http.authorizeHttpRequests(req -> req.requestMatchers("/auth/signUp", "/auth/signIn", "/api/samp", "/swagger-ui/**", "/v3/api-docs/**", "/auth/forgotPassword", "/auth/resetPassword").permitAll());
        http.authorizeHttpRequests(req -> req.anyRequest().permitAll());
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//        http.authenticationProvider(authenticationProvider());
//        http.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);
//        http.exceptionHandling(authentication -> authentication.authenticationEntryPoint(authenticationEntryPoint));
        return http.build();
    }
}
