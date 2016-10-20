# Gradle Builds

The glue to client and server is made in the gradle config

Here are some of the configurations created to this project:

* initProject - Designed to run the first time the project is cloned.
It will download client libraries and dependencies and npm modules
* jspmInstall - Execute *jspm install*
* bowerInstall - Execute *bower install*
* tsdInstall - Execute *tsd install*
* testClient - Execute *gulp test*
* copyKeycloak - Copy a file from **src/main/resources/keycloak-prod.json**
into **build/resources/main/keycloak.json**
is is trigged on the build, and is not required, but facilitates the workflow
with Keycloak Server ans Auth Server,
you can safe delete this task
* buildDocs - Run mkdocs build
* deployDocs - Copy the **site/** folder generated in **buildDocs** to S3 bucket
whose name defaults to **<%= appName %>-doc**.
You will need to change that name in the *root* **build.gradle** file and you
will need the env variables **AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY**
