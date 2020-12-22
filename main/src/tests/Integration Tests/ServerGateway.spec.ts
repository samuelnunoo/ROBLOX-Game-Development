/// <reference types="@rbxts/testez/globals" />

import ClientEvents from "client/ReplicatedStorage/ServerGateway/ClientEvents"
import dispatchRequest from "client/ReplicatedStorage/ServerGateway/dispatchRequest"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums"
import { processRequest, filterRequest } from "server/ServerGateway/Main"
import { lotAction } from "server/Store/Actions/playerAction"
import { testEnv } from "tests/Mocks/DefaultStore"
const {player} = testEnv()

export = () => {


    describe("filterRequest", () => {
        it("can reject invalid method",() => {
            const result = filterRequest(undefined)
            expect(result).to.equal(false)
        })
        it("can accept valid method",() => {
            const result = filterRequest( () => "Ok")
            expect(result).to.equal(true)
        })
    })


    describe("processRequest", () => {
        it("Can reject false Request_ID", () => {
         
       const result = processRequest(player,"Fake",{})
       expect(result).to.equal(false)
        })

        it("Can accept a valid request", () => {
            const result = processRequest(player,Request_ID.Lot_Request,{isAdd:true,lot:"Grid1"})
            expect(result).to.equal(true)
        })
    })

    describe("dispatchRequest",()=> {
        it("Can locate methods properly", () => {
            expect(ClientEvents[Request_ID.Update_Store]).to.be.a("function")
        })

       

    })
}