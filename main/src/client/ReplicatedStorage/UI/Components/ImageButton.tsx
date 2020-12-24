import Roact from "@rbxts/roact"
export interface ImageUI {
    image: string;
    color: Color3;
    position: UDim2;
    size: UDim2;
    callback: Fn

}


function ImageButton(props:ImageUI) {

    return (<imagebutton
                Image = { props.image }
                Position = {props.position}
                Size = {props.size}
                Event = {{
                    MouseButton1Click: () => props.callback() 
                }}

            />)
}


export default ImageButton