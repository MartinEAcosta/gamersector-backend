import { DataSource } from "typeorm";

const { DB_HOST , DB_PORT , DB_USER , DB_PASSWORD , DB_NAME } = process.env;

const DATABASE_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
console.log("DATABASE_URL", DATABASE_URL);

export const AppDataSource = new DataSource({
    type: "postgres",
    url: DATABASE_URL,
    entities: [
        "src/models/*.ts"
    ],
    synchronize: true, // Solo para pruebas temporales
    logging: true, // Activa el logging para ver las consultas SQL
});
