# Setup Instructions

## Create an .env file in /server

```bash
# Requires MySQL for database queries
MYSQL_USER={}
MYSQL_PASSWORD={}
MYSQL_HOST={}
DATABASE={}

# Requires S3-compatible storage for profiles / image uploads
AWS_URL={}
AWS_BUCKET_NAME={}
AWS_BUCKET_REGION={}

AWS_ACCESS_KEY_ID={}
AWS_SECRET_ACCESS_KEY={}
```

## Conduct the migrations in `server`

```
npx sequelize-cli db:migrate
```

To drop all tables;

```
npx sequelize-cli db:migrate:undo:all
```

## Start the backend server

```bash
cd server

# install dependencies
npm i

# start the app
node app.js
```

## Start the frontend server

```bash
cd client

# install dependencies
npm i

# start the app 
npm run dev
```