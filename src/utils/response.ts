import {Response} from "express"
export enum HttpStatusCode{
    OK=200,
    NO_CONTENT=201,
    BAD_REQUEST=400,
    NOT_FOUND=404,
    INTERNAL_SERVER_ERROR=500
}
enum ResponseCode{
    SUCCESS="00",
    FAILURE="99"
}
interface ResponseBody{
    status:boolean
    code:ResponseCode
    message:string
    data?:any
}
export function Send(res:Response,code:HttpStatusCode,message:string,body:any={}){
    let responseStatus = ((code==HttpStatusCode.OK)||(code==HttpStatusCode.NO_CONTENT))? true : false
    let payload:ResponseBody={
        status:responseStatus,
        code:responseStatus?ResponseCode.SUCCESS:ResponseCode.FAILURE,
        message:message,
        data:body
    }
    res.status(code).send(payload)
}