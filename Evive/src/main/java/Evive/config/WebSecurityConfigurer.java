package Evive.config;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class WebSecurityConfigurer extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception
    {
        httpSecurity.formLogin().
                loginPage("/index").
                and()
                .rememberMe();



    }
    @Override
    public void configure(WebSecurity webSecurity) throws Exception
    {
        webSecurity.ignoring()
                .antMatchers("/static/css/**")
                .antMatchers("/static/js/**");
    }

}
