import { Option } from "@rbxts/rust-option-result";
import { UserInputService, Workspace } from "@rbxts/services";
import Object from '@rbxts/object-utils';

const UIS = UserInputService

export const getMouseRay = (UIS: UserInputService, camera: Camera) => {
    const { X, Y } = UIS.GetMouseLocation()
    const length = 500;
    const ray = (camera as Camera).ScreenPointToRay(X, Y, 10)
    return new Ray(ray.Origin, ray.Direction.mul(length))

}
export const rayCast = (params: RaycastParams, ray: Ray) => {
    return Workspace.Raycast(ray.Origin, ray.Direction, params)
}
export const getBorderPoints = (object: BasePart) => {
    return Option.some(object)
        .map(part => {
            const frontLeft = part.CFrame.mul((part.Size.mul(new Vector3(-0.5, 0, -0.5))))
            const frontRight = part.CFrame.mul((part.Size.mul(new Vector3(0.5, 0, -0.5))))
            const backLeft = part.CFrame.mul((part.Size.mul(new Vector3(-0.5, 0, 0.5))))
            const backRight = part.CFrame.mul((part.Size.mul(new Vector3(0.5, 0, 0.5))))

            return { frontLeft, frontRight, backLeft, backRight }
        })
        .unwrap()


}
export const getLotPoints = (lot: BasePart) => {
    const frontLeft = lot.CFrame.mul((lot.Size.mul(new Vector3(-0.5, 0, -0.5))))
    const backRight = lot.CFrame.mul((lot.Size.mul(new Vector3(0.5, 0, 0.5))))
    return { frontLeft, backRight }
}



interface IMove {
    val:number;
    offset:number;
}

interface IMinMax {
    min:number;
    max:number;
}

export class MoveFurniture {
    private zPoints:ReturnType<typeof MoveFurniture.getMinMaxPoint>|undefined
    private xPoints:ReturnType<typeof MoveFurniture.getMinMaxPoint>|undefined
    private points:ReturnType<typeof getBorderPoints>|undefined
    private furniture:Model
    private lot:BasePart
    private camera:Camera
    private params:RaycastParams
    private begin = UIS.InputBegan.Connect( (input) => this.handleEvents(input))
    //private end = UIS.InputEnded.Connect( (input) => )

    constructor (lot:BasePart,furniture:Model,camera:Camera) {
        //setup rayParam
        const rayParams = new RaycastParams()
        rayParams.FilterType = Enum.RaycastFilterType.Blacklist
        rayParams.FilterDescendantsInstances = [furniture]
        this.params = rayParams

        //setup Camera and Furniture 
        this.camera = camera 
        this.furniture = furniture
        this.lot = lot 

        //setup Initial Clamp Values 
        this.updateXZPoints()
        this.moveLoop()
    }

     static getMinMaxPoint = (lotPoints: ReturnType<typeof getLotPoints>, axis: "X" | "Z") => {
        const p1 = lotPoints.frontLeft[axis]
        const p2 = lotPoints.backRight[axis]
        const min = math.min(p1, p2)
        const max = math.max(p1, p2)

        return { min, max }
    }

     public handleEvents = (input:InputObject) => {
         print(input.UserInputType)
        if (input.UserInputType === Enum.UserInputType.Keyboard) {
            if(input.KeyCode === Enum.KeyCode.R) this.rotatePart(this.furniture,1)
            if (input.KeyCode === Enum.KeyCode.T) this.rotatePart(this.furniture,-1)

        }
        

     }
     static calculateValue = (primaryPart:BasePart,reference:Vector3,objectPoints:ReturnType<typeof getBorderPoints>) => {
        const xVector = UnitFunctions.getClosestVector3(reference,objectPoints,"X")
        const zVector = UnitFunctions.getClosestVector3(reference,objectPoints,"Z")
        const xDistance = UnitFunctions.getEdgeDistance(xVector,primaryPart.Position,"X")
        const zDistance = UnitFunctions.getEdgeDistance(zVector,primaryPart.Position,"Z")

        const x = {val:reference.X, offset: xDistance } as IMove
        const z = {val:reference.Z, offset: zDistance } as IMove

        return {x,z}
    }

    static getClampMinMax = (first:IMove,second:IMove) => {
        let min = 0;
        let max = 0;

        if (first.val < second.val) {
            min = first.val + first.offset
            max = second.val - second.offset
        }

        else {
            min = second.val + second.offset
            max = first.val - first.offset
        }

        return {min, max}
    }

    public updateXZPoints = () => {
        this.points = getBorderPoints(this.furniture.PrimaryPart as BasePart)
        const lotPoints = getLotPoints(this.lot)
        const p1 = MoveFurniture.calculateValue(this.furniture.PrimaryPart as BasePart,lotPoints.backRight,this.points)
        const p2 = MoveFurniture.calculateValue(this.furniture.PrimaryPart as BasePart,lotPoints.frontLeft,this.points)
        this.xPoints = MoveFurniture.getClampMinMax(p1.x,p2.x)
        this.zPoints = MoveFurniture.getClampMinMax(p1.z,p2.z)
    }

    rotatePart = (object:Model,dir:1|-1) => {
        //to set rotation
        const rotation = 45 * dir
        if (object.PrimaryPart) {
            const newCFrame = object.PrimaryPart.CFrame.mul(CFrame.Angles(0,math.rad(rotation),0))
            object.SetPrimaryPartCFrame(newCFrame)

            //to update xzPoints
            this.updateXZPoints()


        }

    }

    public moveLoop = () => {
        while (true) {
            wait()
            // to Capture Ray 
            const ray = getMouseRay(UIS,this.camera)
            const cast = rayCast(this.params,ray)

            if (cast) {
                // to constrict Position
                let {X,Y,Z} = cast.Position
                const valX = this.xPoints as IMinMax
                const valZ = this.zPoints as IMinMax
                X = math.clamp(X,valX.min,valX.max)
                Z = math.clamp(Z,valZ.min,valZ.max)
                const Position = new Vector3(X,Y,Z)

                //to move object
                this.furniture.MoveTo(Position)
            }
        }
    }
    
}

export class UnitFunctions {

    public static compareAxisPoints = (p1: number, p2: number, reference: number) => {
        return math.abs(p1 - reference) < math.abs(p2 - reference)
    }
    public static getEdgeDistance = (vector:Vector3,center:Vector3,axis:"X"|"Z") => {
        return math.abs(center[axis] - vector[axis])
    }
    public static getClosestVector3 = (reference: Vector3,
        objectPoints: ReturnType<typeof getBorderPoints>, axis: "X" | "Z") => {

        return (Object.values(objectPoints) as Vector3[])
            .reduce((closest, current) => {
                return UnitFunctions.compareAxisPoints(closest[axis], current[axis], reference[axis])
                    ? closest : current
            })

    }


}
 