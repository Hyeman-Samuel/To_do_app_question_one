export = {
    "type": "postgres",
    "host": "localhost",
    "port": 5422,
    "username":"postgres",
    "database": "Task",
    "synchronize": true,
    "logging": true,
    "entities": [
      "src/**/*.model.{ts,js}"
    ],
    "migrations": [
        "src/**/*.model.{ts,js}"
    ],
    "subscribers": [
        "src/**/*.model.{ts,js}"
    ],
    "ssl":false,
    "cli": {
      "entitiesDir": "./src/entity",
      "migrationsDir": "./src/migration",
      "subscribersDir": "./src/subscriber"
    }
  }