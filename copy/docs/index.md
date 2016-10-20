# Welcome

This is a developer focus documentation created with [MkDocs](http://mkdocs.org)

If you are new to this project, I hight recommend you start reading the [Client Page](client.md). Then the [Server](server.md) page. And you are good to go

## Project layout

    server/  Spring Server Module
    client/  Single Page Client Application

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

See **server/src/main/resources/application-dev.properties** (copy of **application-dev.properties.dist**)

See **server/src/test/resources/application-test.properties** (copy of **application-test.properties.dist**)

### Create databases - PostgreSQL

I recommend

Create a super user as your user:

    # run as postgres user
    createuser -s `whoami`

Create a database for the user:

    # run as your user
    createdb `whoami`

Change your password for net connection

    psql
    alter user bla with password 'newpass';

    # run as your user
    createdb project
    createdb project_test

### Running

    cd client
    gulp watch

Run Spring Boot application with IDE


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
