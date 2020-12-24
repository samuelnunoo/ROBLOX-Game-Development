import Roact from "@rbxts/roact"
import { StoreProvider } from "@rbxts/roact-rodux"
import app from "../ReplicatedStorage/UI/LotMenu/app"
const Player = game.GetService("Players").LocalPlayer as LocalPlayer

Roact.mount(app, Player.PlayerGui, "Testing")