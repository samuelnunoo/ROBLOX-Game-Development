/// <reference types="@rbxts/testez/globals" />

import * as operations from "server/Build System/ItemRequest"
import {mockInventory, createStore, mockActiveItem, createModel, mockModels, testEnv, getItemProp, ItemEnv} from "../Mocks/DefaultStore"

const player =  { UserId: 1231231232 } as Player
const items = [{
  itemId: '1232132',
  add: true
}, {
  itemId: '4352324',
  add: true
}]
const store = mockInventory(player)(items)

export = () => {

describe('isInInventory', () => {

    it('should handle invalid itemID', () => {
      const result =  operations.isInInventory(store)(123,player)
      expect(result).to.equal(false)
    })

    it('should handle invalid player', () => {
      const result = operations.isInInventory(store)('1232132', {UserId: 3} as Player)
      expect(result).to.equal(false)
    })

    it('should return true if the item is in inventory', () => {
      const result = operations.isInInventory(store)('1232132', player)
      expect(result).to.equal(true)
    })

    it('should return false if the item is not in inventory', () => {
      const result = operations.isInInventory(store)('nope', player)
      expect(result).to.equal(false)
    })
})


describe("ModelRequest", () => {

  const {store,RS,player, model, prop}  = ItemEnv()
 

  it("Method should return Model", () =>{
    const result = operations.modelRequest(store)(RS)(player,prop.id)
    expect(result).to.equal(model)
  })


})

}