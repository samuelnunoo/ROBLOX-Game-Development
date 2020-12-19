/// <reference types="@rbxts/testez/globals" />
//@note Test File
import { addPlayerAction } from "server/Store/Actions/playerAction"
import playerData from "server/Store/Reducers/playerData"
import {helperMethods,defaultData, defaultPlayerData,claimLot,freeLot} from "server/Store/Reducers/serverData"
import { testEnv, createStore } from "tests/Mocks/DefaultStore"



const { player, RS } =  testEnv()
type Grid =  Workspace["Lots"]["Grid"]
const id = player.UserId
export = () => {

    describe("isValidLotID", () => {
    
        const store = defaultData()
        const grid = "Grid1"

        it("default value returns true", () => {
          
            const result = helperMethods.isValidLotID(store)(grid)
            expect(result).to.equal(true)
        })

        it("occupied state returns false", () => {
            store.lots.set(grid,0);
            const result = helperMethods.isValidLotID(store)(grid)
            expect(result).to.equal(false)
        })

        it("invalid lotID returns false",() => {
            const result = helperMethods.isValidLotID(store)("12345")
            expect(result).to.equal(false)

        })
  
    })
    
    describe("isValidPlayer", () => {

        const store = defaultData()
        store.players.set(id, defaultPlayerData())

        it("Should be true", () => {
            const result = helperMethods.isValidPlayer(store)(id)
            expect(result).to.equal(true)
        })

        it("Should be false", () => {
            const result = helperMethods.isValidPlayer(store)(0)
            expect(result).to.equal(false)
        })
    })

    describe("getLotGrid",() => {
        it("Should return a lot", () => {
            const result = helperMethods.getLotGrid("Grid1")
            expect(result).to.be.an("userdata")
        })

        it("Should return undefined", () => {
            const result = helperMethods.getLotGrid("Fake")
            expect(result).to.equal(undefined)
        })
    })

    describe("isValidLot",()=> {
        const lot = game.Workspace.Lots.FindFirstChild("Grid1")  as Grid

        it("Should return true",() => {
            const result = helperMethods.isValidLot(lot)
            expect(result).to.equal(true)
        })

        it("Should return false for community", () => {
            const lot2 = game.Workspace.Lots.FindFirstChild("Grid2") as Grid
            const result = helperMethods.isValidLot(lot2)
            expect(result).to.equal(false)
        })

        it("Should return false for invalid", () => {
            const lo3 = game.Workspace.Lots.FindFirstChild("Fake") as Grid
            const result = helperMethods.isValidLot(lo3)
            expect(result).to.equal(false)
        })
    })

    describe("playerHasLotAvailable",()=> {
      
        it("Should return true for available",() => {
            const store = defaultData();
            store.players.set(id,defaultPlayerData())
            const result = helperMethods.playerHasLotAvailable(store)(id,"Business")
            expect(result).to.equal(true)

        })

        it("Should return false for unavailable", () => {
            const store = defaultData()
            const data = defaultPlayerData()
            data.lots.Business.active = "Grid1"

            store.players.set(id,data)
            const result = helperMethods.playerHasLotAvailable(store)(id,"Business")
            expect(result).to.equal(false)


        })

    

    })


    describe("makeUnavailable", () => {
        const store = defaultData()

        it("Should contain Grid1 by Default", () => {
            expect(store.available.Business.has("Grid1")).to.equal(true)
        })
        
        it("Should remove Grid1", () => {
            const result = helperMethods.makeUnavailable(store)("Grid1","Business")
            expect(store.available.Business.has("Grid1")).to.equal(false)
        })
    })

    describe("setPlayerData", () => {
        const store = defaultData();
        store.players.set(id,defaultPlayerData())

        it("PlayerData should be default for Business",()=>{
            expect(store.players.get(id)?.lots.Business.active).to.equal(false)
  
        })

        it("PlayerData should be default for Residential",()=>{

            expect(store.players.get(id)?.lots.Residential.active).to.equal(false)
        })


        it("Playerdata should now equal Grid1", () => {
            const result = helperMethods.setPlayerData(store)(id,"Grid1","Business")
            expect(store.players.get(id)?.lots.Business.active).to.equal("Grid1")
        })
    })

    describe("assignLot", () => {
        const store = defaultData();
        store.players.set(id, defaultPlayerData())
        const lotID = "Grid1"

        it("Should be Default", () => {
            expect(store.lots.get(lotID)).to.equal(false)
        })

        it("Should be occupied by playerID", () => {
            const result = helperMethods.assignLot(store)(id,"Business",lotID)
            expect(store.lots.get(lotID)).to.equal(id)

        })

    })

    describe("setPlayerLotOfTypeToFalse", () => {
        const store = defaultData()
        const data = defaultPlayerData()
        data.lots.Business.active = "Grid1"
        store.players.set(id,data)

        it("Should be Occupied", () => {
            expect(store.players.get(id)?.lots.Business.active).to.equal("Grid1")

        })

        it("Should now be false",()=> {
                const result = helperMethods.setPlayerLotOfTypeToFalse(store)("Business",id)
                expect(store.players.get(id)?.lots.Business.active).to.equal(false)
        })

        

    })

    describe("makeAvailable", () => {
        const store = defaultData()
        helperMethods.makeUnavailable(store)("Grid1","Business")

        it("Should be unavailable", () => {
            expect(store.available.Business.has("Grid1")).to.equal(false)
        })

        it("Should now be available", () => {
            const result = helperMethods.makeAvailable(store)("Business","Grid1")
            expect(store.available.Business.has("Grid1")).to.equal(true)
        })
    })

    describe("claimLot",() => {
        const store = defaultData()
        const data = defaultPlayerData()
        store.players.set(id,data)
     
        it("Should make Lot Unavailable", () => {
            const result = claimLot(store)("Grid1",id)
            expect(store.available.Business.has("Grid1")).to.equal(false)
        })
        //Rejects invalid Lot ID
        it("Rejects invalid LotID", () => {
            const result = claimLot(store)("Fake",id)
            expect(result).to.equal(false)
        })
        //Rejects invalid PlayerID
        it("Rejects invalid PlayerID", () => {
            const result = claimLot(store)("Grid1",0)
            expect(result).to.equal(false)
        })
   
        //Lot is Assigned Properly
        it("Lot is Assigned Properly", () => {
            const result = claimLot(store)("Grid1",id)
            expect(result).to.equal(true)
        })
        
        //Rejects Player with Not Lot Availble
        it("Rejecsts Player with No Lot Available", () => {
            data.lots.Business.active = "Grid1"
            store.players.set(id,data)
            const result = claimLot(store)("Grid1",id)

            expect(result).to.equal(false)
    })


    })

    describe("freeLot", () => {
        //Lot Should be Populated
        const store = defaultData()
        const data = defaultPlayerData()
        store.players.set(id,data)
        claimLot(store)("Grid1",id)

        it("Active should be Grid1", () => {
            expect(store.players.get(id)?.lots.Business.active).to.equal("Grid1")
        })

        it("Lot Should be Unavailable", () => {
            expect(store.available.Business.has("Grid1")).to.equal(false)
        })
        it("Lot should be claimed by player", () => {
            expect(store.lots.get("Grid1")).to.equal(id)
        })

        it("Obtains a valid Lot Grid", () => {
            const result = helperMethods.getLotGrid("Grid1")
            expect(result).never.equal(undefined)
        })
        it("Player should be valid", () => {
            const result = helperMethods.isValidPlayer(store)(id)
            expect(result).to.equal(true)
        })

        // now run data 
        const result = freeLot(store)("Grid1",id)

        it("Should Complete", () => {
            expect(result).to.equal(true)
        })

        it("Active should be false", () => {
            expect(store.players.get(id)?.lots.Business.active).to.equal(false)
        })

        it("Lot Should be Available", () => {
            expect(store.available.Business.has("Grid1")).to.equal(true)
        })

        it("Lot Should Not be Claimed by Player", () => {
            expect(store.lots.get("Grid1")).to.equal(false)
        })



    })
}





