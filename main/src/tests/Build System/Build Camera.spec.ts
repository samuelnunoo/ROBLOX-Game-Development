import { initCamera, panCamera, transformLookVector, boundary } from '../../client/ReplicatedStorage/Build Mode/BuildCamera';
/// <reference types="@rbxts/testez/globals" />


const part = new Instance("Part")
part.CFrame = new CFrame(0,0,0)

export = () => {


    describe("initCamera",()=> {
        

        const result = initCamera(part);

        it("can set to lot", () => {
            expect(result.CameraSubject).to.equal(part)
        })

        it("can offset height",()=>{
            expect(result.CFrame).to.equal(new CFrame(0,30,0))
        })


        it("Is scriptable",() => {
            expect(result.CameraType).to.equal(Enum.CameraType.Scriptable)
        })


        
    })



    describe("rotateCamera",() => {
        
    })

    describe("boundary", () => {
        const part = new Instance("Part")
        const part2 = new Instance("Part")
        part.Size = new Vector3(10,0,6)
        part.CFrame = new CFrame()


        const result = boundary(part)
        it ("should have proper minX",() => {
    
         expect(result.minX).to.equal(-5)
        })

        it("should have proper maxX",() =>{
            expect(result.maxX).to.equal(5)
        })

        it("should have proper minZ",()=>{
            expect(result.minZ).to.equal(-3)
        })

        it("should have proper MaxZ",() => {
            expect(result.maxZ).to.equal(3)
        })
    })

}