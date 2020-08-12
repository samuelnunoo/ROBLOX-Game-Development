import Rodux, { AnyAction} from "@rbxts/rodux";

//-- Types -- //
export type Lots = Map<Instance,Player|Boolean>

// -- Actions -- //
export interface LotAction extends AnyAction {
    type: "lots";
    lot: Instance;
    value: Player | Boolean;
}

// -- Initial Setup -- //
const Grids: Instance[] = game.Workspace.Grids.GetChildren()
const initLots: (folder: Instance[]) => Lots = (folder: Instance[]) => {
    const map: Map<Instance, boolean> = new Map()
    folder.forEach( item => map.set(item,false))

    return map
}

//-- Reducer --//
const availableLots =  Rodux.createReducer<Lots,LotAction>(initLots(Grids), {
    lots: (state, action) => {
        const newMap:Lots = new Map()
        state.forEach( (value,key) => newMap.set(key,value))
        const {lot, value} = action
        newMap.set(lot,value)

        return newMap
        
    }
})

export default availableLots
