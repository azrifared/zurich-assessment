# Motor Insurance API

Welcome to Motor Insurance API!

## Demo

You can find API documentation here `https://zurich-assessment-1.onrender.com/` . Please ask admin for JWT token.

## Introduction

This README will guide you through the installation process, usage instructions, and other important details you need to know to get started with Motor Insurance API.


## Installation

### Prerequisites

- NodeJS 18
- PostgreSQL
- Docker and docker-compose installed on your server

### Steps

1. Run `npm install` to fetch dependencies
2. Create `.env` file in project root directory with following environment variables:

| Env Variable         | Required        | Value                    | Description
| -------------------- | --------------- | -------------------------|-------------------------------
| JWT_SECRET           | _required_      | -                        | Used for HTTP Req authentication 
| DB_HOST              | _required_      | -                        | PostgreSql DB host
| DB_USERNAME          | _required_      | -                        | PostgreSql DB username
| DB_PASSWORD          | _required_      | -                        | PostgreSql DB password
| DB_NAME              | _required_      | `motor_insurance_website`| PostgreSql DB name
| DB_PORT              | _required_      | 5432                     | PostgreSql DB port
| POSTGRESDB_LOCAL_PORT| _Optional_      | 5433                     | DB port in docker environment
| NODE_LOCAL_PORT      | _Optional_      | 8080                     | Nodejs app port exposed for docker external access
| PORT                 | _required_      | 3000                     | Nodejs app port

 3. Run `npm start` and go to `http://localhost:3000/`
 4. If you have docker compose installed in your server. You can skip step 1 and just run `docker compose up` and you can access the swagger docs at `http://localhost:8080/`


