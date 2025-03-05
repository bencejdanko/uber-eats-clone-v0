# Server Setup

## Create an .env file in /server

MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_HOST=
DATABASE=

## Conduct the migrations

```
npx sequelize-cli db:migrate
```

To drop all tables;

```
npx sequelize-cli db:migrate:undo:all
```