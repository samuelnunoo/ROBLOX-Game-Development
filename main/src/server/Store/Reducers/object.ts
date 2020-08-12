import Rodux, { AnyAction } from "@rbxts/rodux";


interface Object {
    translation: Vector2;
    rotation: Vector2;
    instance: Instance;
}
type ObjectContainer = Map<string,Object>

export interface setObject extends AnyAction {
    type: "setObject",
    instance: Instance;
    rotation: Vector2;
    translation: Vector2;
}


const map: ObjectContainer = new Map()
const objectReducer = Rodux.createReducer<ObjectContainer,setObject>(map,{
    setObject: (state, action) => {
        const newMap: ObjectContainer = new Map()
        state.forEach( (value,key) => newMap.set(key,value))

        const {instance, rotation, translation } = action 
        const name = instance.Name

        return newMap
    }
})