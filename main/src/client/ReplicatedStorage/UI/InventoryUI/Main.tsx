import Roact from "@rbxts/roact"
import roactRedux from "@rbxts/roact-rodux"
import { ClientStore } from "client/ReplicatedStorage/ClientState/Store"
import { ItemProperties } from "server/Store/Reducers/itemData"
import ItemGrid from "./ItemGrid"

interface Props { grid: (false|ItemProperties)[]}
const InventoryData = game.GetService("ReplicatedStorage").InventoryData

type itemData = (false|ItemProperties)[]
class InventoryUI  extends Roact.Component<Props> {

    private _inventory: (false |ItemProperties)[] = []
    private _connection = InventoryData.OnClientEvent.Connect( (data:itemData)=> 
        this.updateInventory(data))

    constructor() {
        super({ grid:[] })
        this.fetchData()
    }

    private updateInventory (data:(false|ItemProperties)[])  {
        print(data)
        this.setState({grid:data})
    }

    private fetchData() {
        InventoryData.FireServer()
    }

    public render(): Roact.Element {
        return (
            <screengui>
                <frame
                Key = '2'>

                </frame>
            </screengui>
        )
    }

}

