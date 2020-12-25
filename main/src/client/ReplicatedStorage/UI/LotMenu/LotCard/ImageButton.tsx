import Roact  from "@rbxts/roact"

export interface IImageButton {
    image:string;
    event:Fn;
    type:"residential" | "business";
}

interface RoactProps {
    [Roact.Children]: Array<Roact.Element> | Roact.Element
}

type FunctionalComponent<T> = (props: RoactProps & T) => Roact.Element


const ImageButton: FunctionalComponent<IImageButton> = (props) => {
    const children = props[Roact.Children];
    const arrayChildren = "props" in children ? [children] : children;
    return(
        <imagebutton
            Size = { new UDim2(0,249,0,324)}
            Image = { props.image }
            Event = {
                { 
                    MouseButton1Click:() => props.event(props.type)
                }
        }
        >
            {...arrayChildren}
        </imagebutton>
    ) 
}


export default ImageButton