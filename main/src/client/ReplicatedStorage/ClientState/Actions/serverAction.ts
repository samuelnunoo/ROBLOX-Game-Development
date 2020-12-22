import {ISetLot} from "../Reducers/serverData"

// Sets the lot on the server 
export function setLotAction (id:number,lot:string,isAdd:boolean) {
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