import Roact from "@rbxts/roact"
import roactRedux from "@rbxts/roact-rodux"
import store from "../ReplicatedStorage/ClientState/Store"
import Main from "../ReplicatedStorage/UI/InventoryUI/Main"

const Player =  game.GetService("Players").LocalPlayer as LocalPlayer;

function app() {
    return (<Main/>)
}

Roact.mount(app(), Player.PlayerGui, "ExampleGui")