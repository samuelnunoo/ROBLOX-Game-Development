import Roact from "@rbxts/roact"
import roactRedux from "@rbxts/roact-rodux"
import { ClientStore } from "client/ReplicatedStorage/ClientState/Store"
import { ItemProperties } from "server/Store/Reducers/itemData"
import ItemButton, {ItemUIProp} from "./ItemButton"
import ItemGrid from "./ItemGrid"
import {InventoryStuff} from "server/CSMiddleware/InventoryDataRequest"


interface Props { 
    grid: InventoryStuff[];
}

type itemData = (false|ItemProperties)[]
const InventoryData = game.GetService("ReplicatedStorage").InventoryData

export default class InventoryUI  extends Roact.Component<{}> {

    constructor() {
        super({})
    }

    public render(): Roact.Element {
        return (
            <screengui>
                <frame>
                    <ItemGrid/>
                </frame>
            </screengui>
        )
    }

}

