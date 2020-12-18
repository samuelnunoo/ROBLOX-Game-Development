import { IReducer } from "server/Store/Reducers"
import { Store } from "@rbxts/rodux"
import { ItemRequest } from "server/Build System/ItemRequest"
import { getModules } from "@rbxts/testez/src/TestBootstrap"
import { Request_ID } from "../ServerGateway/Enums"

const UIS = game.GetService("UserInputService")
const itemRemote = game.GetService("ReplicatedStorage").serverGateway //@todo update file
const serverGateway = game.GetService("ReplicatedStorage").serverGateway;


//@todo remodel this
export const getModel =  (itemID:string) => {
  //  return itemRemote.InvokeServer(itemID) as Model| undefined 
}
export const createRayParam = (set:Instance[]) => {

    const param = new RaycastParams()
    param.FilterType = Enum.RaycastFilterType.Whitelist
    param.IgnoreWater = true
    param.FilterDescendantsInstances = set
    
    return param 
}
export const getRay = (UIS:UserInputService) => (raycastParams:RaycastParams)  => (camera:Camera) => {
    const mousePos = UIS.GetMouseLocation()
    const {Origin,Direction} = camera.ScreenPointToRay(mousePos.X,mousePos.Y) 

    return game.Workspace.Raycast(Origin,Direction.mul(100),raycastParams)


}
export const moveItem = (param:RaycastParams) => (item:Model) => {
    const ray = getRay(UIS)(param)(game.Workspace.Camera)
    if (ray) item.MoveTo(ray.Position)
}
export const spawnItem = (item:Model) => {
    const newItem = item.Clone()
    newItem.Parent = game.Workspace

    return newItem
}

let isMouseDown = false
export const  moveFunction = (debounce:boolean) => (base?:Model) => {
    const param = createRayParam([])
   // const item =  base || spawnItem(getModel() as Model)

    //While mouseDown
    while (debounce) {
        wait(0.05)
      //  moveItem(param)(item)
    }

    //PlaceItem


 
    

}
export const placeItem = (item:Model) => {

}
export const placeRequest = (item:Model) => {
}
export const setActiveItem = (itemID: string) => {
    serverGateway.FireServer(Request_ID.Active_Item,itemID)
}









