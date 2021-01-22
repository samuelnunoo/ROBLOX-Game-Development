/// <reference types="@rbxts/testez/globals" />
import { getBorderPoints, getMouseRay, getLotPoints, MoveFurniture, UnitFunctions } from '../../client/ReplicatedStorage/Build Mode/BuildTools/MoveFurniture';

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
            expect(result.frontRight).to.equal(new Vector3(5,0,-10))
        })

        it("has proper backLeft",() => {
            expect(result.backLeft).to.equal(new Vector3(-5,0,10))
        })

        it("has proper backRight",()=> {
            expect(result.backRight).to.equal(new Vector3(5,0,10))
        })

    })

    describe("getMinMaxPoint", () => {
        const lot = new Instance("Part")
        lot.Size = new Vector3(10,1,6)
        lot.CFrame = new CFrame()
        const points = getLotPoints(lot)
        const func = MoveFurniture.getMinMaxPoint
        const resultX = func(points,"X")
        const resultZ = func(points,"Z")

        it("Returns proper min X",() => {
           expect(resultX.min).to.equal(-5)
        })

        it("Returns proper max X",() => {
            expect(resultX.max).to.equal(5)
        })

        it("Returns proper min Z",() => {
            expect(resultZ.min).to.equal(-3)
        })

        it("Returns proper max Z",() => {
            expect(resultZ.max).to.equal(3)
        })
    })

    describe("compareAxisPoints",() => {
        const p1 = 10
        const p2 = 0
        const ref = 9
        it("Can correctly identify closest", () => {
            const result = UnitFunctions.compareAxisPoints(p1,p2,ref)
            expect(result).to.equal(true)
        })

        it("Can correctly identify not closet", () => {
            const result = UnitFunctions.compareAxisPoints(p2,p1,ref)
            expect(result).to.equal(false)
        })

    })

    describe("getClosestVector3",() => {
        const part = new Instance("Part")
        part.CFrame = new CFrame().mul(CFrame.Angles(0,math.rad(45),0))
        part.Size = new Vector3(10,1,20)
        const points = getBorderPoints(part)

        it("Returns frontRight for X axis", () => {
            const v3 = new Vector3(-5,0,123)
            const result = UnitFunctions.getClosestVector3(v3,points,"X")
            expect(result).to.equal(points.frontRight)
        })

        it("Returns backLeft for Z axis", () => {
            const v3 = new Vector3(-5,0,10)
            const result = UnitFunctions.getClosestVector3(v3,points,"Z")
            expect(result).to.equal(points.backLeft)
        })

        it("Returns closest for out of Bound X axis", () => {
            const v3 = new Vector3(-513231,0,10)
            const result = UnitFunctions.getClosestVector3(v3,points,"X")
            expect(result).to.equal(points.frontLeft)
        })

        it("Returns closest for out of Bound Z axis", () => {
            const v3 = new Vector3(0,0,10123231312)
            const result = UnitFunctions.getClosestVector3(v3,points,"Z")
            expect(result).to.equal(points.backLeft)
        })

    })

    describe("getEdgeDistance",()=>{

        it("should return proper X Distance",() => {
            const v1 = new Vector3(100,0,0)
            const v2 = new Vector3(0,0,0)
            const result = UnitFunctions.getEdgeDistance(v1,v2,"X")
            expect(result).to.equal(100)
        })

        it("should return proper Z Distance",()=>{
            const v1 = new Vector3(0,0,50)
            const v2 = new Vector3(0,0,0)
            const result = UnitFunctions.getEdgeDistance(v1,v2,"Z")
            expect(result).to.equal(50)

        })
    })

    describe("calculateValue",() => {

        const part = new Instance("Part")
        part.CFrame = new CFrame()
        part.Size = new Vector3(10,1,20)
        const v3 = new Vector3(10,0,50)

        const lot = new Instance("Part")
        lot.Size = new Vector3(40,1,50)
        const points = getBorderPoints(lot)
        const func = MoveFurniture.calculateValue(part,v3,points)

        it("X.val should be 10",() => {
            expect(func.x.val).to.equal(10)
        })

        it("X.offset to equal",() => {
            expect(func.x.offset).to.equal(20)
        })

        it("Z.val should be 50", () => {
            expect(func.z.val).to.equal(50)
        })

        it("Z.offset should be",() =>{ 
            expect(func.z.offset).to.equal(25)
        })

    })

    describe("getClampMinMax",() => {
        const first = {val:10,offset:5}
        const second = {val:3, offset:2}
        const result = MoveFurniture.getClampMinMax(first,second)
   

        it("has proper min value",() => {
            expect(result.min).to.equal(5)
        })

        it("has proper max value",() => {
            expect(result.max).to.equal(5)
        })

        it('can handle equal values min',() => {
            const result = MoveFurniture.getClampMinMax(first,first)
            expect(result.min).to.equal(15)
        })

        it('can handle equal values max',() => {
            const result = MoveFurniture.getClampMinMax(first,first)
            expect(result.max).to.equal(5)

        })
    })

    describe("rotatePart",() => {
        
        it("can rotate part forward",() => {
            const obj = new Instance("Model")
            obj.PrimaryPart = new Instance("Part")
            print(obj.PrimaryPart)
            MoveFurniture.rotatePart(obj,1)
            const cframe = new CFrame().mul(CFrame.Angles(0,math.rad(45),0))
            expect(obj.GetPrimaryPartCFrame()).to.equal(cframe)

        })

        it("can rotate part backwards",() => {
            const obj = new Instance("Model")
            obj.PrimaryPart = new Instance("Part")

            MoveFurniture.rotatePart(obj,-1)
            const cframe = new CFrame().mul(CFrame.Angles(0,math.rad(-45),0))
            expect(obj.GetPrimaryPartCFrame()).to.equal(cframe)

        })

     

    })

    describe("updateXZPoints",() => {
        const furniture = new Instance("Model")
        const part = new Instance("Part")
        furniture.PrimaryPart = part;
        const lot = new Instance("Part")
        lot.Size = new Vector3(10,1,20)

        const instance = MoveFurniture.updateXZPoints(furniture,lot)
        it("should have proper xMin",() => {
            expect(instance.xPoints.min).to.equal(-3)
        })

        it("should have proper xMax",() => {
            expect(instance.xPoints.max).to.equal(3)
        })

        it("should have proper zMin",() => {
            expect(instance.zPoints.min).to.equal(-9)
        })

        it("should have proper zMax",() => {
            expect(instance.zPoints.max).to.equal(9)
        })

    })



    
}