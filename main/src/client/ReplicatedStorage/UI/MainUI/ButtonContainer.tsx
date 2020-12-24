import Roact from "@rbxts/roact"
import ImageButton from "../Components/ImageButton"
import {ImageUI} from "../Components/ImageButton"

export default (items:ImageUI[]) => {
    return(
        <frame 
            Position = { new UDim2(0.718,0,0,0)}
            Size = { new UDim2(0,331,0,63)}
            BackgroundTransparency = { 1 }
        >
            <uigridlayout
                CellSize = { new UDim2(0,64,0,64)}
            />
            {
                items.map(props => Roact.createElement(ImageButton, props))
            }

        </frame>
            
            
            )
}