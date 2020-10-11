import Roact from "@rbxts/roact"
import ItemButton, {ItemUIProp} from "./ItemButton"

export default function ItemGrid(props:ItemUIProp[]) {
    return ( <scrollingframe>
        <uigridlayout/>
        {
            props.map( data => 
                Roact.createElement(ItemButton,data))
        }
    </scrollingframe>
    )   
}