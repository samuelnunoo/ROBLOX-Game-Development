import Roact from "@rbxts/roact"
import { InventoryStuff } from "server/CSMiddleware/InventoryDataRequest"
import ItemButton, {ItemUIProp} from "./ItemButton"

interface Props { 
    grid: InventoryStuff[];
}
const InventoryData = game.GetService("ReplicatedStorage").InventoryData

export default class ItemGrid extends Roact.Component<{},Props> {

    private _connection = InventoryData.OnClientEvent.Connect((data:InventoryStuff[]) => 
    this.updateInventory(data))

    constructor() {
        super({})

        this.setState({
            grid:[]
        })
        this.fetchData()
    }

    private updateInventory (grid:InventoryStuff[])  {
        this.setState({
            grid
        })
    }

    private fetchData() {
        InventoryData.FireServer()
    }

    public render(): Roact.Element {
        const {grid} = this.state;

        return (<scrollingframe>
            <uigridlayout/>
            {
                grid.map(data => 
                    Roact.createElement(ItemButton,data))
            }
        </scrollingframe>)
    }
}
