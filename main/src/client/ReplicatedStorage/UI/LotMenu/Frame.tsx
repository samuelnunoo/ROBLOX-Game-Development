import Roact from "@rbxts/roact"


interface roactProps {
    [Roact.Children]: Roact.Element[]
}

function Frame(props:roactProps) {
    return(
    <frame
        BackgroundColor3 = {  Color3.fromRGB(255,255,255)}
        Position = { new UDim2(0.335,0,0.06,0)}
        Size = { new UDim2(0,538,0,456)}
    >
        {...props[Roact.Children]}
    </frame>)
}

export default Frame;