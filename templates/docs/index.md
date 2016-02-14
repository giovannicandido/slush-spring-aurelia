# Welcome to <%= appName %>

This is a developer focus documentation

## Project layout

    server/  Spring Server Module
    client/  Single Page Client rootPackage.Application

## Basic Setup

It requires the tools:

* Node.JS
* NPM
* [Gulp](http://gulpjs.com), [JSPM](http://jspm.io) and [Bower](http://bower.io) installed globally
* JDK 8 Oracle
* [Mkdocs](http://www.mkdocs.org)

Init the project

1. Clone the project
2. Int the project, it will download client libraries and dependencies and npm modules

```
./gradlew initProject
```

### Testing

Testing all

    ./gradlew test

*test* will run all unit tests and integration tests from server and client ans well.

The client tests is delegated to gulp test command line

Testing the client

    cd client
    gulp test

This will run the client tests using karma Google Chrome and Jasmine

<div class="alert alert-success" role="alert"> <strong>To see more documentation</strong> Go to the submodule pages</div>
