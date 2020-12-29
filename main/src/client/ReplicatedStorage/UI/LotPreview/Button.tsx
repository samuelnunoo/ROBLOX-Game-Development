import Roact from "@rbxts/roact"



export interface IButton {
    event: Function;
    name:string;
    title: string;
    background: Color3;
    color: Color3;

}


const Button = (props:IButton) => {
    return(
        <textbutton
            Event = {
                { MouseButton1Click: () => props.event()}
            }

            Text = { props.title }
            BackgroundColor3 = { props.background }
            TextColor3 = { props.color}
        />
    )
}

export default Button