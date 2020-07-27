import BuildInterface from './BuildInterface';
import ClientLotManager from './LotSelection/ClientLotManager'
import CameraLogic from './CameraLogic'; 
import ECS from "ECS";

export const enum CMEnum {  Lot = "lots", Push = "push", cameraFocus = "cameraFocus" }

interface hash {
 [CMEnum.Lot]: () => Array<BasePart>;
 [CMEnum.Push]: (lot:string) => void;
 [CMEnum.cameraFocus]: (lot:BasePart) => void;
}
type functionList = typeof ClientMediator.prototype["_functionList"] 

export default class ClientMediator implements BuildInterface {
    private _functionList: hash
    private _lotManager: ClientLotManager
    private _cameraLogic: CameraLogic
    private static instance: ClientMediator
   
    private constructor() {

        this._lotManager = new ClientLotManager(this)
        this._cameraLogic = new CameraLogic()

        const functionList = {
            [CMEnum.Lot]: this._lotManager.getLots,
            [CMEnum.Push]: this._lotManager.pushLot,
            [CMEnum.cameraFocus]: this._cameraLogic.focusCamera
        } 

        this._functionList = functionList


     

      

    }

    public static getInstance() {
        if (!ClientMediator.instance) {
            ClientMediator.instance = new ClientMediator()
        }
        return ClientMediator.instance
    }
 

    public request<T extends keyof functionList >(key: T, ...params: Parameters<functionList[T]>) {
        const fn = this._functionList[key] as (...args: unknown[]) => void
        return fn(...params) as ReturnType<functionList[T]>
     
    }
    
}

