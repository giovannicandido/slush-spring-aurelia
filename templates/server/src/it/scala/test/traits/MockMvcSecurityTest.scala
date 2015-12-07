package test.traits

import org.scalatest.Suite
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors._
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity
import org.springframework.test.web.servlet.{MockMvc, MockMvcBuilder}
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import test.TestContextManagement

/**
  * Configura um teste para usar MockMvc e habilida o spring security
  * Não misturar essa trait com {@link MockMvcTest}
  * @author Giovanni Silva
  * @see MockMvcTest
  */
trait MockMvcSecurityTest extends TestContextManagement { this: Suite =>
  @Autowired
  val wac: WebApplicationContext = null
  var mockMvc: MockMvc = null

  val ANALISTA_USER = user("bla").roles("ANALISTA")
  val TECNICO_INF_USER = user("bla").roles("TECNICO_INF")
  val TECNICO_ADM_USER = user("bla").roles("TECNICO_ADM")

  override def beforeAll(): Unit = {
    super.beforeAll()
    val builder:MockMvcBuilder  = MockMvcBuilders.webAppContextSetup(this.wac).apply(springSecurity())
    this.mockMvc = builder.build()
  }
}
