package controllers

import org.springframework.http.ResponseEntity
import org.springframework.web.context.request.async.DeferredResult

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.{Failure, Success}

/**
 * Implicit conversions to work with scala objects in controller transparent
 * @author Giovanni Silva.
 */
object Implicits {

  implicit def futureResponseEntity[T](future: Future[ResponseEntity[T]]): DeferredResult[ResponseEntity[T]] = {
    val deferredResult = new DeferredResult[ResponseEntity[T]]()

    future.onComplete {
      case Success(n) => deferredResult.setResult(n)
      case Failure(e) => deferredResult.setErrorResult(e)
    }
    deferredResult
  }

  implicit def futureToDeferredResult[T](future: Future[T]): DeferredResult[T] = {
    val deferredResult = new DeferredResult[T]()
    future.onComplete {
      case Success(n) => deferredResult.setResult(n)
      case Failure(e) => deferredResult.setErrorResult(e)
    }
    deferredResult
  }
}
