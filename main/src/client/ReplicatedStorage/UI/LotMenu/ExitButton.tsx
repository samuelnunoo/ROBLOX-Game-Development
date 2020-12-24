import Roact from "@rbxts/roact"


function ExitButton() {
    return(
        <textbutton
            BackgroundColor3 = {  Color3.fromRGB(250,141,141)}
            Position = { new UDim2(0.933,0,0,0)}
            Size = { new UDim2(0,36,0,36)}
            TextColor3 = { Color3.fromRGB(85,0,0)}
            Text = { "X" }
            BorderSizePixel = { 0 } 
        />
    )
}


export default ExitButton