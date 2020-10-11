import Roact from "@rbxts/roact"


export interface ItemUIProp {
    itemID:string;
    camera:Camera;
    callback: (arg:string) => void;

}

export default function ItemButton(props:ItemUIProp) {

    return <imagebutton
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








