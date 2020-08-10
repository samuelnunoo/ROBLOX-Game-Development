import Button from "../Components/Button"
import Roact from "@rbxts/roact";

interface Props {
    text:string;
    position: UDim2;
    callback: Fn
}
export default function LotButton(props: Props) {
    return <Button
    size = {new UDim2(0,124,0,54)} 
    text = {props.text}
    color = {new Color3(122, 255, 33)}
    callback = { props.callback }
    position = { props.position}/>
}