import Roact from "@rbxts/roact";

interface Props {
    text:string;
    color: Color3;
    position: UDim2;
    size: UDim2;
    callback: Fn

}

function Button (props: Props) {
    return (<textbutton
             Text = {props.text}
             BackgroundColor3 = {props.color}
             Position = {props.position}
             Size = {props.size}
             Event = {{
                 MouseButton1Click: ():Fn => props.callback(props.text)
             }} />)
}

export default Button