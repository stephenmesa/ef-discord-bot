# How to release a new version
1. `docker build -t [tagname] .`
2. `docker tag [tagname] us.gcr.io/ef-discord-bot/ef-discord-bot`
3. `docker push us.gcr.io/ef-discord-bot/ef-discord-bot`
4. Open up GCP Images page (https://console.cloud.google.com/gcr/images/ef-discord-bot/US/ef-discord-bot?project=ef-discord-bot&gcrImageListsize=50)
5. Copy the latest hash
6. Go to GCP K8s workload (https://console.cloud.google.com/kubernetes/deployment/us-central1-a/cluster-1/default/nephbot?project=ef-discord-bot&tab=overview&deployment_overview_active_revisions_tablesize=50&duration=PT1H&pod_summary_list_tablesize=20) and perform a rolling update for the new hash
