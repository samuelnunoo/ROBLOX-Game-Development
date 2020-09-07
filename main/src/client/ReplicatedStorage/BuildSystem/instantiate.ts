const UIS = game.GetService("UserInputService")

export const getItemModel =  () => {


}


export const getRay = (UIS:UserInputService) => (raycastParams:RaycastParams)  => (camera:Camera) => {
    const mousePos = UIS.GetMouseLocation()
    const {Origin,Direction} = camera.ScreenPointToRay(mousePos.X,mousePos.Y) 

    return game.Workspace.Raycast(Origin,Direction.mul(100),raycastParams)


}

export const spawnItem = (item:Model) => {

    
}













