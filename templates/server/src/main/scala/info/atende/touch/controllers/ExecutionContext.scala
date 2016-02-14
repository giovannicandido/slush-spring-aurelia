package <%= packageName %>.controllers

import scala.concurrent.ExecutionContextExecutor

/**
 * Change the execution context for controllers. When working with scala futures
 * @author Giovanni Silva
 */
object ExecutionContext {
  implicit lazy val controller: ExecutionContextExecutor = scala.concurrent.ExecutionContext.Implicits.global
}
