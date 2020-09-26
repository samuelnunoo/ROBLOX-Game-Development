import {  modelRequestWrapper } from "server/Build System/ItemRequest"

export {}

const itemRemote = game.GetService("ReplicatedStorage").itemRequest
itemRemote.OnServerInvoke = modelRequestWrapper 