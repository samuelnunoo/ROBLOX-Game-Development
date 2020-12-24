import Roact from "@rbxts/roact"




export interface ITextLabel {
    text: string;
    color: Color3;
    background:Color3;

}



function TextLabel(props:ITextLabel) {
    return(
        <textlabel
            Size = { new UDim2(0,200,0,50)}
            Position = { new UDim2(0.096,0,0.778,0)}
            Text = {props.text }
            TextColor3 = { props.color}
            BackgroundColor3 = { props.background}
            BorderSizePixel = { 0 }
        />
    )
}

export default TextLabel