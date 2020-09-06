import Redux, { AnyAction } from "@rbxts/rodux";
import { Option } from "@rbxts/rust-option-result";

// -- Type Definitions -- //
export interface values {
    id: number;
    lots: Map<string, boolean>
    currency: number | 0;
    inventory: Map<string, boolean>;
    activeLot: {
        lot: BasePart | undefined;
        save: string | undefined;
    };
    activeItem: string | false;
}
export type playerId = Map<number,values>
export interface playerReducer {
    byId: playerId
    allIds: string[]
}

// -- Setup Information -- //
function defaultData (id:number): values {
    return {
        id,
        lots: new Map(),
        currency: 0,
        activeItem: false,
        activeLot: {
            lot:undefined,
            save: undefined},
        inventory: new Map()
    } as values
}
const map: Map<number,values> = new Map()

// -- Actions -- //
interface baseSystem extends AnyAction {
    id: number;
}
export interface changeCurrency extends baseSystem {
    type: "updateCurrency";
    change: number;

}

export interface updateLot extends baseSystem{
    type: "updateLot";
    payload: {
        lotId: string;
        add: boolean;
    }
  

}

export interface updateInventory extends baseSystem {
    type: "updateInventory";
    payload: {
        itemId: string;
        add: boolean;

    }

}
export interface addPlayer extends AnyAction {
    type: "addPlayer";
    player: Player;
}
export interface activeLot extends baseSystem {
    type: "activeLot";
    payload: {
        id: number;
        save: string | undefined;
        lot: BasePart | undefined;
    }
}

export interface activeItem extends baseSystem {
    type: "activeItem";
    payload: {
        itemId: string;
    }
}
// -- Reducer -- //
const playerData = Redux.createReducer<playerReducer, "byId",activeItem| changeCurrency|updateLot|updateInventory|addPlayer|activeLot>(map, {
    updateCurrency: (state, action) => {
        const {change, id} = action
        const player = state.get(id)

        if(player) {
            const newData = Object.deepCopy(player)
            newData.currency += change 

            const copyMap = Object.deepCopy(state)
            copyMap.set(id,newData)

            return copyMap

        }



        return state
    },
    updateLot: (state, action) => {
        const { id } = action
        const { lotId, add} = action.payload

        const player = state.get(id)

        if (player) {
            const dataCopy = Object.deepCopy(player)
            const { lots } = dataCopy

            if (add) {
                lots.set(lotId, true)
            }
            else {
                lots.delete(lotId)
            }

            const copyState = Object.deepCopy(state)
            copyState.set(id,dataCopy)

            return copyState
        
        }

        return state 
    },
    updateInventory: (state, action) => {
        const {id} = action
        const {itemId, add} = action.payload

        const data = state.get(id)

        if (data) {
            const copyData = Object.deepCopy(data)
            
            if (add) {
                copyData.inventory.set(itemId, true)
            }
            else {
                copyData.inventory.delete(itemId)
            }

            const newState = Object.deepCopy(state)

            newState.set(id, copyData)

            return newState



        }


        return state 
    },
    addPlayer: (state,action) => {
        const { player } = action
        const id = player.UserId

        const doesExist = state.get(id)

        if (!doesExist) {
            const data = defaultData(id)
            
            const newState = Object.deepCopy(state)
            newState.set(id,data)

            return newState
            
        }

        return state 
    },
    activeLot: (state, action) => {
        const {lot, save, id} = action.payload
        const isPlayer = state.get(id)

        if (isPlayer) {
                const copyPlayer = Object.deepCopy(isPlayer)
                copyPlayer.activeLot = {lot, save}

                const copyState = Object.deepCopy(state)
                copyState.set(id, copyPlayer)

                return copyState
        }


        return state 
    },
    activeItem: (state, action) => {
        const {id, payload} = action

        const playerData = Option.some(state.get(id) as values)
            .map((data:values) => Object.deepCopy(data))
            .filter((data:values) => data.inventory.get(payload.itemId) === true)
            .map((data:values) => { data.activeItem = payload.itemId; return data})
            .map((data:values) => Object.copy(state).set(id,data))
            .unwrapOr(state)

        return playerData
    }

})

export default playerData