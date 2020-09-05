import { LotAction } from "client/ReplicatedStorage/ClientState/Reducers/availableLots";


export function lotAction(lot: Instance, value: Player|false): LotAction {
    return {
        type: "lots",
        lot,
        value
    }
} 



