import Roact from "@rbxts/roact"
import Container from "./Container"
import ExitButton from "./ExitButton"
import Frame from "./Frame"
import LotCard from "./LotCard/Main"
import TextLabel from "./LotCard/TextLabel"
import Title from "./Title"
import claimState from "./ButtonStates/claimState"
import visitState from "./ButtonStates/visitState"
import { IClientReducer } from "client/ReplicatedStorage/ClientState/Reducers"
import roactRodux from "@rbxts/roact-rodux"
import Selection from "client/ReplicatedStorage/Lot System/Lot Selection/LotView"
import UIManager from "../UIManager"

interface LotMenuProps {
    residential: false | string;
    business: false | string;
}

const localPlayer = game.GetService("Players").LocalPlayer as LocalPlayer
const PlayerID = localPlayer.UserId
class LotMenu extends Roact.Component<LotMenuProps,{}> {

    constructor(props:LotMenuProps) {
        super(props)
    }

    public viewLot (type:"residential" | "business") {

    }

    public claimLot (type:"residential" | "business") {
        const gui = UIManager.get("Testing")
        if (gui) Roact.unmount(gui)
        const claim = new Selection(type);
    
    }

    public buttonState (type:"residential" | "business") {
        const isSet = this.props[type] !== false;
        if (isSet) return visitState;
        else return claimState;
    }

    public click(type:"residential" | "business") {
        const isSet = this.props[type] !== false

        if (isSet) this.viewLot(type)
        else  this.claimLot(type)

    }

    public enter() {

    }

    public leave() {

    }

    public render() {
        return(
            <Frame>
                <Title/>
                <ExitButton/>
                <Container>
                    <uigridlayout
                        CellPadding = { new UDim2(0,10,0,0) }
                        CellSize = { new UDim2(0,249,0,324) }
                    />

                    <LotCard 
                        image = "card1"
                        type = "residential"
                        event = { (v) => this.click(v) }
                        { ...this.buttonState("residential")}
                    />

                    <LotCard
                        image = "card2"
                        type = "business"
                        event = { (v) => this.click(v) } 
                        { ...this.buttonState("business") }
                    />
                </Container>
            </Frame>
        )
    }



}

const mapStateToProps = (store:IClientReducer) => {

   return {
       residential: store.serverData.players.get(PlayerID)?.lots.Residential.active,
       business: store.serverData.players.get(PlayerID)?.lots.Business.active
   } as LotMenuProps
}

const mapDispatchToProps = () => {}
export default roactRodux.connect(mapStateToProps,mapDispatchToProps)(LotMenu)