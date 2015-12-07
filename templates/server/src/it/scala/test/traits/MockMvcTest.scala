package test.traits

import org.scalatest.{Suite, BeforeAndAfterAll}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import test.TestContextManagement

/**
  * Configura um teste com MockMvc
  * @author Giovanni Silva
  */
trait MockMvcTest extends TestContextManagement { this: Suite =>
  @Autowired
  val wac: WebApplicationContext = null
  var mockMvc: MockMvc = null
  override def beforeAll(): Unit = {
    super.beforeAll()
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
  }
}
