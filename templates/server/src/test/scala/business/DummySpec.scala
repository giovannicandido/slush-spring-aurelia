package business

import org.scalatest.{FlatSpec, MustMatchers}


/**
 * @author Giovanni Silva
 */
class DummySpec extends FlatSpec with MustMatchers {
  "An Dummy Test" should "pass" in {
      1 must equal(1)
    }
}
