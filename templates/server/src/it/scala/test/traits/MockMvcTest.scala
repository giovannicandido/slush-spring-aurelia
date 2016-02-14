package test.traits

import org.scalatest.{BeforeAndAfterAll, MustMatchers, Suite}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import test.CustomMatchers

/**
  * Configura um teste com MockMvc
  * @author Giovanni Silva
  */
trait MockMvcTest extends BeforeAndAfterAll with MustMatchers
      with CustomMatchers { this: Suite =>
  @Autowired
  protected val wac: WebApplicationContext = null
  protected var mockMvc: MockMvc = null

  abstract override def beforeAll(): Unit = {
    super.beforeAll()
    this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
  }
}
