import Roact from "@rbxts/roact"

interface RoactProps {
    [Roact.Children]: Roact.Element[] | Roact.Element} 


type FunctionalComponent<T> = (props: RoactProps & T) => Roact.Element

const Frame: FunctionalComponent<{}> = (props) => {
    const children = props[Roact.Children];
    const arrayChildren = "props" in children ? [children] : children;
    return (        
    <frame
        Position = {new UDim2(0.223,0,0.099,0)}
        Size = { new UDim2(0,649,0,514)}
        BackgroundTransparency = { 1 }
    >
        {...arrayChildren}
    </frame>

    )
}
export default Frame 