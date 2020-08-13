import {changeCurrency, updateLot, updateInventory, activeLot} from "../Reducers/playerData"

export function currencyAction (player: Player, change: number): changeCurrency {
    return {
        type: "updateCurrency",
        change,
        id: player.UserId
    } as changeCurrency
}
export function lotAction (player:Player, lotId:string, add: boolean): updateLot {
    return {
        type: "updateLot",
        id: player.UserId,
        payload: {
            lotId,
            add
        }
    }
}
export function inventoryAction (player:Player,itemId:string, add: boolean ): updateInventory {
    return {
        type: "updateInventory",
        id: player.UserId,
        payload: {
            itemId,
            add
        }
    }
}
export function playerAction (player:Player) {
    return {
        type: "addPlayer",
        player
    }
}

export function setActiveLot (player:Player, lot:Instance): activeLot {
    return {
        type: "activeLot",
        payload: {
            id: player.UserId,
            lot
        }

    } as activeLot
}