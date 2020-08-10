import Roact from "@rbxts/roact";

const LocalPlayer = game.GetService("Players").LocalPlayer as LocalPlayer




const tree = <screengui>
    <textlabel Key="label" Text = "Hello, World!" Size={new UDim2(1,0,1,0)} />

</screengui>


Roact.mount(tree, LocalPlayer.PlayerGui, "HelloWorld")