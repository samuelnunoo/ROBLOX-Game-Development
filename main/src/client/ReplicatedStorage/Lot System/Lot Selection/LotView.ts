const UIS = game.GetService("UserInputService")
import {Players, Workspace} from "@rbxts/services"
import { Grid } from "client/ReplicatedStorage/ClientState/Reducers/serverData";

const localPlayer = Players.LocalPlayer as LocalPlayer 
const camera = game.Workspace.CurrentCamera as Camera;
class Selection {

    private result: Instance | undefined = undefined;
    private isRunning: boolean = true;
    private connection =  UIS.InputBegan.Connect((input) => this.inputSelection(input))
    private rayParams:RaycastParams = new RaycastParams();
    private selectionBox: SelectionBox = new Instance("SelectionBox")

    constructor(type:"residential" | "business") {
        this.setCamera()
        this.setupRay(type)
        this.selectionBox.Parent = localPlayer.PlayerGui;
        this.selectionBox.Color3 = new Color3(0.333333, 0.666667, 0);
        this.selectionBox.LineThickness = 2;
        this.selectionLoop()
    }

    private inputSelection(input:InputObject) {
        if (input.UserInputType === Enum.UserInputType.MouseButton1) {
            this.makeSelection()
        }
    }

    public makeSelection() {
        if (this.result !== undefined) {
            this.isRunning = false;
            this.selectionBox.Destroy()
            const lotID = this.result.Name
        }
    }
    
    private setCamera() {
        const point = game.Workspace.CameraPoint;
        camera.CameraSubject = point;
        camera.CameraType = Enum.CameraType.Scriptable
        camera.CFrame = point.CFrame;
    }

    public isType (result:string,type:"residential"|"business") {
        if (result === "Residential" && type === "residential") return true 
        if (result === "Business" && type === "business") return true;
        return false;
    }

    private setupRay(type:"residential" | "business") {
        const whitelist = game.Workspace.Lots.GetChildren() as Grid[]
        this.rayParams.FilterDescendantsInstances = whitelist.filter((lot:Grid) => this.isType(lot.LotType.Value,type))
        this.rayParams.FilterType = Enum.RaycastFilterType.Whitelist
    }

    public selectionLoop() {
        while (this.isRunning) {
            wait(0.1)
            const mouse = UIS.GetMouseLocation();
            const ray = camera.ViewportPointToRay(mouse.X,mouse.Y)
            const rayResult = Workspace.Raycast(ray.Origin,ray.Direction.mul(500), this.rayParams)

            if (rayResult !== undefined) {
                this.selectionBox.Adornee = rayResult.Instance
            }

            else this.selectionBox.Adornee = undefined;
            this.result = rayResult !== undefined ? rayResult.Instance : undefined;
        }
    }








}

export default Selection 

