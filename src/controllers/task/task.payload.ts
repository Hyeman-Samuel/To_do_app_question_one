import { IsNotEmpty} from "class-validator"
import { TaskStatus } from "../../models/task.model"


export class CreateTaskBody{
    @IsNotEmpty()
    title!:string

    @IsNotEmpty()
    description!:string
}

export class UpdateTaskBody{

    title?:string

    description?:string

    status?:TaskStatus
}