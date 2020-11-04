import Roact from "@rbxts/roact"
import roactRedux from "@rbxts/roact-rodux"
import store from "../ReplicatedStorage/ClientState/Store"
import Main from "../ReplicatedStorage/UI/LotUI/Main"

const Player = game.GetService("Players").LocalPlayer as LocalPlayer


function app() {
    return (
        <roactRedux.StoreProvider store = {store}>
            <Main />
        </roactRedux.StoreProvider>
    )
}

Roact.mount(app(), Player.PlayerGui, "ExampleGui" )
