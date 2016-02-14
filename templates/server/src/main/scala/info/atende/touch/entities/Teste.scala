package <%= packageName %>.entities

import javax.persistence.Entity
import javax.persistence.Id

import scala.beans.BeanProperty

@Entity
class Teste {
  @Id
  @BeanProperty
  var id: Long = _
  @BeanProperty
  var nome: String = _
}
