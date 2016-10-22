# Quick Start

This page presents to you the commands to start with the project from scratch. 
This is quick to read and serve as a strait flow, but if you want something more explained seed the [Index](./index.md). 

I will assume you have npm, postgresql and oracle jdk 1.8 installed. Maybe you need to run some of the commands as root like *npm install -g*, 
but I recommend tha you find a way to install everything as your user. In MacOSX [homebrew](http://homebrew.sh) will do the trick 

    npm install -g slush slush-spring-aurelia jspm bower tsd gulp
    mkdir projectName
    cd projectName
    slush spring-aurelia
    # Answer the questions
    # Create your postgresql super user
    sudo su postgres
    createuser -s `whoami` -P
    exit # Logout
    createuser projectName -P -d
    createdb projectName -O projectName
    createdb projectName_test -O projectName
    # Configure your password in **server/src/main/resources/application-dev.properties** and **server/src/test/resources/application-test.properties**
    ./gradlew initProject
    ./gradlew build # This runs a production build
    # All tests must pass

Developing:

    cd projectName/client
    gulp unbundle # Gradle build generates a bundle that stops dev
    gulp watch
    # Annother terminal
    cd projectName
    ./gradlew bootRun
    