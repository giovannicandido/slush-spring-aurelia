# Server

The server part is made with Spring Framework.

Spring Data and Spring Security are enabled by default, all Spring configurations are located in **server/src/main/java/rootPackage.framework**

The index controller is **server/src/main/java/rootPackage.controllers/IndexController.java** it delegates to a view
**server/src/main/resources/templates/index.html**

The server is configured to depend on the client and to build it on jar phase. It is optimized for production on build


## Unit and Integration test separation

This works by creating one additional source set for integration test and a task to run it

To create a new integration test put it on **server/src/it/scala** or **server/src/it/java**

To run this tests use

```
./gradlew integTest
```

All spring tests are annotated with the custom annotation `@SpringIntegrationTest`, this sets some common configuration
and also mark scalatest, so you could run only integration test in the IDE.

## Integration test with ScalaTest

The recommend way to write integration tests is using ScalaTest.

For that you must use `TestContextManagement` to have injection and spring boot application context working.

The limitation is that you can't use spring test execution listeners to provide some annotations like `@Transactional`
and `@Sql` inside tests. But it works fine on you application code injected during the test. For that see the next section

```scala
import org.hamcrest.CoreMatchers._
import org.scalatest.FlatSpec
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors._
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders._
import org.springframework.test.web.servlet.result.MockMvcResultMatchers._
import test.annotations.SpringIntegrationTest
import test.traits.{MockMvcTest, TestContextManagement}

/**
  * Add your spec here.
  * You can mock out a whole application including requests, plugins etc.
  * For more information, consult the wiki.
  */
@SpringIntegrationTest
class ApplicationSpec extends FlatSpec with TestContextManagement with MockMvcTest {

  "rootPackage.Application"  should "Send 404 on bad request"  in {
    mockMvc.perform(get("/boum").`with`(user("any"))).andExpect(status().isNotFound)
  }

  it should "Open index page" in {
    mockMvc.perform(get("/"))
      .andExpect(status().isOk).andExpect(content().string(containsString("rootPackage.Application")))
  }

  it should "Open page" in {
    mockMvc.perform(get("/page")).andExpect(status().isOk)
  }
}

```

The `MockMvcTest` trait creates the application context and mockMvc for you.
Then you have `protected val wac: WebApplicationContext` and `protect var mockMvc: MockMvc`

## Integration Tests with Spring Services in It

The only way to run Spring Test with context's like `@Sql` and `@Transaction` is to run thought *JUnit* or *TestNG*

But you can and should use scalatest with a JUnit or TestNG Runner.

But there is a problem: The tag is not recognized in JUnitSuite, so the test will run with Unit tests and not run with
IntegrationTest. Check [GitHub Issue](https://github.com/scalatest/scalatest/issues/840) for details

Example:

```scala
import javax.persistence.{EntityManager, PersistenceContext}

import entities.Teste
import org.junit.Test
import org.junit.runner.RunWith
import org.scalatest.MustMatchers
import org.scalatest.junit.{AssertionsForJUnit, JUnitSuite}
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.transaction.annotation.Transactional
import test.annotations.SpringIntegrationTest

/**
  * Example of test using DB
  * Tip: Use spring profiles to configure different database connections
  * The only way to run Spring Test with context's like @Sql and @Transaction is to run thought JUnit or TestNG
  * @author Giovanni Silva
  */
@RunWith(classOf[SpringJUnit4ClassRunner])
@SpringIntegrationTest
@Sql(Array("/sql/dbtest.sql"))
@Transactional
class DBSpec extends JUnitSuite with MustMatchers with AssertionsForJUnit {
  @PersistenceContext
  val em: EntityManager = null

  @Test
  def DB_Should_List_Save_Delete: Unit = {
    val dbTestSql = em.find(classOf[Teste], 1L)
    dbTestSql must not be null
    dbTestSql.nome must equal("Hello World")

    val test = new Teste()
    test.id = 2
    test.nome = "Alan"
    em.persist(test)
    val find = em.find(classOf[Teste], 2L)
    find.nome must equal("Alan")
  }

  @Test
  def SpringTest_Should_RollbackTransaction(): Unit ={
    val find = em.find(classOf[Teste], 2L)
    find must be (null)
  }

}
```

## Running tests with Intellij IDEA

If you create a ScalaTest Runner with IDEA, by default it will run everything.

To separate Unit from Integration add this test options:

For run only classes marked with integrationtest:

    -n test.annotations.SpringIntegrationTest

To run only classes not markd with integrationtest (unit tests)

    -l test.annotations.SpringIntegrationTest

For Junit tests like the DBSpec example you need to run as JUnit Configuration
