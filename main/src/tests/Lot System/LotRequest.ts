/// <reference types="@rbxts/testez/globals" />
//@note Test File
import {helperMethods,defaultData} from "server/Store/Reducers/serverData"
import { testEnv, createStore } from "tests/Mocks/DefaultStore"




export = () => {

    describe("isValidLotID", () => {
        const { player, RS } =  testEnv()
        const store = defaultData()

        it("is valid", () => {
            const id = "Grid 1"
            const result = helperMethods.isValidLotID(store)(id)
            expect(result).to.equal(true)
        })

  
    })
    



}





