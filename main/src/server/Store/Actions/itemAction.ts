import { ItemProperties, updateItem, removeItem } from '../Reducers/itemData';
const HttpService = game.GetService("HttpService")



export const updateAction = (data:ItemProperties):updateItem => {

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