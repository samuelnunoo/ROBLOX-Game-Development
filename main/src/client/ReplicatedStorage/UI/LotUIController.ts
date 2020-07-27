import ClientMediator, { CMEnum } from "client/ReplicatedStorage/Logic/ClientMediator"
import test from "ECS";


export interface LotGui extends ScreenGui {
    Frame: Frame  & {
        Left: TextButton,
        Right: TextButton,
        Select: TextButton
    }
}

export default class LotUIController {
    private _handle: ClientMediator
    private current: number

    private _left: TextButton
    private _right: TextButton
    private _submit: TextButton


    constructor(Gui: LotGui) {
        this._handle = ClientMediator.getInstance()
        this.current = 0

        this._left = Gui.Frame.Left
        this._right = Gui.Frame.Right
        this._submit = Gui.Frame.Select 

        this._left.MouseButton1Click.Connect(() => this.switchDisplay(-1))
        this._right.MouseButton1Click.Connect(() =>this.switchDisplay(1))
        
    }

    displayLots () {
       const lots: Array<BasePart> | void = this._handle.request(CMEnum.Lot) 
    }

    switchDisplay (direction:number) {
        const lots: Array<BasePart> | void = this._handle.request(CMEnum.Lot)
        if (lots as Array<BasePart>) {
            
        if (direction === -1 && this.current === 0) return
        if (direction === 1 && this.current === ((lots as Array<BasePart>).size())) return
    
        this.current += direction
        const part: BasePart = (lots as Array<BasePart>)[this.current]
        this._handle.request( CMEnum.cameraFocus, part)

        }
    }

    selectedLot () {
        this._handle.request(CMEnum.Push, 'Lot2')
    }

    

}


