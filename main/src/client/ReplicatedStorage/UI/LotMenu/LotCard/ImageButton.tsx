import Roact  from "@rbxts/roact"

export interface IImageButton {
    image:string;
    event:Fn;
    type:"residential" | "business";
}

interface RoactProps {
    [Roact.Children]: Array<Roact.Element>
}

type FunctionalComponent<T> = (props: RoactProps & T) => Roact.Element


const ImageButton: FunctionalComponent<IImageButton> = (props) => {
    return(
        <imagebutton
            Size = { new UDim2(0,249,0,324)}
            Image = { props.image }
            Event = {
                { 
                    MouseButton1Click:props.event(props.type)
                }
        }
        >
            {...props[Roact.Children]}
        </imagebutton>
    ) 
}


export default ImageButton