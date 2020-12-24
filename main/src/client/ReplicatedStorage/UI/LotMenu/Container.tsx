import Roact from "@rbxts/roact"

interface roactProps {
    [Roact.Children]: Roact.Element[]
}
export default function(props:roactProps) {

    return (
        <frame
            Size = { new UDim2(0,538,0,406)}
            Position = { new UDim2(0.03,0,0.171,0)}
            BorderSizePixel = { 0 }
            BackgroundTransparency = { 1 }
        >
            {...props[Roact.Children]}
        </frame>
    )
}