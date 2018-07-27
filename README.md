# How to release a new version
1. `docker build -t <tagname> .`
2. `docker tag <tagname> <docker registry url>`
3. `docker push <docker registry url>`
4. Open up GCP Images page
5. Copy the latest hash
6. Go to GCP K8s workload and perform a rolling update for the new hash
