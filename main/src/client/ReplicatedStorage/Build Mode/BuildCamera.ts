import { Option, Result } from '@rbxts/rust-option-result';
import { RunService, TweenService, UserInputService, Workspace } from '@rbxts/services';
import { handleRequest } from '../../../server/CSMiddleware/setActiveRequest';

const UIS = UserInputService;

function cameraTranslation(camera: Camera, lookVector: Vector3, studs: number): CFrame {
    return camera.CFrame.add(lookVector.mul(studs));
}
export const initCamera = (target:BasePart) => {

    const camera = Workspace.CurrentCamera as Camera;
    camera.CameraSubject = target;
    camera.CFrame = target.CFrame.add(new Vector3(0,30,0))
    camera.CameraType = Enum.CameraType.Scriptable
    return camera;

}
export const getBoundedCFrame = (bound:ReturnType<typeof boundary>, camera:Camera,translation:CFrame) => {
    const rotation = translation.sub(translation.Position)

    const x = math.clamp(translation.X,bound.minX,bound.maxX)
    const y = math.clamp(translation.Y,5,100)
    const z = math.clamp(translation.Z,bound.minZ,bound.maxZ)
    return rotation.add(new Vector3(x,y,z))
  

}
export const panCamera = (camera:Camera,dir:Enum.KeyCode,bounds:ReturnType<typeof boundary>) => {
    const lookVector = camera.CFrame.LookVector;
    const transform = transformLookVector(camera);
    const studs = 1;

    if (dir === Enum.KeyCode.W) {
        const translation = cameraTranslation(camera, lookVector, studs)
       camera.CFrame = getBoundedCFrame(bounds,camera,translation)
    }

    else if (dir === Enum.KeyCode.S) {
        const translation = cameraTranslation(camera,lookVector, -studs)
       camera.CFrame =  getBoundedCFrame(bounds,camera,translation)
    }

    else if (dir === Enum.KeyCode.A) {
        const translation = cameraTranslation(camera,transform,-studs);
        camera.CFrame = getBoundedCFrame(bounds,camera,translation)
    }

    else if (dir === Enum.KeyCode.D) {
        const translation = cameraTranslation(camera,transform,studs)
        camera.CFrame = getBoundedCFrame(bounds,camera,translation)
    }

}
export const updateCamera = (camera:Camera,value:number) => {
    let rotationAngle = new Instance("NumberValue")
    rotationAngle.Value = value
    const cameraOffset = new Vector3(0,10,12);
    const rotationTime = 500;
    const rotationRepeatCount = -1;
    const rotationDegress = 360;

    let rotatedCFrame = CFrame.Angles(0,math.rad(rotationAngle.Value),0)
    rotatedCFrame = new CFrame(camera.CFrame.Position).mul(rotatedCFrame)
    camera.CFrame = rotatedCFrame
   
    const tweenInfo = new TweenInfo(rotationTime,Enum.EasingStyle.Linear,
        Enum.EasingDirection.InOut,rotationRepeatCount)

    const tween = TweenService.Create(rotationAngle,tweenInfo,{Value:rotationDegress})
    tween.Play()
  

}
export const rotateCamera = (camera:Camera,delta:Vector2) => {
 
    //to set rotation direction
   //const Y = math.abs(delta.Y) > math.abs(delta.X) ? delta.Y : 0
   //const X = math.abs(delta.X) > math.abs(delta.Y) ? delta.X : 0
   const y = math.abs(delta.Y) > 1 ? delta.Y : 0
   const x = math.abs(delta.X) > 1 ? delta.X : 0
   const info = new TweenInfo(0,Enum.EasingStyle.Sine,Enum.EasingDirection.In,0,false,0)

    //to get interpolated angles 
    //Keep in mind YXZ is different from XYZ
    let [Pitch,Head,_] = camera.CFrame.mul(CFrame.fromEulerAnglesYXZ(y*-1/50,x*-1/50,0))
        .ToEulerAnglesYXZ()

    //to set the CFrame 
    Pitch = math.clamp(Pitch,-20,20)
    const cframe = CFrame.fromEulerAnglesYXZ(Pitch,Head,0).add(camera.CFrame.Position)
    TweenService.Create(camera,info,{CFrame:cframe}).Play()
 

}
export const zoomCamera = (camera:Camera,dir:number,bounds:ReturnType<typeof boundary>) => {

    const studs = 50 * dir
    const info = new TweenInfo(0.25,Enum.EasingStyle.Linear,Enum.EasingDirection.In,0,false,0)
    const lookVector = camera.CFrame.LookVector
    const cframe = camera.CFrame.add(lookVector.mul(studs))
    const newCframe = getBoundedCFrame(bounds,camera,cframe)

    TweenService.Create(camera,info,{CFrame:newCframe}).Play()

}
export const boundary = (lot:BasePart) => {
    const left = lot.Size.mul(new Vector3(-0.5,0,-0.5));
    const topLeft = lot.CFrame.mul(left)
    const right = lot.Size.mul(new Vector3(0.5,0,0.5))
    const bottomRight = lot.CFrame.mul(right)

    const minX = topLeft.X > bottomRight.X ? bottomRight.X : topLeft.X
    const minZ = topLeft.Z > bottomRight.Z ? bottomRight.Z : topLeft.Z

    const maxX = topLeft.X > bottomRight.X ? topLeft.X : bottomRight.X
    const maxZ = topLeft.Z > bottomRight.Z ? topLeft.Z : bottomRight.Z

    return { minX, maxX, minZ, maxZ}


}
export const transformLookVector = (camera:Camera) => {
    return camera.CFrame.RightVector;
}
export class CameraEvent {
    private camera:Camera;
    private began = UIS.InputBegan.Connect((v) => this.handleEvent(v))
    private ended = UIS.InputEnded.Connect((v) => this.handleEvent(v))
    private changed = UIS.InputChanged.Connect((v) => this.handleEvent(v))
    private isRunningX = false;
    private isRunningZ = false;
    private isRunningRotate = false;
    private rotation = 0;
    private isDown = false;
    private target:BasePart;
    private bounds:ReturnType<typeof boundary>;

    constructor(target:BasePart) {
        this.camera = initCamera(target)
        this.target = target;
        this.bounds = boundary(this.target)
    

    }

    public isX (key:Enum.KeyCode) {
        return key === Enum.KeyCode.D ||
        key === Enum.KeyCode.A
    }

    public isZ (key:Enum.KeyCode) {
        return key === Enum.KeyCode.W ||
        key === Enum.KeyCode.S
    }

    public isRotate (key:Enum.KeyCode) {
        return key === Enum.KeyCode.Q ||
        key === Enum.KeyCode.E
    }

    public handleEvent(input:InputObject) {

        if (input.UserInputType === Enum.UserInputType.Keyboard) {

            if (this.isX(input.KeyCode)) {
                this.isRunningX = input.UserInputState.Value !== 2
            }

            else if (this.isZ(input.KeyCode)) {
                this.isRunningZ = input.UserInputState.Value !== 2
            }

            else if (this.isRotate(input.KeyCode)) {
                this.isRunningRotate = input.UserInputState.Value !== 2;
            }
         
            if (input.UserInputState.Value === 0 ) {
                if (this.isRotate(input.KeyCode)) this.rotateLoop(input.KeyCode) 
                else this.panLoop(input.KeyCode)
            }
        }

        if (input.UserInputType === Enum.UserInputType.MouseWheel) {
            zoomCamera(this.camera,input.Position.Z,this.bounds)
        }

        if (input.UserInputType === Enum.UserInputType.MouseButton2) {
            if (input.UserInputState === Enum.UserInputState.Begin){
                this.isDown = true;
            }

            if (input.UserInputState === Enum.UserInputState.End) {
                this.isDown = false;
            }

            if (this.isDown) this.somethingLoop()


        }
    


    }

    public panLoop (key:Enum.KeyCode){
        if (this.isX(key)) {
            while (this.isRunningX) {
                wait(0.025)
                panCamera(this.camera,key,this.bounds)
            }
        }

        else {
            while (this.isRunningZ) {
                wait(0.025)
                panCamera(this.camera,key,this.bounds)
            }
        }

    }

    public rotateLoop (key:Enum.KeyCode) {

        while(this.isRunningRotate) {
            if (key === Enum.KeyCode.Q) this.rotation++;
            else this.rotation-- 
            wait(0.0005)
            updateCamera(this.camera,this.rotation)
        }

    }

    public somethingLoop () {

        while (this.isDown) {
            wait()
            UIS.MouseBehavior = Enum.MouseBehavior.LockCenter
            rotateCamera(this.camera,UIS.GetMouseDelta())
        }

        UIS.MouseBehavior = Enum.MouseBehavior.Default

    }



}

