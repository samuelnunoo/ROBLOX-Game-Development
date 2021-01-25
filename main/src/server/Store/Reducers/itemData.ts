import Rodux, { AnyAction } from "@rbxts/rodux";
import { Option } from "@rbxts/rust-option-result";
import Object from "@rbxts/object-utils"
import { Items } from "server/Items/Enums";

// -- Type Definitions -- //
export interface ItemProperties {
    id: string;
    owner: number;
    template: Items;
    location: "Store" | "Inventory" | "Lot"
}
export type IItem = Map<string, ItemProperties>

export interface ItemStore {
    byId: IItem;
    allIds: string[]
}

// -- Actions -- //
 interface Base extends AnyAction {
     payload: {
         id: string;
     }
 }
 export interface updateItem extends Base {
     type: "updateItem";
     payload: {
         id: string;
         properties: ItemProperties
 
     }
 }
 export interface removeItem extends Base {
     type: "removeItem";
     payload: {
         id: string
     }
 }


// -- Setup Information -- //
const map:IItem = new Map()

// -- Reducer -- //
const itemReducer = Rodux.createReducer<ItemStore,"byId",updateItem|removeItem>(map,{
    updateItem: (state, action) => {
        const {id, properties } = action.payload
        const copyState = Object.deepCopy(state)
        copyState.set(id, properties)

        return copyState
    },
    removeItem: (state,action) => {
        const {id} = action.payload

        const copyState = Object.deepCopy(state)
        copyState.delete(id)
        return copyState
     
    }

})


export default itemReducer