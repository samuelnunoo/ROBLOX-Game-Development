import Redux, { AnyAction } from "@rbxts/rodux";


interface values {
    id: string;
    lots: Map<string, boolean>
    currency: number | 0;
    inventory: string[];
}

interface playerReducer {
    byId: Map<string,values>
    allIds: string[]
}

interface changeCurrency extends AnyAction {
    type: "updateCurrency";
    change: number;
    id: string;
}

interface updateLot extends AnyAction {
    type: "updateLot";
    id: string
    payload: {
        lotId: string;
        add: boolean;
    }
  

}


const map: Map<string,values> = new Map()

const playerData = Redux.createReducer<playerReducer, "byId", changeCurrency|updateLot>(map, {
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
    }

})

