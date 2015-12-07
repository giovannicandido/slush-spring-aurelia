package test

import java.io.IOException
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;

import akka.actor.ActorSystem
import akka.testkit.{ImplicitSender, TestKit}
import com.unboundid.ldap.listener.{InMemoryDirectoryServer, InMemoryDirectoryServerConfig, InMemoryListenerConfig}
import com.unboundid.ldif.LDIFReader
import info.atende.scala_ldap.{CN, DC, LdapManager}
import org.scalatest.{FlatSpecLike, BeforeAndAfterAll, BeforeAndAfter}
import org.springframework.test.web.servlet.setup.MockMvcBuilders

import scala.io.Source

/**
 * @author Giovanni Silva
 */
object TestUtils {
  val dc = DC("example") / DC("local")
  val domainDc = dc.toString

  val userDN = CN("Administrator") / CN("Users") / dc
  val password = "changeIcei668"
  val host = "localhost"
  val structureLdif = "/structure.ldif"
  val adschema = "/adschema.ldif"
  val adConfiguration = "/configuration.ldif"
  var ds: InMemoryDirectoryServer = _
  val listenPort = 4000
  private var started = false
  def createManager = {
    new LdapManager(host, userDN = userDN, password = password, port = listenPort, useSSL = false)
  }

  def startInMemoryDirectory = {
    println("--- Iniciando InMemoryDirectoryServer")
    val config: InMemoryDirectoryServerConfig =
      new InMemoryDirectoryServerConfig(dc.toString);

    config.setListenerConfigs(
      InMemoryListenerConfig.createLDAPConfig("LDAP", // Listener name
        listenPort)); // Client factory

    config.addAdditionalBindCredentials(userDN.toString, password)
    config.setSchema(null)

    // Create the directory server instance, populate it with data from the
    // "test-data.ldif" file, and start listening for client connections.
    ds = new InMemoryDirectoryServer(config)

    ds.importFromLDIF(false, new LDIFReader(Source.fromURL(getClass.getResource(adConfiguration)).bufferedReader()))
    ds.importFromLDIF(false, new LDIFReader(Source.fromURL(getClass.getResource(adschema)).bufferedReader()))
    ds.importFromLDIF(false, new LDIFReader(Source.fromURL(getClass.getResource(structureLdif)).bufferedReader()))


    ds.startListening()
    started = true
  }

  def stopInMemoryDirectory = {
    println("--- Parando InMemoryDirectoryServer")
    ds.shutDown(true)
    started = false
  }


  @throws(classOf[IOException])
  def convertObjectToJsonBytes(`object`: AnyRef): Array[Byte] = {
    val mapper: ObjectMapper = new ObjectMapper
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
    return mapper.writeValueAsBytes(`object`)
  }
}
/* A tiny class that can be used as a Specs2 'context'. */
abstract class AkkaTestkitSpecs2Support extends TestKit(ActorSystem())
with FlatSpecLike
with BeforeAndAfterAll
with ImplicitSender {
  // make sure we shut down the actor system after all tests have run
  override def afterAll = system.shutdown()
}
