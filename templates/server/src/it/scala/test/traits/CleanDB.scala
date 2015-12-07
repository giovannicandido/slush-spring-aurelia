package test.traits

import db.DBTestUtil
import org.scalatest.{Suite, BeforeAndAfterEach}
import org.springframework.beans.factory.annotation.Autowired

import scala.slick.driver.PostgresDriver.simple.Database
/**
  * @author Giovanni Silva
  */
trait CleanDB extends BeforeAndAfterEach { this: Suite =>
  @Autowired
  val db: Database

  override def beforeEach(){
    DBTestUtil.DB = db
    DBTestUtil.clean()
    DBTestUtil.initDb()
  }

}
