/// <reference types="@rbxts/testez/globals" />
import * as placement from "../../client/ReplicatedStorage/BuildSystem/placementOperations"


export = () => {
    describe("Boundaries", () => {
        
        const part = new Instance("Part")
        part.Size = new Vector3(20,400,30)
        part.Position = new Vector3(200,0,300)
        const result = placement.boundary(part)

        it('left should equal 190 ', () => {
            expect(result.left).to.equal(190)
        })

        it('right should equal 210', () =>{
            expect(result.right).to.equal(210)
        })

        it('top should equal 315', () =>{
            expect(result.top).to.equal(315)
        })

        it('bottom should equal 285', () => {
            expect(result.bottom).to.equal(285)
        })
    })

    describe("Offset", () => {
        const lot = new Instance("Part")
        lot.Size = new Vector3(150,5,200)
        lot.Position = new Vector3(40,0,30)

        const left = -35 
        const right = 115
        const top = 130
        const bottom = -70
   
        const object = new Instance("Part")
        object.Size = new Vector3(10,15,20)
        
        it("Top Left", () => {
            object.Position = new Vector3(left + 5,0,top - 10)
            const result = placement.offset(lot)(object)
            
            expect(result).to.equal(new Vector3(70,0,-90))
        })

        it("Top Left Out", () => {
            object.Position = new Vector3(left + 4, 0, top - 10)
            const result = placement.offset(lot)(object)
            expect(result).to.equal(new Vector3(0,0,0))
        })

        it("Top Right", () => {
            object.Position = new Vector3(right - 5,0,top - 10)
            const result = placement.offset(lot)(object)

            expect(result).to.equal(new Vector3(-70,0,-90))

        })

        it("Top Right Out", () => {
            object.Position = new Vector3(right - 4, 0, top - 10)
            const result = placement.offset(lot)(object)

            expect(result).to.equal(new Vector3(0,0,0))
        })

        it("Bottom Left", () => {
            object.Position = new Vector3(left + 5, 0, bottom + 10)
            const result = placement.offset(lot)(object)

            expect(result).to.equal(new Vector3(70,0,90))
        })

        it("Bottom Left Out", ()=> {
            object.Position = new Vector3(left + 5,0,bottom + 9)
            const result = placement.offset(lot)(object)
            
            expect(result).to.equal(new Vector3(0,0,0))
        })

        it("Bottom Right", () => {
            object.Position = new Vector3(right -5, 0, bottom + 10)
            const result = placement.offset(lot)(object)

            expect(result).to.equal(new Vector3(-70,0,90))
        })

        it("Check Top Out", () => {
            object.Position = new Vector3(right -5 , 0, top - 9)
            const result = placement.offset(lot)(object)

            expect(result).to.equal(new Vector3(0,0,0))
        })
    })

    describe("Rotation", () => {
        const part = new Instance("Part")
        part.Size = new Vector3(10,10,10)
        part.Position = new Vector3(0,0,0)
      

        it("Orientation is Default", () => {
        part.Orientation = new Vector3(0,0,0)
        expect(part.Orientation).to.equal(new Vector3(0,0,0))
        })

        it("Rotate Left", () => {
            part.Orientation = placement.rotate(part,1)

            expect(part.Orientation).to.equal(new Vector3(0,5,0))
        })

        it("Rotate Left Twice", () => {
            part.Orientation = new Vector3(0,0,0)
            part.Orientation = placement.rotate(part,1)
            part.Orientation = placement.rotate(part,1)
            
            expect(part.Orientation).to.equal(new Vector3(0,10,0))
        })

        it("Rotate Right", () => {
            part.Orientation = new Vector3(0,0,0)
            part.Orientation = placement.rotate(part,-1)

            expect(part.Orientation).to.equal(new Vector3(0,-5,0))
        })

        it("Rotate Right Twice ", () => {
            part.Orientation = new Vector3(0,0,0)
            part.Orientation = placement.rotate(part,-1)
            part.Orientation = placement.rotate(part,-1)

            expect(part.Orientation).to.equal(new Vector3(0,-10,0))
        })

    })
    
}