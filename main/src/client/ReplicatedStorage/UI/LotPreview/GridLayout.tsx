import Roact from "@rbxts/roact"





const GridLayout = () => {
    return(
        <uigridlayout
            CellPadding = { new UDim2(0,100,0,5)}
            CellSize = { new UDim2(0,200,0,50)}
            HorizontalAlignment = "Center"
            VerticalAlignment = "Bottom"
        />
    )
}


export default GridLayout