


    export class CustomeAPIError extends Error{

    constructor(message,statusCode){
     super(message);
     this.statusCode = statusCode;
    }
   
}


 export const createCustomError = (msg,statusCode)=>{
    return new CustomeAPIError(msg,statusCode)
}


