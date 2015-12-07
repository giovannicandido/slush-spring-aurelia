package business

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.{FlatSpec, MustMatchers}


/**
 * @author Giovanni Silva
 */
@RunWith(classOf[JUnitRunner])
class DummySpec extends FlatSpec with MustMatchers {
  "An Dummy Test" should "pass" in {
      1 must equal(1)
    }
}
