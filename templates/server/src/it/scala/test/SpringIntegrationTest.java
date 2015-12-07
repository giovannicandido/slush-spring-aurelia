package test;

import framework.Application;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

/**
 * Indica que é um teste de integração
 * Deve ser utilizado para anotar classes de teste
 * @author Giovanni Silva
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@SpringApplicationConfiguration(classes = {Application.class})
@ActiveProfiles(value = {"test"})
public @interface SpringIntegrationTest {
}
