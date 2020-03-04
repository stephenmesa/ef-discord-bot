# Building
The following steps will create a docker image that can be deployed wherever you'd like to host the bot (I've been using GCE, but anything can be used)
1. Build the dockerfile by running `docker build -t <tagname> .`

# Deploying
To deploy the built image, you need to deliver it to the hosting service of your choice (typically by uploading the image binary to some registry/artifact storage). The following steps represent deploying this to GCE:
1. Tag the image by running `docker tag <tagname> <docker registry url>`
1. Push the image to the image repository hosting service of your choice by running `docker push <docker registry url>`
1. Open the GCE dashboard
1. If this has never been deployed before, create a new VM instance that contains the image that was just uploaded (using the `latest` tag) and make sure all appropriate environment variables are set
1. Otherwise, reset the VM instance to have it grab the latest image

# Setting up environment variables
The following environment variables are required to run the bot:

DISCORD_TOKEN: A token from the discord bot API. You can get this by registering for a new application [here](https://discordapp.com/developers/applications)

DATASTORE_PROJECTID: The project id that your Google Datastore instance is located

GCP_KEY: The json key for accessing GCP that has been base64 encoded (instructions to generate a service account key are [here](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys))

BOT_PREFIX: What you want the boy's commands prefixed with (usually `!`)

ADMIN_USERIDS: A comma-separated list of discord user IDs that have administrative access to the bot (so they can run the `!stats` command)

DONATION_URL: The url to be displayed in the `!donate` command

SPONSOR_ENTITY_ID: The id of the entity in Datastore that represents the string that lists all of the sponsers

PUBSUB_PROJECTID: The project id of the Google PubSub that the bot will publish messages to

BOT_STATUS: An optional status to set on the bot on startup. If not provided, defaults to "Sponsored by Celestial (version number)"
