import { Request_ID } from "../ServerGateway/Enums";
import Observer from "./Observer";


export interface ObserverTypes {
    [Request_ID.Lot_Request]: boolean;

}

export interface IObserverData<R extends keyof ObserverTypes> {
    request: R
    data: ObserverTypes[R]
}

interface internal {
    request: Request_ID;
    data: unknown;
}
export const notifyListeners = (observer:typeof Observer) => (payload:internal) => {
    const {request,data} = payload as internal
    observer.notify(request,data)

}

export default notifyListeners(Observer)
