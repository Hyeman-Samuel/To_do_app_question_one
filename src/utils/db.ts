import { Connection, createConnection,getConnection } from "typeorm";



export const getDBConnection = async ():Promise<Connection> => {
    try {
        const dbConnection = getConnection();
        return dbConnection;
    } catch (error) {
        const dbConnection = await createConnection();
        if (!dbConnection.isConnected) await dbConnection.connect();
        return dbConnection;
    }
}
