import { Request_ID } from "../ServerGateway/Enums"

export abstract class IObserver {
    abstract update(value:any):void;
}

interface payload {
    request: Request_ID;
    [index:string]: unknown;
}


interface Node {
    id:Request_ID;
    object:IObserver;
}

class Observer {

    public listeners: Node[] = []

    public subscribe(id:Request_ID,object:IObserver) {
        const node = {id,object} as Node;
        this.listeners.push(node)
    }

    public notify(id:Request_ID, data:unknown) {
   
        this.listeners.forEach( listener => {
            if (listener.id === id) {
                listener.object.update(data)
            }
        })
    }

    public unsubscribe(object:IObserver) {
        
      for (let i = 0 ; i < this.listeners.size(); i++){
        if (this.listeners[i].object === object) {
                const endIndex = this.listeners.size() - 1;
                const endObj = this.listeners[endIndex]

                //Swap
                this.listeners[endIndex] = this.listeners[i]
                this.listeners[i] = endObj;

                //Remove
                this.listeners.pop()
                break;

        }
      }



}

}

export const testVersion = Observer

export default new Observer();