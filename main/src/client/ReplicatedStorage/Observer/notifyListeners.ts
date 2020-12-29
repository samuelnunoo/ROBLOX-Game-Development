import { Request_ID } from "../ServerGateway/Enums";
import Observer from "./Observer";

interface payload{
    request: Request_ID;
    [index:string]: unknown;
}


export const notifyListeners = (observer:typeof Observer) => (payload:payload) => {
    const {request,...data} = payload;
    observer.notify(request,data)
}

export default notifyListeners(Observer)
