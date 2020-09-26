import * as operations from "../../client/ReplicatedStorage/BuildSystem/instantiate"
import { testEnv, createModel, mockModels, mockActiveItem } from "tests/Mocks/DefaultStore"


export = () => {
    describe("getActiveItem", () => {

        const {RS, player} = testEnv()
        const model =  createModel("Test")
        mockModels(RS)([model])
       const store = mockActiveItem(player)({itemId:"Test",add:true})


       it("can return active Item ", () => {
    
       })



    })

    describe("createRayParam", () => {
        const ignore = new Instance("Part")

        const result = operations.createRayParam([ignore])

        it("should ignore water ", () =>{
            expect(result.IgnoreWater).to.equal(true)
        })

        it('should ignore whitelist', () =>{
            expect(result.FilterDescendantsInstances[0]).to.equal(ignore)
        })

        it('FilterType should be Whitelist', () => {
            expect(result.FilterType.Name).to.equal("Whitelist")
        })
    })

    describe("getRay", () => {
        const GetMouseLocation = () => ({ X: 0, Y: 2})
        const UIS =  { GetMouseLocation} as UserInputService
        const params = operations.createRayParam([])
        const camera = new Instance("Camera")

        const result = operations.getRay(UIS)(params)(camera)

        it("should work",() => {
            expect(result!.Position).to.equal(new Vector3(0,0,0))
        })

    })
}

