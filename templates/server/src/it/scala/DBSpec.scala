import javax.persistence.{EntityManager, PersistenceContext}

import info.atende.touch.entities.Teste
import org.junit.Test
import org.junit.runner.RunWith
import org.scalatest.MustMatchers
import org.scalatest.junit.{JUnitSuite, AssertionsForJUnit}
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.transaction.annotation.Transactional
import test.annotations.SpringIntegrationTest

/**
  * Example of test using DB
  * Tip: Use spring profiles to configure different database connections
  * The only way to run Spring Test with context's like @Sql and @Transaction is to run thought JUnit or TestNG
  *
  * @author Giovanni Silva
  */
@RunWith(classOf[SpringJUnit4ClassRunner])
@SpringIntegrationTest
@Sql(Array("/sql/dbtest.sql"))
@Transactional
class DBSpec extends JUnitSuite with MustMatchers{
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
