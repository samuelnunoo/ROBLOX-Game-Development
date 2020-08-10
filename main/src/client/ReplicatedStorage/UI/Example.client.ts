import Roact from "@rbxts/roact";

export interface LocalPlayer extends Player {
    PlayerGui: PlayerGui
}

const player = game.GetService("Players").LocalPlayer as LocalPlayer
const Gui: PlayerGui = player.PlayerGui

const app = Roact.createElement("ScreenGui", {}, {
    HelloWorld: Roact.createElement("TextLabel",{
        Size: new UDim2(0, 400, 0, 300),
        Text: "Hello, Roact!"
    })
})


Roact.mount(app, Gui ,"LotGui")

