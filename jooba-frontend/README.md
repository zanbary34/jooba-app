# Flask + React App with SQLite and Docker Compose

## Overview
A web application using **Flask** for the backend, **React** for the frontend, and **SQLite** as the database. 
**Docker Compose** helps run everything together without the hassle of setting up each part manually.

### Why Docker Compose?
Think of **Docker Compose** as a shortcut that makes running multiple services at once super easy. Instead of manually starting the backend, frontend, and database one by one, Compose lets you define everything in a single file and launch them all with a single command. No more worrying about dependencies or mismatched environments—everything just works.

## Running the Application
### 1. Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 2. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 3. Start the Application
Run the following command to start all services:
```bash
docker-compose up --build
```
⚠ It may take a few seconds for the services to spin up, so give it a moment.

### 4. Open in Browser
Once everything is ready, head to:
```
http://localhost:3000
```

### 5. Stopping the Application
When you're done, stop everything with **CTRL + C** or:
```bash
docker-compose down


🚀 Happy coding!

