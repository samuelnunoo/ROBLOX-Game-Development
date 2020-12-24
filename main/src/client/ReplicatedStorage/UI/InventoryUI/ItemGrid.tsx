import Roact from "@rbxts/roact"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import { InventoryStuff } from "server/CSMiddleware/InventoryDataRequest"

interface Props { 
    grid: InventoryStuff[];
}


const serverGateway = game.GetService("ReplicatedStorage").serverGateway;
export default class ItemGrid extends Roact.Component<{},Props> {


    constructor() {
        super({})

        this.setState({
            grid:[]
        })
        this.fetchData()
    }

    public updateInventory (grid:InventoryStuff[])  {
        this.setState({
            grid
        })
    }

    private fetchData() {
        serverGateway.FireServer(Request_ID.Inventory_Data,this);
    }

    public render(): Roact.Element {
        const {grid} = this.state;

        return (<scrollingframe>
            <uigridlayout/>
            {
               /* grid.map(data =>  //@todo update
                    Roact.createElement(ItemButton,data))
                    */
            }
        </scrollingframe>)
    }
}
