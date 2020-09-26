import {ItemProperties, updateItem, removeItem, updateItemLot} from "../Reducers/itemData"
const HttpService = game.GetService("HttpService")


export interface itemPayload {
    id: string;
    model: Model;
    style: Map<string,string>;
    rarity: "High" | "Low" | "Medium";
    owner:string;
    lotSave: undefined | string;
    offset: undefined | Vector3;
    orientation: undefined | Vector3;
}
export const updateAction = (data:itemPayload):updateItem => {

    const id = data.id
    return {
        type: "updateItem",
        payload: {
            id,
            properties: data as ItemProperties
        }
    }


}
export const updateLot = (id:string) => (lotID:string)  => {
    return {
        type: "updateLot",
        payload: {
            id,
            lotID

        }
    } as updateItemLot
}
export const removeAction = (id:string): removeItem => {
    return {
        type: "removeItem",
        payload: {
            id
        }
    }
}