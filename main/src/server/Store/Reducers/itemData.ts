import Rodux, { AnyAction } from "@rbxts/rodux";
import { Option } from "@rbxts/rust-option-result";

// -- Type Definitions -- //
export interface ItemProperties {
    id: string;
    model : Model;
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
            model: Model;
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

 export interface updateItemLot extends Base {
     type: "updateLot";
     payload: {
         id: string;
         lotID: string;
     }
 }
// -- Setup Information -- //
const map:IItem = new Map()

// -- Reducer -- //

const itemReducer = Rodux.createReducer<ItemStore,"byId",updateItem|removeItem|updateItemLot>(map,{
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
     
    },
    updateLot: (state,action) => {
        const {id,lotID} = action.payload

       return  Option.some(state.get(id) as ItemProperties)
        .filter(values => values !== undefined)
        .filter(values => typeOf(lotID) === "string")
        .map(values => {
            const clone = Object.deepCopy(values)
            clone.lotSave = lotID
            return state.set(id,clone)
        })
        .unwrapOr(state)
    }

})


export default itemReducer