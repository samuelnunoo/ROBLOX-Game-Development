import { Players, RunService, UserInputService, Workspace, TweenService } from '@rbxts/services';
import { initCamera, panCamera, CameraEvent, updateCamera, zoomCamera, rotateCamera, boundary } from '../ReplicatedStorage/Build Mode/BuildCamera';
import { getMouseRay, MoveFurniture } from '../ReplicatedStorage/Build Mode/BuildTools/MoveFurniture';

const localPlayer = Players.LocalPlayer as LocalPlayer;
const grid1 = Workspace.Lots.FindFirstChild("Grid1") as BasePart
const UIS = UserInputService

let  character = localPlayer.Character 
while (character === undefined) {
    wait() 
    character = localPlayer.Character 
}
const humanoid = (character as Model).FindFirstChild("Humanoid") as Humanoid

humanoid.WalkSpeed = 0;
humanoid.JumpPower = 0;
new CameraEvent(grid1)

const model = game.Workspace.FindFirstChild("Test") as Model 
new MoveFurniture(grid1,model,Workspace.CurrentCamera as Camera)

/*
RunService.RenderStepped.Connect( (dt) => {

    const mouse = UIS.GetMouseDelta()
    const radians = mouse.mul(ROTATION_SPEED_MOUSE).mul(dt)
    const [x,y,z] = camera.CFrame.ToEulerAnglesYXZ()
 
 
    camera.CFrame = 
        (CFrame.Angles(x - radians.Y,y - radians.X,0)).add(camera.CFrame.Position)

        print(mouse.X,mouse.Y,radians.X,radians.Y, x - radians.Y,  y - radians.X,dt)
})
*/