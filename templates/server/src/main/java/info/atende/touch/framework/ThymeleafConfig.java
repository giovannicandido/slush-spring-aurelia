package <%= packageName %>.framework;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.template.TemplateLocation;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.dialect.IDialect;
import org.thymeleaf.extras.springsecurity4.dialect.SpringSecurityDialect;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.resourceresolver.SpringResourceResourceResolver;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;
import org.thymeleaf.templateresolver.TemplateResolver;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

/**
 * Thymeleaf configuration dialect, adds email templates
 * in classpath:/emailTemplates/
 * @author Giovanni Silva
 */
@Configuration
@EnableConfigurationProperties(ThymeleafProperties.class)
public class ThymeleafConfig {

    private static final Log logger = LogFactory.getLog(ThymeleafConfig.class);

    @Autowired
    private ThymeleafProperties properties;
    @Autowired
    private ApplicationContext applicationContext;

    @PostConstruct
    public void checkTemplateLocationExists() {
        boolean checkTemplateLocation = this.properties.isCheckTemplateLocation();
        if (checkTemplateLocation) {
            TemplateLocation location = new TemplateLocation(
                    this.properties.getPrefix());
            if (!location.exists(this.applicationContext)) {
                logger.warn("Cannot find template location: " + location
                        + " (please add some templates or check "
                        + "your Thymeleaf configuration)");
            }
        }
    }


    @Bean
    public TemplateResolver templateResolver() {
        TemplateResolver resolver = new TemplateResolver();
        resolver.setResourceResolver(thymeleafResourceResolver());
        resolver.setPrefix(this.properties.getPrefix());
        resolver.setSuffix(this.properties.getSuffix());
        resolver.setTemplateMode(this.properties.getMode());
        if (this.properties.getEncoding() != null) {
            resolver.setCharacterEncoding(this.properties.getEncoding().name());
        }
        resolver.setCacheable(this.properties.isCache());
        resolver.setOrder(2);
        return resolver;
    }

    @Bean
    TemplateResolver emailTemplateResolver() {
        TemplateResolver resolver = new TemplateResolver();
        resolver.setResourceResolver(thymeleafResourceResolver());
        resolver.setPrefix("classpath:/emailTemplates/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode(this.properties.getMode());
        resolver.setCharacterEncoding("UTF-8");
        resolver.setOrder(1);
        return resolver;
    }

    @Bean
    public SpringResourceResourceResolver thymeleafResourceResolver() {
        return new SpringResourceResourceResolver();
    }

    @Bean
    public SpringTemplateEngine templateEngine() {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();

        Set<IDialect> dialects = new HashSet<IDialect>();
        dialects.add(springSecurityDialect());

        templateEngine.setAdditionalDialects(dialects);
        Set<TemplateResolver> resolvers = new HashSet<>();
        resolvers.add(emailTemplateResolver());
        resolvers.add(templateResolver());
        templateEngine.setTemplateResolvers(resolvers);
        return templateEngine;
    }

    @Bean
    public ThymeleafViewResolver thymeleafViewResolver() {
        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
        resolver.setTemplateEngine(templateEngine());
        return resolver;
    }

    @Bean
    public SpringSecurityDialect springSecurityDialect() {
        SpringSecurityDialect dialect = new SpringSecurityDialect();
        return dialect;
    }
}
