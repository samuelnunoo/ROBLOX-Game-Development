import {  modelRequestWrapper } from "server/Build System/ItemRequest"
import { getInventoryDataWrapper} from "./InventoryDataRequest"
const RS = game.GetService("ReplicatedStorage")
export {}

const itemRemote = game.GetService("ReplicatedStorage").itemRequest
const InventoryData = RS.InventoryData

itemRemote.OnServerInvoke = modelRequestWrapper 
InventoryData.OnServerEvent.Connect( plr => getInventoryDataWrapper(plr))



