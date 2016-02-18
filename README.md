# Slush Spring Aurelia Generator

## Usage

Install the generator with

    npm install slush -g
    npm install slush-spring-aurelia -g

Create a empty project folder

    create projectDir

Generate

    cd projectDir
    slush spring-aurelia

After generate see the **docs** folder

## Requirements

* NodeJS >= 4.3
* Oracle JDK 8
* npm install gulp jspm bower slush -g

## About

Production ready stack to start with modern *FrontEnd* with **Aurelia.io** *Backend* by *Java* **Spring Boot Framework**

This project is like [JHipster](http://jhipster.github.io), but with less customizations, and with a more opined stack

This is heavy opined way of building apps with this two awesome frameworks,
and is current used in production. I take some time to extract this best practices
into a generator so I can build other apps with this stack and have the setup improved.
That said, I think, many people could use this generator, or at least get some
insights on how to create a good build experience, with the two or with one of then.

It is also not limited to this two frameworks. I use in this scaffolding a lot of
tech, including:

1. Typescript Language
1. Scala Language
1. JUnit, ScalaTest
1. Sass, Less
1. Gradle
1. UIkit
1. BrowserSync
1. And more

As you can see, I'm integrating quite a lot of stuff here, I'm just a little crazy ;-)

This tech choice is based on personal experience and taste, trial and error, and trying to
put the best of the best in all tools together, for web development and across boundaries. All tech here have alternatives, believe me, I'm crazy enough to have studied several of them, and I do not make the choices without a reason, and I'm constantly pondering about then. Of corse you can disagree and you can easy adapt to what you use. Don't like UIkit? Make the change to bootstrap,
don't know Scala? Use Just Java, Don't wanna Typescript? Use ECMAScript 6

I will not justify all of the choices, because that will take one or three good pub and drink conversations, but just as a concrete example of what I'm talking about, take UIkit:

UIkit - Is a responsive CSS framework written in less preprocessor, with some javascript components. Alternatives I have used are Foundation and Twitter Bootstrap. Chose UIkit because of its modularity (AMD module javascript) and programmatically javascript API
as well as declarative, which Bootstrap have none of, and it play a important rule in this stack. The javascript is build and package using JSPM package and module system loader,
what this means is that we just use standard import's in the code, and the build takes care of wipe off what we do not use, and bundling and minifying everything together.
In practice is less javascript size, better runtime performance and better developer experience and modularity of your own code.

The programmatically API means we can create a faced around the framework and change it entirely if we wish so, it also means we can easy call the method's in javascript without
setup of DOM mess, the declarative means we can use just HTML were it makes more sense.


The integration between server build and client build is tight, but the two are
complete separated, teams can perfectly work separated. One team of UI nerds,
other of Server Side geeks, the two using 2016 latest and best tech.

The two pieces are put together in the **Gradle** *build process*, but Gradle itself,
do not build the client, it delegates to *NodeJs* and *Gulp*, and packages everything
in a standard spring boot jar, that can be simple launched with `java -jar application.jar`

It is focused on developer productivity and production ready "push a button" awesomeness :-)

For that it basically use Spring Profiles, and Gradle and Gulp build's

This stack is not pushed to its limits, it can be integrated in very, very large
projects and teams, you can add continuous integration, you can have best practice test on UI complete different for server, you can build microservices, or a coherent ecosystem of web projects.

If you like and want to contribute, or just talk about best practices and ideas, just call me or send a pull request :-)

It will be continuous improved, for dev productivity and production awesomeness.

And I will explain the strategy on another document, in another time.

Current there are some things to polished and automate, that will make this project
more easy to digest by less experienced developers who do not understand all the tech here.

And last but not least, I'm not the original author of this, I have to thank a lot
of other people and open source project's where a get inspired. This all
start with the Spring Sagan Project, where I see the link between client and server
build by gradle, and a lot stuff here is taken directed from then. But this project has it's own merit's as well :-). The key here, is that is not a perfect setup, nothing is perfect, but we can continuous improve, and is production ready.

So you can see this project as a huge integrator scaffolding.
