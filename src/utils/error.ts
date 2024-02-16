import { HttpStatusCode } from "./response"


export class HttpError extends Error{
    code!:HttpStatusCode
    constructor(_code:HttpStatusCode,message:string){
        super(message)
        this.code =_code
    }
}