# Client

The client part uses [Gulp](http://gulpjs.com) to build.

Its is optimized for use with the technologies:

* [Aurelia][Aurelia] Framework
* [Typescript][typescript] Language
* [Karma][karma] for running tests
* [Jasmine][jasmine] for writing tests
* [JSPM][jspm] for package management and module system loader
* [UIkit][uikit] as a responsive html and css template and some javascript components
* [Sass][sass] or [Less][less] Mainly Less because of UIkit
* [FontAwesome][fontawesome] Is included
* [Bower][bower] just for a few dependencies that do not play well with JSPM
* [Browser Sync][browserSync] Used to auto reload browsers

## Running in dev mode

The intended way of running the project in dev mode is with browser sync, however the browser sync only proxy spring boot server. In this way, spring boot serves the files and browser sync reloads the browser. This is nice for fast iterations (specially in a dual monitor system :-) when programming the interface, but has its caveats.

For instance, spring runs on port *8080* and browser sync on *9000*, so ajax request's need to be redirected. The client is configured to overcome some caveats like this.

### Watching for changes

So,

1. Run the server
2. Enter in the client folder and run `gulp watch`
3. Point to browserSync port, usually http://localhost:9000 and start developing

Of course you will need to initiate client dependencies. `gradle initProject` will take care of it (npm, jspm and bower).

### Server deployment URL caveats and work arounds

This project also works around of some other URL problems when deploying by letting the server says what is the current base url, check `client/app.ts` and `server/src/main/resources/templates/index.html`. So it works on _app.company.com_ or _company.com/app_

There is a gulp task to watch for changes and compile the files, it **do not compile typescript** files on change (except on first startup) because is better let the IDE or text editor do that, it will however reload the browser if the typescript file changes. Be in mind that **build-dev** **build-test** and **build** will compile typescript

Compiled code is on the **dist** folder. This is a requirement, because gradle will create a *jar* of the *client* module that the *server* module depend on production to serve the files. And that requires a root dir, which is then flatted by gradle on production, yes crazy stuff.

I don't like this, because it need some hacks to work on development and production at the same time. In other words the dist folder is a copy of the client project structure, including html, jspm_packages, images, fonts, css, almost everything

So, here is the deal. Even when changing html files, the result will only shows if the html is copied to dist folder, a thing that `gulp watch` do. So even if you don't plan to use browser-sync you will need to run `gulp watch`

Also you will note that `index.html` overrides the jspm config maps in *dev* profile, this is to work around the *dist folder and gradle crazy flattern required behavior :-)* and make it work in dev and production

The good thing about that, is the source typescript files will not be included in production. But that is not a big deal, as the compiled javascript will, and is not bad to read. Of course in production the majority of this files do not get loaded and a minified bundled version takes place automatically. But it requires some manually tweaks on **buildjs/tasks/bundle.js**, and because of that, can't guarantee all files are bundled. So is better to keep the files as well, because any file not bundled will be loaded on demand by jspm, this is quite nice :-).

Also you can configure the typescript compiler to minify the individual files, to let then unreadable.

In essence what you get is `gradle build` does a lot of work and generate a single jar ready for production.

### Serving Static Contents

The last thing that need mention is the way spring boot and java server's in general behaves. It caches everything, by default you can't just save and reload the browser even for static resources and that is good for performance on production, but really a pain in the f**k @ss for dev. We cover that pretty well, with some adjustments, is not perfect, but, will not get in your way. Here is how it works:

In **dev** profile, Spring is configured to serve client files from the disk and not from classpath. To know where the file is it search for a config named **resources.projectroot** that is configured in the file **server/src/main/resources/application-dev.properties**, it points to the full path of the root of the project, by the way this file is ignored in GIT (keep that way), there is a example in **application-dev.properties.dist** (all .dist file are distribution examples intend to educate developers in some common configs). So you can just change client files and it will reload as expected.

The _server template_ files like _index.html_ are preprocessed by **thymeleaf** but the dev profile file use the same trick of the resources.projectroot variable. So you just need to reload and it works.

Now there is the most problematic: Java and Scala Files.

This do not reload when compiled, and do not reload when changed.

To work around that, you should use [JRebel](https://zeroturnaround.com/software/jrebel/) or [Spring Loaded](https://github.com/spring-projects/spring-loaded).

I prefer JRebel, it works in more cases, is payed but has a free _always online_ offer [https://my.jrebel.com](https://my.jrebel.com)

Using one of then, you just compile (which is much quicker) instead of restart in the majority of cases.

JRebel plugin for the IDE of your choice, creates a run with jrebel button, you need to press that to work :-)

With that knowledge you are good. But I try to explain a lot, we can resume:

In resume: For the static files you just run config one file and run the project. For compiled classes use JRebel.

### Conclusion

This is the major things you need to know about running the application. Is not straightforward, and because of that is not perfect, but understanding this behaviors you gain time on dev to production workflows, being a big win if you do that continuous (you should :-)




[Aurelia]: http://aurelia.io
[typescript]: http://typescriptlang.org
[karma]: http://karma-runner.github.io
[jasmine]: http://jasmine.github.io
[jspm]: http://jspm.io
[uikit]: http://getuikit.com
[sass]: http://sass-lang.com
[less]: http://lesscss.org
[fontawesome]: https://fortawesome.github.io/Font-Awesome/
[bower]: http://bower.io/
[browserSync]: https://www.browsersync.io/
