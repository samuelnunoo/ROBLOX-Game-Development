import Roact from "@rbxts/roact"
import Button from "./Button"
import {IButton} from "./Button"
import Frame from "./Frame"
import GridLayout from "./GridLayout"
import ClaimState from "./ButtonType/ClaimState"
import ReturnState from "./ButtonType/ReturnState"
import claimState from "../LotMenu/ButtonStates/claimState"
import serverRequest from "client/ReplicatedStorage/ServerGateway/serverRequest"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums"
const camera = game.Workspace.CurrentCamera as Camera;
import {IObserver} from "client/ReplicatedStorage/Observer/Observer"
import Observer from "client/ReplicatedStorage/Observer/Observer"
import UIManager from "../UIManager"

export interface IPreview {
    type:string;
}

const player = game.GetService("Players").LocalPlayer as LocalPlayer
class LotPreview extends Roact.Component<IPreview> implements IObserver {

    private type:string;
    constructor(props:IPreview) {
        super(props)
        this.type = props.type
        Observer.subscribe(Request_ID.Lot_Request,this)
        this.setCamera();
    }

    public update(data:boolean) {
        //@todo add a gui 
        UIManager.unmount("Preview")
        camera.CameraSubject = player.Character?.FindFirstChild("Humanoid") as Humanoid
        camera.CameraType = Enum.CameraType.Follow
        print(data)
    }
    
    public setCamera() {
        const Instance = game.Workspace.Lots.FindFirstChild(this.type) as BasePart
        camera.CameraSubject = Instance;
        camera.CameraType = Enum.CameraType.Orbital
    }

    public claimLot() {
        serverRequest(Request_ID.Lot_Request,{lot:this.type, isAdd:true})
        
    }

    public return() {

    }

    public claimState() {
        return {
            event: () => this.claimLot(),
            name: "claim",
            title: "Claim Lot",
            ...claimState,
        }    as IButton
    }

    public returnState() {
        return {
            ...ReturnState,
            event: () => this.return()

        } as IButton
    }

    public render() {
        return(
            <Frame>
                <GridLayout/>
                <Button {...this.claimState()}/>
                <Button  {...this.returnState()}/>
            </Frame>
        )
    }
}


export default LotPreview