import { Request, Router,Response } from "express";
import { TaskService } from "../../services/task.service";
import { CreateTaskBody, UpdateTaskBody } from "./task.payload";
import { HttpStatusCode, Send } from "../../utils/response";
import { HttpError } from "../../utils/error";
import { validate } from "class-validator";

export class TaskController {
    public router: Router;
    public taskService:TaskService
    
    constructor() {
    this.taskService = new TaskService(); 
    this.router = Router();
    this.routes();
    }


    private getTasks = async (req:Request,res:Response)=>{
        try {
            const tasks = await this.taskService.getAllTasks()
            if(tasks.length == 0){
                Send(res,HttpStatusCode.NO_CONTENT,"No Tasks",tasks)
            }else{
                Send(res,HttpStatusCode.OK,"All Tasks",tasks)
            }
        } catch (error:any) {
            let code = (error instanceof HttpError)?error.code:HttpStatusCode.INTERNAL_SERVER_ERROR
            Send(res,code,error.message)
            
        }
    }

    private getTaskById = async (req:Request,res:Response)=>{
        try {
            const task = await this.taskService.getById(req.params.id)
            Send(res,HttpStatusCode.OK,`task number ${task.id}`,task)
        } catch (error:any) {
            let code = (error instanceof HttpError)?error.code:HttpStatusCode.INTERNAL_SERVER_ERROR
            Send(res,code,error.message)
        }
    }


    private createTask = async(req:Request,res:Response)=>{
        const requestBody = req.body as CreateTaskBody
        let errors =await validate(requestBody)
        if(errors.length > 0){
            Send(res,HttpStatusCode.BAD_REQUEST,"Validation Error",errors)
            return
        }
        try{
            let newTask = await this.taskService.create(requestBody);
            Send(res,HttpStatusCode.OK,"new Task Created",newTask)
        }catch(error:any){
            let code = (error instanceof HttpError)?error.code:HttpStatusCode.INTERNAL_SERVER_ERROR
            Send(res,code,error.message)
        }
    }
    
    private updateCategory = async(req:Request,res:Response)=>{
        const id = req.params.id
        const requestBody = req.body as UpdateTaskBody
        try {
            const task = await this.taskService.update(requestBody,id)
            Send(res,HttpStatusCode.OK,"updated",task)
        } catch (error:any) {
            let code = (error instanceof HttpError)?error.code:HttpStatusCode.INTERNAL_SERVER_ERROR
            Send(res,code,error.message)
        }
    }

    private deleteCategory = async(req:Request,res:Response)=>{
        try {
            await this.taskService.delete(req.params.id)
            Send(res,HttpStatusCode.OK,"")
        } catch (error:any) {
            let code = (error instanceof HttpError)?error.code:HttpStatusCode.INTERNAL_SERVER_ERROR
            Send(res,code,error.message)
        }
    }

    private routes(){
        this.router.get("/",this.getTasks)
        this.router.get("/:id",this.getTaskById)
        this.router.post("/",this.createTask)
        this.router.put("/:id",this.updateCategory)
        this.router.delete("/:id",this.deleteCategory)
    }

}  