import Roact from "@rbxts/roact"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import { InventoryStuff } from "server/CSMiddleware/InventoryDataRequest"

interface Props { 
    grid: InventoryStuff[];
}


const serverRemote = game.GetService("ReplicatedStorage").serverRemote
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
        serverRemote.FireServer(Request_ID.Update_Store,this);
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
