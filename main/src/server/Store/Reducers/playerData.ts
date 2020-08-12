import Redux, { AnyAction } from "@rbxts/rodux";

export interface values {
    id: number;
    lots: Map<string, boolean>
    currency: number | 0;
    inventory: Map<string, boolean>
}

function defaultData (id:number): values {
    return {
        id,
        lots: new Map(),
        currency: 0,
        inventory: new Map()
    } as values
}

export type playerId = Map<number,values>

export interface playerReducer {
    byId: playerId
    allIds: string[]
}

interface baseSystem extends AnyAction {
    id: number 
}

export interface changeCurrency extends baseSystem{
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

const map: Map<number,values> = new Map()
const playerData = Redux.createReducer<playerReducer, "byId", changeCurrency|updateLot|updateInventory|addPlayer>(map, {
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

        const data = state.get(id)

        if (data) {
            const dataCopy = Object.deepCopy(data)
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
    }
})



export default playerData