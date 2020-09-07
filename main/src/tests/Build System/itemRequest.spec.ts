/// <reference types="@rbxts/testez/globals" />

import * as operations from "server/Build System/ItemRequest"
import {mockInventory} from "../Mocks/DefaultStore"

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

describe('ItemRequest', () => {
  const activeItem = '1232132'

  it('should not set if item not in inventory', () => {

      operations.ItemRequest(store)('nope',player)

      const result = store.getState().playerData.get(player.UserId)!.activeItem
      expect(result).to.equal(false)
  })

  it('isInInventory should return true', () => {
    const result = operations.isInInventory(store)(activeItem,player)
    expect(result).to.equal(true)
  })

  it('should set the activeItem', () => {

     operations.ItemRequest(store)(activeItem, player)
     const result = store.getState().playerData.get(player.UserId)
     print(result)
     expect(result!.activeItem).to.equal(activeItem)
  })

  


})

}


