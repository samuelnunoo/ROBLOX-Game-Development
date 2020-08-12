import { LotAction } from "client/ReplicatedStorage/ClientState/Reducers/availableLots";


export function lotAction(lot: Instance, value: Player|Boolean): LotAction {
    return {
        type: "lots",
        lot,
        value
    }
} 



