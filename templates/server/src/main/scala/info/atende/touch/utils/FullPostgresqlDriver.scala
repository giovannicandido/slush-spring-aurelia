package info.atende.touch.utils

import com.github.tminglei.slickpg._
import play.api.libs.json.{JsValue, Json}

/**
 * Driver for postgresql to use with slick that enable more features of datatabse
 * @author Giovanni Silva
 */
 trait FullPostgresDriver extends ExPostgresDriver
                           with PgArraySupport
                           with PgDateSupport
                           with PgRangeSupport
                           with PgHStoreSupport
                           with PgPlayJsonSupport
                           with PgSearchSupport
                           // with PgPostGISSupport // Need plugin jar
                           with PgNetSupport
                           with PgLTreeSupport {
   def pgjson = "jsonb" // jsonb support is in postgres 9.4.0 onward; for 9.3.x use "json"

   override val api = FullAPI

   object FullAPI extends API with ArrayImplicits
                            with DateTimeImplicits
                            with JsonImplicits
                            with NetImplicits
                            with LTreeImplicits
                            with RangeImplicits
                            with HStoreImplicits
                            with SearchImplicits
                            with SearchAssistants {
     implicit val strListTypeMapper = new SimpleArrayJdbcType[String]("text").to(_.toList)
     implicit val playJsonArrayTypeMapper =
       new AdvancedArrayJdbcType[JsValue](pgjson,
         (s) => utils.SimpleArrayUtils.fromString[JsValue](Json.parse(_))(s).orNull,
         (v) => utils.SimpleArrayUtils.mkString[JsValue](_.toString())(v)
       ).to(_.toList)
   }
 }

 object FullPostgresDriver extends FullPostgresDriver
