import EventHandler from './EventHandler'
import LotStateManager from './lotStateManager'

export default class Main {
    private _handler: EventHandler

    constructor () { 
        this._handler = new EventHandler()
        this.init()
    }

    init (): void {

        this._handler.add(new LotStateManager())
        this._handler.notify('Hello World')
        
    }
}

new Main()