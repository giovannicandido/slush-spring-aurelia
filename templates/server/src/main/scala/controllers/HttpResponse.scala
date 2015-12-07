package controllers

import org.springframework.http.{HttpHeaders, HttpStatus, ResponseEntity}
import play.api.libs.json.JsValue

/**
 * Class to syntax suggar common spring controller responses
 * @author Giovanni Silva
 */
object HttpResponse {
  val headers = new HttpHeaders()
  headers.add(HttpHeaders.CONTENT_TYPE, "application/json")

  object Ok {
    def apply(message: String): ResponseEntity[String] = {
      new ResponseEntity[String](message, HttpStatus.OK)
    }

    def apply(body: JsValue): ResponseEntity[String] = {
      new ResponseEntity[String](body.toString(), headers, HttpStatus.OK)
    }
  }

  object Created {
    def apply(message: String): ResponseEntity[String] = {
      new ResponseEntity[String](message, HttpStatus.CREATED)
    }

    def apply(body: JsValue): ResponseEntity[String] = {
      new ResponseEntity[String](body.toString(), headers, HttpStatus.CREATED)
    }
  }

  object InternalServerError {
    def apply(message: String): ResponseEntity[String] = {
      new ResponseEntity[String](message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    def apply(body: JsValue): ResponseEntity[String] = {
      new ResponseEntity[String](body.toString(), headers, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  object BadRequest {
    def apply(message: String): ResponseEntity[String] = {
      new ResponseEntity[String](message, HttpStatus.BAD_REQUEST)
    }

    def apply(body: JsValue): ResponseEntity[String] = {
      new ResponseEntity[String](body.toString(), headers, HttpStatus.BAD_REQUEST)
    }
  }

  object ServiceUnavailable {
    def apply(message: String): ResponseEntity[String] = {
      new ResponseEntity[String](message, HttpStatus.SERVICE_UNAVAILABLE)
    }

    def apply(body: JsValue): ResponseEntity[String] = {
      new ResponseEntity[String](body.toString(), headers, HttpStatus.SERVICE_UNAVAILABLE)
    }
  }

}
