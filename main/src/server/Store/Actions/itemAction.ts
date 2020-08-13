import {ItemProperties, updateItem, removeItem} from "../Reducers/itemData"
const HttpService = game.GetService("HttpService")

export interface payload {
    id: string;
    model: Instance;
    style: Map<string,string>;
    rarity: "High" | "Low" | "Medium";
    owner:string;
    lotSave: undefined | string;
    offset: undefined | Vector3;
    orientation: undefined | Vector3;
}
export const updateAction = (data:payload):updateItem => {

    const id = data.id
    return {
        type: "updateItem",
        payload: {
            id,
            properties: data as ItemProperties
        }
    }


}
export const removeAction = (id:string): removeItem => {
    return {
        type: "removeItem",
        payload: {
            id
        }
    }
}