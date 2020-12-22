/// <reference types="@rbxts/testez/globals" />
//@note Test File
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums"
import serverRequest from "client/ReplicatedStorage/ServerGateway/serverRequest"
import { addPlayerAction } from "server/Store/Actions/playerAction"
import { setLotAction } from "client/ReplicatedStorage/ClientState/Actions/serverAction"
import playerData from "server/Store/Reducers/playerData"
import { testEnv, createStore } from "tests/Mocks/DefaultStore"
import {serverStore,helperMethods,defaultData, defaultPlayerData,claimLot,freeLot} from "client/ReplicatedStorage/ClientState/Reducers/serverData"


const { player, RS } =  testEnv()
type Grid =  Workspace["Lots"]["Grid"]
const id = player.UserId
const store1: () => serverStore  = () => {
    const data1 = defaultData()
    const data2 = defaultPlayerData()
    data1.players.set(id,data2)
    return data1
} 

export = () => {

    describe("Client Server Request", () => {
        it("Can set stuff", () => {
            
        })
    })

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
  
    
     
        it("Should make Lot Unavailable", () => {
            const store = store1()
            const result = claimLot(store)("Grid1",id)
            expect(store.available.Business.has("Grid1")).to.equal(false)
        })
        //Rejects invalid Lot ID
        it("Rejects invalid LotID", () => {
            const store = store1()
            const result = claimLot(store)("Fake",id)
            expect(result).to.equal(false)
        })
        //Rejects invalid PlayerID
        it("Rejects invalid PlayerID", () => {
            const store = store1()
            const result = claimLot(store)("Grid1",0)
            expect(result).to.equal(false)
        })
   
        //Lot is Assigned Properly
        it("Lot is Assigned Properly", () => {
            const store = store1()
            const result = claimLot(store)("Grid1",id)
            expect(result).to.equal(true)
        })
        
        //Rejects Player with Not Lot Availble
        it("Rejecsts Player with No Lot Available", () => {
            const data = defaultPlayerData();
            data.lots.Business.active = "Grid1"
            const store = store1()
            store.players.set(id,data)
            const result = claimLot(store)("Grid1",id)

            expect(result).to.equal(false)
    })


    })

    describe("freeLot", () => {
        //Lot Should be Populated
     
        it("Active should be Grid1", () => {
            const store = store1()
            claimLot(store)("Grid1",id)
            expect(store.players.get(id)?.lots.Business.active).to.equal("Grid1")
        })

        it("Lot Should be Unavailable", () => {
            const store = store1()
            claimLot(store)("Grid1",id)
            expect(store.available.Business.has("Grid1")).to.equal(false)
        })
        it("Lot should be claimed by player", () => {
            const store = store1()
            claimLot(store)("Grid1",id)
            expect(store.lots.get("Grid1")).to.equal(id)
        })

        it("Obtains a valid Lot Grid", () => {
            const result = helperMethods.getLotGrid("Grid1")
            expect(result).never.equal(undefined)
        })
        it("Player should be valid", () => {
            const store = store1()
            claimLot(store)("Grid1",id)
            const result = helperMethods.isValidPlayer(store)(id)
            expect(result).to.equal(true)
        })

        // now run data 
        const store = store1()
        claimLot(store)("Grid1",id)
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

    describe("setLot Add", () => {
        const store = createStore(player)
        const action = setLotAction(id,"Grid1",true)
        store.dispatch(action)
        const serverData = store.getState().serverData
        
     
        it("Player should have lot claimed", () => {
            expect(serverData.players.get(id)?.lots.Business.active).to.equal("Grid1")
        })

        it("Lot", () => {
            expect(serverData.lots.get("Grid1")).to.equal(id)
        })


        it("Available", () => {
            expect(serverData.available.Business.has("Grid1")).to.equal(false)
        })


    })

    describe("SetLot Remove",() => {
        const store = createStore(player)
        const action = setLotAction(id,"Grid1",true)
        store.dispatch(action)
        const action2 = setLotAction(id,"Grid1",false)
        store.dispatch(action2)
        const serverData = store.getState().serverData

        it("Player should not have lot claimed",() => {
            expect(serverData.players.get(id)?.lots.Business.active).to.equal(false)
        })


        it("Lot should equal false", () => {
            expect(serverData.lots.get("Grid1")).to.equal(false)
        })


        it("Lot should be available", () => {
            expect(serverData.available.Business.has("Grid1")).to.equal(true)
        })


    })
}





