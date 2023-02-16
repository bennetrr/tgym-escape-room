# TGYM01 English Escape Room

A small app that collects the result of multiple escape room quizzes and reveals a big image (kind of like a puzzle).
This app is built for a school project.

## Run the app

You can use docker compose to deploy this app. The `docker-compose.yml` is found in the repository root.

The file exposes the API and its dashboard (PocketBase) on port `8300` and the web app itself on port `8301`.

To update the app to a newer version, you have to update the docker images in the compose file
(or download the new compose file from the GitHub repository).
