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

  "Application"  should "Send 404 on bad request"  in {
    mockMvc.perform(get("/boum").`with`(user("any"))).andExpect(status().isNotFound)
  }

  it should "Open index page" in {
    mockMvc.perform(get("/"))
      .andExpect(status().isOk).andExpect(content().string(containsString("Application")))
  }
}
