package com.wecp.event_management_system.config;

import com.wecp.event_management_system.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsService userDetailsService;
    private final JwtRequestFilter jwtRequestFilter;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfig(UserDetailsService userDetailsService,
                          JwtRequestFilter jwtRequestFilter,
                          PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/user/register").permitAll()
                .antMatchers(HttpMethod.POST, "/api/user/login").permitAll()
                .antMatchers(HttpMethod.GET, "/api/user/users").permitAll()
                .antMatchers(HttpMethod.POST, "/api/planner/event").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/planner/event/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/api/planner/events").permitAll()
                .antMatchers(HttpMethod.POST, "/api/planner/task").permitAll()
                .antMatchers(HttpMethod.GET, "/api/staff/all").permitAll()
                .antMatchers(HttpMethod.POST, "/api/planner/tasks/{taskId}/assign/{staffId}").permitAll()
                .antMatchers(HttpMethod.GET, "/api/staff/tasks/{staffId}").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/staff/tasks/{taskId}").permitAll()
                .antMatchers(HttpMethod.GET, "/api/client/events").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/client/event/{eventId}").permitAll()
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
}