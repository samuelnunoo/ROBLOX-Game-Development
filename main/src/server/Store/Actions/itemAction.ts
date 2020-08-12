import {ItemProperties, updateItem, removeItem} from "../Reducers/itemData"
const HttpService = game.GetService("HttpService")

const updateAction = (id:string,template:string, style: Map<string,string>, 
    rarity: "High"| "Low" | "Medium", owner:string, lotSave: undefined | string, 
    offset: undefined | Vector3, orientation: undefined | Vector3):updateItem => {


    return {
        type: "updateItem",
        payload: {
            id,
            properties: {
                id,
                template,
                style,
                rarity,
                owner,
                lotSave,
                offset,
                orientation
            } as ItemProperties
        }
    }


}

const removeItem = (id:string): removeItem => {
    return {
        type: "removeItem",
        payload: {
            id
        }
    }
}