package Evive.config;

import Evive.filter.CsrfFilterHeaders;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class WebSecurityConfigurer extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception
    {
        httpSecurity.formLogin().loginPage("/html/index.html").and().csrf()
                .csrfTokenRepository(csrfTokenRepository()).and()
                .addFilterAfter(new CsrfFilterHeaders(), CsrfFilter.class);

    }
    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }
    @Override
    public void configure(WebSecurity webSecurity) throws Exception
    {
        webSecurity.ignoring()
                .antMatchers("/static/css/**")
                .antMatchers("/static/js/**");
    }

}
