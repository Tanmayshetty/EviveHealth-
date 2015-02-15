package Evive.config;

import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class ViewResolver extends WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter{

}
