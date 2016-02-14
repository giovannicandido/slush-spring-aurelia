import {Router} from 'aurelia-router';
import {HttpClient, RequestInit} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import 'jquery'
// Fetch polifyll for older browsers
import 'fetch'
import {ErrorInterceptor} from './utils/interceptors'
// Habilita tooltip na aplicacao
import 'uikit/js/components/tooltip';
@inject(HttpClient)
export class App {
  router:Router;
  client: HttpClient;
  USER_NAME: string;

  public static getAppBase(): string {
    if(window.APPLICATION_URL_BASE == undefined || window.APPLICATION_URL_BASE == null){
      return window.location.origin
    }else {
      return window.APPLICATION_URL_BASE
    }
  }
  static getCSRFHeader(): string {
    return $("meta[name='_csrf_header']").attr("content");
  }

  static getCSRFToken(): string {
    return $("meta[name='_csrf']").attr("content");
  }

  constructor(client: HttpClient){
    this.USER_NAME = window.USER_NAME;
    // Configure HttpClient
	  /**
	   * Se a url acessada for index-dev.html, então o sistema tem um base url para localhost:8080
	   * Isso permite a utilização do browserSync com o gulp watch mantendo-se os requests para o servidor
 	   */
	  var location = window.location.pathname;
    let base = App.getAppBase();
    client.configure(x => x.useStandardConfiguration());
    // Se estiver na url index-dev.html e a base nao mudar
	  if(location == "/index-dev.html" && base == window.location.origin){
      client.configure(x => {
        x.withBaseUrl("http://localhost:8080")
      })
	  }else{ // Caso contrario o sistema seta a base da variavel no servidor
      client.configure(x => {
        x.withBaseUrl(base)
      })
    }
	  client.configure(x => {
      var headers = [];
      headers['Content-Type'] = 'application/json';
      headers['X-Requested-With'] ='XMLHttpRequest';
      // Protection against Cross Site Forge Atack
      if(App.getCSRFHeader() != null || App.getCSRFHeader() != "") {
        headers[App.getCSRFHeader()] = App.getCSRFToken();
      }
      let defaults: RequestInit = {
        headers: headers
      }

      x.withDefaults(defaults);
	  	x.withInterceptor(new ErrorInterceptor());
	  });
	  this.client = client;

  }

  configureRouter(config, router:Router) {
	  config.title = 'Aurelia';
	  config.map([
		  {route: ['', 'welcome'], name: 'welcome', moduleId: 'view/welcome',nav: true, title: 'Welcome'},
	  ]);

	  this.router = router;
  }

  logout(){
    this.client.fetch('sso/logout',{method: 'POST'}).then((r) => {
      if(r.status >= 200 && r.status < 300){
        window.location = <any>App.getAppBase();
      }
    })
  }
}
