import Rodux, {AnyAction} from "@rbxts/rodux"

export type activeLots = Map<Player,Instance|false>
export interface ActiveLotAction extends AnyAction {
    type: "activeLot";
    player: Player;
    value: Instance | false  
}

const map: activeLots = new Map()
const lotReducer = Rodux.createReducer<activeLots,ActiveLotAction>(map, {
    activeLot: (state, action) => {
        const newMap: activeLots = new Map()
        state.forEach( (value,key) => newMap.set(key,value))
        const { player, value } = action
        newMap.set(player,value)
        
        return newMap

    }
} )

export default lotReducer