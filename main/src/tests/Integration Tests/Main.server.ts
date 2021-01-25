
export {}
import {Option} from "@rbxts/rust-option-result"
import { Items } from "server/Items/Enums"
import store from "server/Store/Store"
import { getItemProp, setInventory, setItemProp, setLot } from "tests/Mocks/DefaultStore"
const runService = game.GetService("RunService")
const ITRemote = game.GetService("ReplicatedStorage").ITRemote
const RS = game.GetService("ReplicatedStorage")

const isValid = () => runService.IsStudio()



const ITRequest = (plr:Player, args:unknown) => {
    if (!isValid()) return

    const _rarity = ["High","Low","Medium"]
    const rarity = _rarity[math.random(2)] as "High" | "Low" | "Medium"
    const model = Items.chair
    const itemID = tostring(math.random(1235304))
    const owner = plr.UserId
    const prop = getItemProp(itemID)(owner)(rarity)(model)
    const newStore = setInventory(setItemProp(store)(prop))(plr)([{itemId:itemID, add:true}])
    const lotID = '12345'
    const newnewStore = setLot(newStore)(plr)(lotID)
    print("Test Store Loaded")


}

ITRemote.OnServerEvent.Connect( (plr, args) => ITRequest(plr,args))