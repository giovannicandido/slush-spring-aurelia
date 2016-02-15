Continuous integration configuration is a pain, it hurts man, but the author
makes your miserable life's better by making this project running on a service.

The service is [Shippable](http://shippable.com), but you can adapt to any.

# How it works

There is a docker image with all tools to build and run the tests of this project.
Check: [https://hub.docker.com/r/atende/build-image/] (Guess who create?)

The script to run the tests is on the file **shippable.yml**

What you need to do:

1. Enable the project on shippable dashboard
2. Change project settings to use the custom image **atende/build-image**
3. Generate a token in github ([https://github.com/settings/tokens]) and set the
variable **JSPM_GITHUB_AUTH_TOKEN** as a secured one. Or disable this
configuration in shippable.yml file. Not recommend because of github API limits
4. **[Optional]** Set **AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY** and
configure **build.gradle** with the name of a S3 bucket to deploy this documentation
5. Run you build and check your test and coverage reports in shippable (nice ;-)

I recommend enabling the **cache image** option to fast builds.

That is it, really, weeks of misery and blood not spend by you, or by me again ;-)

[https://hub.docker.com/r/atende/build-image/]: https://hub.docker.com/r/atende/build-image/
[https://github.com/settings/tokens]: https://github.com/settings/tokens
