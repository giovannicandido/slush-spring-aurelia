package test

import org.scalatest.matchers.{MatchResult, Matcher}

import scala.util.Try

/**
 * Para estender os matchers do ScalaTest de forma a ficar mais intuitivo alguns testes
 * Matchers inspirados no specs2
 * @author Giovanni Silva 
 *         22/09/15.
 */
trait CustomMatchers {
  object beSuccessfulTry extends Matcher[Try[Any]]{
    def apply(left: Try[Any]) = {
      MatchResult(left.isSuccess, s"$left is not a succesful try", "The Try object is not a success")
    }
  }

  object beFailedTry extends Matcher[Try[Any]]{
    def apply(left: Try[Any]) = {
      MatchResult(left.isFailure, s"$left is not a failure try", "The Try object must be a failure")
    }
  }
  object beSome extends Matcher[Option[Any]]{
    def apply(left: Option[Any]) = {
      MatchResult(left.isDefined, s"$left is not a Some", "The Option object is not a Some")
    }
  }
  case class beSome(val value: Any) extends Matcher[Option[Any]] {
    def apply(left: Option[Any]) = {
      MatchResult(left.isDefined && left.get.equals(value), s"$left is not a Some($value)", "The Option object is not a Some")
    }
  }

  object beNone extends Matcher[Option[Any]]{
    def apply(left: Option[Any]) = {
      MatchResult(left.isEmpty, s"$left is not a None", "The Option object is not a None")
    }
  }

  object beTrue extends Matcher[Boolean]{
    def apply(left: Boolean) = {
      MatchResult(left, s"$left is not true", "The object should be true")
    }
  }

  object beFalse extends Matcher[Boolean]{
    def apply(left: Boolean) = {
      MatchResult(!left, s"$left is not false", "The object should be false")
    }
  }
//  case class  allPasses (test: Any => Boolean) extends Matcher[Seq[Any]] {
//    override def apply(left: Seq[Any]): MatchResult = {
//      MatchResult(left.forall(test), "The collection Does not pass the test", "At least one element of the collection " +
//        "does not have pass the test")
//    }
//  }
}
