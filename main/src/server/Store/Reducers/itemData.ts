import Rodux, { AnyAction } from "@rbxts/rodux";

// -- Type Definitions -- //
export interface ItemProperties {
    id: string;
    template: string;
    style: Map<string,string>;
    rarity: "High" | "Low" | "Medium";
    owner: string;
    lotSave: undefined | string;
    offset: undefined | Vector3;
    orientation: undefined | Vector3
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
         properties: {
            id: string;
            template: string;
            style: Map<string,string>;
            rarity: "High" | "Low" | "Medium";
            owner: string;
            lotSave: undefined | string;
            offset: undefined | Vector3;
            orientation: undefined | Vector3;

         }
 
     }
 }

 export interface removeItem extends Base {
     type: "removeItem";
     payload: {
         id: string;
     }
 }


// -- Setup Information -- //
const map:IItem = new Map()

// -- Reducer -- //

const itemReducer = Rodux.createReducer<ItemStore,"byId",updateItem|removeItem>(map,{
    updateItem: (state, action) => {
        const {id, properties } = action.payload
        const copyState = Object.deepCopy(state)
        copyState.set(id,properties)

        return copyState
    },
    removeItem: (state,action) => {
        const {id} = action.payload

        const copyState = Object.deepCopy(state)
        copyState.delete(id)
        return copyState
     
    },

})


export default itemReducer