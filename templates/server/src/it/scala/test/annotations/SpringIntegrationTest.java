package test.annotations;

import info.atende.touch.Application;
import org.scalatest.TagAnnotation;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.web.WebAppConfiguration;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Indica que é um teste de integração
 * Deve ser utilizado para anotar classes de teste
 * @author Giovanni Silva
 */
@TagAnnotation
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = {Application.class})
@ActiveProfiles(value = {"ci","test"})
public @interface SpringIntegrationTest {
}
