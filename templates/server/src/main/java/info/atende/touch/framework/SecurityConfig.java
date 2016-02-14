package info.atende.touch.framework;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Value("${security.enable-csrf:true}")
    Boolean csrfEnabled = true;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        /**
         * Necessário ter ***.js por causa do cache que é feito em produção
         * @see WebConfig
         */
        http.authorizeRequests()
                .antMatchers("/styles/**", "/images/**/*", "/jspm_packages/**",
                   "/**/*.js", "/src/**","/fonts/**","/","/**/*.html","/**/*.map",
                        "/**/*.otf","/**/*.svg", "/**/*.eot","/**/*.woff","/**/*.woff2").permitAll()
                .anyRequest().authenticated();

        if (!csrfEnabled) {
            http.csrf().disable();
        } else {
            http.csrf();
        }
    }
}
