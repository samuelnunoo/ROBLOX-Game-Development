import Roact from "@rbxts/roact"
import roactRedux from "@rbxts/roact-rodux"
import { ItemProperties } from "server/Store/Reducers/itemData"
import ItemGrid from "./ItemGrid"
import {InventoryStuff} from "server/CSMiddleware/InventoryDataRequest"


interface Props { 
    grid: InventoryStuff[];
}

type itemData = (false|ItemProperties)[]


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

