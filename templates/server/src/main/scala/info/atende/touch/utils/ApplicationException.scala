package info.atende.touch.utils

/**
 * @author Giovanni Silva
 */
object ApplicationException {
  def apply(message: String): RuntimeException = {
    new ApplicationException(message)
  }
}

class ApplicationException(message: String, cause: Throwable) extends RuntimeException(message, cause) {
  def this(message: String) = {
    this(message, null)
  }
}
