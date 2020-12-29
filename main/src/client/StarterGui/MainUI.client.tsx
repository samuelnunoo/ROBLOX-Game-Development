import Roact from "@rbxts/roact"
import { StoreProvider } from "@rbxts/roact-rodux"
import app from "../ReplicatedStorage/UI/LotMenu/app"
import UIManager from "../ReplicatedStorage/UI/UIManager"
const Player = game.GetService("Players").LocalPlayer as LocalPlayer

UIManager.mount("Testing",app)
