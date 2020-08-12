import { updateObjects, setType, newSave, removeSave } from "../Reducers/lotData";
const HttpService = game.GetService('HttpService')

export function updateObject(id:string, item:string, add:boolean) {
    return {
        type: "updateObjects",
        payload: {
            add,
            item,
            id
        }
    } as updateObjects
}
export function updateType(id:string, type:string) {
    return {
        type: "lotType",
        payload: {
            id,
            type
        }
    } as setType
}
export function newSave(player:Player, instance: Instance) {
    const id = HttpService.GenerateGUID(false)
    return {
        type: "newSave",
        payload: {
            id,
            player,
            instance
        
        }
    } as newSave
}
export function removeSave(id:string) {
    return {
        type: "removeSave",
        payload: {
            id
        }
    } as removeSave
}