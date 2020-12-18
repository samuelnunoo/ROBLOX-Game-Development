import {ISetLot} from "server/Store/Reducers/serverData"

// Sets the lot on the server 
export function setLotAction (id:string,lot:string,isAdd:boolean) {
    return {
        type: "setLot",
        payload: {
            id,
            lot,
            isAdd
        }
    } as ISetLot
}

//