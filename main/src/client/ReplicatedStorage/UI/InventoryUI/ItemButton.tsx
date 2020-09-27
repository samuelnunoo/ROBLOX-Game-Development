import Roact from "@rbxts/roact"


interface Props {
    itemID:string;
    camera:Camera;
    callback: (arg:string) => void;
    position: UDim2;
    size: UDim2;
}

export default function ItemButton(props:Props) {

    return 
    <imagebutton
    
        Size = {props.size}
        Position = {props.position}
        Event = {{
            MouseButton1Click: () => props.callback(props.itemID)
        }}
    >
        <viewportframe
        Key = {props.itemID}
        CurrentCamera = {props.camera}
        />
    </imagebutton>
    

        
}








