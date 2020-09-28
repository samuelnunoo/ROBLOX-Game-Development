import Roact from "@rbxts/roact"
import roactRedux from "@rbxts/roact-rodux"
import { ClientStore } from "client/ReplicatedStorage/ClientState/Store"
import { ItemProperties } from "server/Store/Reducers/itemData"

interface Props { grid: (false|ItemProperties)[]}
const InventoryData = game.GetService("ReplicatedStorage").InventoryData

class InventoryUI  extends Roact.Component<Props> {

    private _inventory: (false |ItemProperties)[] = []
    private _connection = InventoryData.OnClientEvent.Connect(data => this.updateInventory(data))

    constructor() {
        super({ grid:[] })
        InventoryData.FireServer()
    }

    private updateInventory (data:(false|ItemProperties)[])  {
        print(data)
        this.setState({grid:data})
    }

    public render(): Roact.Element {
        return (
            <screengui>
                <frame>

                </frame>
            </screengui>
        )
    }

}

