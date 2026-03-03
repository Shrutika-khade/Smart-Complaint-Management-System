package com.project.complaint.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfig {

@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth

            // Public
            .requestMatchers("/api/auth/**").permitAll()

            // ADMIN only
            .requestMatchers("/api/admin/**").hasRole("ADMIN")

            // USER + ADMIN
            .requestMatchers("/api/complaints/**").hasAnyRole("USER", "ADMIN")

            // Everything else secure
            .anyRequest().authenticated()
        )
        .httpBasic(Customizer.withDefaults());

     return http.build();
    }
}