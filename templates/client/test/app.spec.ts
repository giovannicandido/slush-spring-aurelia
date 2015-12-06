import {App} from "../src/app"
describe("app", function(){
  it("should getAppBase if no variable came from server", function(){
    var current = window.location.origin;
    expect(App.getAppBase()).toEqual(current)
  })
  it("should return the APPLICATION_URL_BASE if setted", function(){
    var host = "http://localhost:8080"
    window.APPLICATION_URL_BASE = host
    expect(App.getAppBase()).toEqual(host)
  })
});
