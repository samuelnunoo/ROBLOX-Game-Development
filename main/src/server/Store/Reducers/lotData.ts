import Rodux, {AnyAction} from "@rbxts/rodux";

//---- Type Information --- //

export type ILotStore = Map<string, lotData>
interface lotData {
    objects: Map<string,boolean>;
    type: string;
    instance: Instance;
    owner: number
}
export interface lotStore {
    byId:  Map<string,lotData>
    allIds: string[]
}

//----- Setup Information --- // 
const defaultData = (player:Player,instance:Instance): lotData => {
    const type = instance.Name
    const map: Map<string,boolean> = new Map()

    return {
        objects: map,
        type,
        instance,
        owner: player.UserId
        
    } as lotData
}


// -------- Action Types --- //
interface BaseAction extends AnyAction {
    payload : {
        id: string 
    }
  
}
export interface updateObjects extends BaseAction {
    type: "updateObjects";
    payload: {
        add: boolean;
        item: string;
        id: string;
    }
}
export interface setType extends BaseAction {
    type: "lotType";
    payload: {
        id: string;
        type: string;
    }
}
export interface newSave extends BaseAction {
    type: "newSave"
    payload: {
        id:string;
        player: Player;
        instance: Instance;
    }
}
export interface removeSave extends BaseAction {
    type: "removeSave";
    payload: {
        id: string;
    }
}

// ----- Reducer --- //
const map: Map<string,lotData> = new Map()
const lotReducer = Rodux.createReducer<lotStore, "byId",  updateObjects|setType|newSave|removeSave>(map, {
    updateObjects: (state, action) => {
        const {item, add, id} = action.payload
        const lotSave = state.get(id)

        if (lotSave) {
            const copy = Object.deepCopy(lotSave)
            
            add ? copy.objects.set(item,true) 
            : copy.objects.delete(item)

            const newState = Object.deepCopy(state)
            newState.set(id,copy)
            
            return newState

        }
        return state 
    },
    lotType: (state, action) => {
        const {id, type} = action.payload

        const lotData = state.get(id) 

        if (lotData) {
            const copy = Object.deepCopy(lotData)
            copy.type = type 

            const newState = Object.deepCopy(state)
            newState.set(id,copy)

            return newState
        }

        return state 
    },
    newSave: (state, action) => {
        const { id, instance, player} = action.payload

        const doesExist = state.get(id)

        if(!doesExist) {
            const newState = Object.deepCopy(state)
            newState.set(id, defaultData(player,instance))

            return newState
        }

        return state
    },
    removeSave: (state, action) => {
        const { id } = action.payload

        const newState = Object.deepCopy(state)
        newState.delete(id)
        
        return newState

    }
})


export default lotReducer
