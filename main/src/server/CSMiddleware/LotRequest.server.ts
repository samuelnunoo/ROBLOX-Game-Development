import lotRequest from "../Build System/LotRequest"


const lotRemote = game.GetService("ReplicatedStorage").LotRequest
lotRemote.OnServerInvoke = lotRequest
