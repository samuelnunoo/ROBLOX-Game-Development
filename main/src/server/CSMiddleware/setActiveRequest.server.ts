import { Option } from "@rbxts/rust-option-result"
import {  modelRequestWrapper } from "server/Build System/ItemRequest"
import { setActiveItem } from "server/Store/Actions/playerAction"
export {}

const activeItemRemote = game.GetService("ReplicatedStorage").activeItemRequest
const handleRequest = (payload:Player,itemID:unknown) => {

   if (typeOf(itemID) === "string") {
        setActiveItem(payload,itemID as string)
   }
}

activeItemRemote.OnServerEvent.Connect(handleRequest)

