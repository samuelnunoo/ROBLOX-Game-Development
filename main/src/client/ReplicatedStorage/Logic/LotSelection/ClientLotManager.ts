import ClientMediator from "../ClientMediator"
import IClient from "./ClientLotInterface"
declare const game: DataModel & {
    ReplicatedStorage: ReplicatedStorage & {
        getLots: RemoteFunction,
        pushLot: RemoteEvent
    }
}

export default class ClientLotManager implements IClient {
    private _handler: ClientMediator
    private _getLot: RemoteFunction
    private _pushLot: RemoteEvent
   
    constructor (handler: ClientMediator) {
        this._handler = handler
        this._getLot = game.ReplicatedStorage.getLots
        this._pushLot = game.ReplicatedStorage.pushLot
    }

    public getLots (): Array<BasePart> {
        const lots: Array<BasePart> = this._getLot.InvokeServer()
        return lots
    }

    public pushLot (lot:string): void {
        this._pushLot.FireServer(lot)
    }

}