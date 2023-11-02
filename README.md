# TGYM01 English Escape Room

A small app that collects the result of multiple escape room quizzes and reveals a big image (kind of like a puzzle).
This app is built for a school project.

## Preview Server

Start the server:

```bash
docker compose up -d
```

You can access the app on `http://localhost:3457` and the PocketBase dashboard on `http://localhost:3456`.
The PocketBase URL is hardcoded in the app, so the app only works on localhost unless you change the code.

You also need to create a account in PocketBase and import the schema definition (found in `pb_schema.json`).

Stop the server: 

```bash
docker compose down
```
