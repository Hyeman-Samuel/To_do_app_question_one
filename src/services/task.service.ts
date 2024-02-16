import { Task } from "../models/task.model";
import { CreateTaskBody, UpdateTaskBody } from "../controllers/task/task.payload";
import { HttpError } from "../utils/error";
import { HttpStatusCode } from "../utils/response";
import { getDBConnection } from "../utils/db";

export class TaskService{
    

    async getAllTasks():Promise<Task[]>{
        let repo = (await getDBConnection()).getRepository(Task)
        return await repo.find()
    }

    async getById(id:string):Promise<Task>{
        let repo = (await getDBConnection()).getRepository(Task)
        let task = await repo.findOne({id:id});
        if(!task) throw new HttpError(HttpStatusCode.NOT_FOUND,"Task Not Found")
        return task;
    }
    async create(body:CreateTaskBody):Promise<Task>{
        let repo = (await getDBConnection()).getRepository(Task)
        let task = new Task()
        task.description = body.description
        task.title = body.title
        task = repo.create(task);
        await repo.save(task)
        return task
    }

    async update(body:UpdateTaskBody,id:string):Promise<Task>{
        let repo = (await getDBConnection()).getRepository(Task)
        let task =  await repo.findOne({id:id});
        if(!task) throw new HttpError(HttpStatusCode.NOT_FOUND,"Task Not Found")
        if(body.title) task.title = body.title
        if(body.status) task.status = body.status
        if(body.description) task.description = body.description
        await repo.update(id,task);
        return task
    }
    async delete(id:string):Promise<boolean>{
        let repo = (await getDBConnection()).getRepository(Task)
        await repo.delete(id,);
        return true
    }
}