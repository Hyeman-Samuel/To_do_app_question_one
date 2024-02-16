import bodyParser from "body-parser";
import express from "express";

import { TaskController } from "./controllers/task/task.controller";
import { getDBConnection } from "./utils/db";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT:string|number= process.env.PORT || 3001;
let taskController = new TaskController();

function setControllers(app:any){
    app.use(`/task/`,taskController.router);
}

async function startApp(app:any){
    await getDBConnection()
    app.listen(PORT, () => {console.log(`CONNECTED TO DB AND SERVER START ON ${PORT}`)});
    app.get( "/", (req: any, res: any ) => {
        res.send( "Application running " );
    });
    setControllers(app)
}

startApp(app)