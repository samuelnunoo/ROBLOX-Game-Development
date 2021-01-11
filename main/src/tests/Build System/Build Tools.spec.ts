/// <reference types="@rbxts/testez/globals" />
import { getBorderPoints, getMouseRay } from '../../client/ReplicatedStorage/Build Mode/BuildTools/MoveFurniture';
import {a} from "@rbxts/fitumi"

const size = new Vector3(10,1,5)
const cframe = new CFrame()

export = () => {
    
    describe("getBorderPoints",() => {
        const model = new Instance("Model")
        const part = new Instance("Part")
        part.CFrame = new CFrame()
        part.Size = new Vector3(10,1,20)
        model.PrimaryPart = part 
        const result = getBorderPoints(part)

        it("has proper frontLeft",()=> {
            expect(result.frontLeft).to.equal(new Vector3(-5,0,-10))
        })

        it("has proper frontRight",() => {
            expect(result.frontRight).to.equal(new Vector3(-5,0,10))
        })

        it("has proper backLeft",() => {
            expect(result.backLeft).to.equal(new Vector3(5,0,-10))
        })

        it("has proper backRight",()=> {
            expect(result.backRight).to.equal(new Vector3(5,0,-10))
        })

    })

    describe("getMouseRay",() => {

    
        const mouseLocation = a.fake() as UserInputService
        const GetMouseLocation = () =>({X:10,Y:50})
        a.callTo(mouseLocation,GetMouseLocation)

        const camera = new Instance("Camera")
        camera.CFrame = new CFrame()

        const result = getMouseRay(mouseLocation,camera)

        it("returns a ray",() => {
            expect(result).to.be.an("Ray")
        })

    })





    
}