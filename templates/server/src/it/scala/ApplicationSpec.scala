package business.alunos.boundary

import framework.Application
import org.junit.runner._
import org.scalatest.{BeforeAndAfterAll, FlatSpec}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.{MockMvcBuilder, MockMvc}
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders._
import org.springframework.test.web.servlet.result.MockMvcResultMatchers._
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import test.TestContextManagement
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors._
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity
import org.hamcrest.CoreMatchers._

/**
 * Add your spec here.
 * You can mock out a whole application including requests, plugins etc.
 * For more information, consult the wiki.
 */
@RunWith(classOf[SpringJUnit4ClassRunner])
@WebAppConfiguration
@SpringApplicationConfiguration(classes = Array(classOf[Application]))
@ActiveProfiles(value = Array("test"))
class ApplicationSpec extends FlatSpec with TestContextManagement with BeforeAndAfterAll {

  @Autowired
  private val wac: WebApplicationContext = null

  private var mockMvc: MockMvc = null

  override def beforeAll(): Unit ={
    super.beforeAll()
    val builder:MockMvcBuilder = MockMvcBuilders.webAppContextSetup(this.wac)
    this.mockMvc = builder.build()
  }

   "Application" should "send 404 on a bad request" in {
      mockMvc.perform(get("/boum").`with`(user("any"))).andExpect(status().isNotFound())
    }

    it should "open index page" in {
      mockMvc.perform(get("/")).andExpect(status().isOk).andExpect(content().string(containsString("Application")))
    }
}
