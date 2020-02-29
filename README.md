# Building
The following steps will create a docker image that can be deployed wherever you'd like to host the bot (I've been using GCE, but anything can be used)
1. Build the dockerfile by running `docker build -t <tagname> .`

# Deploying
To deploy the built image, you need to deliver it to the hosting service of your choice (typically by uploading the image binary to some registry/artifact storage). The following steps represent deploying this to GCE:
1. Tag the image by running `docker tag <tagname> <docker registry url>`
1. Push the image to the image repository hosting service of your choice by running `docker push <docker registry url>`
1. Open the GCE dashboard
1. If this has never been deployed before, create a new VM instance that contains the image that was just uploaded (using the `latest` tag)
1. Otherwise, reset the VM instance to have it grab the latest image
