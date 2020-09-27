/// <reference types="@rbxts/testez/globals" />

import * as operations from "server/CSMiddleware/InventoryDataRequest"
import { ItemEnv } from "tests/Mocks/DefaultStore"
const {RS, model, store, prop, player} = ItemEnv()

export = () => {

describe('getItemData', () => {

  it("should return the data", () => {
    const result = operations.getItemData(store)(prop.id)
      expect(result).to.never.equal(undefined)
  })
})


describe('getInventoryData', () => {
    const result = operations.getInventoryData(store)(player)

    it('should return valid array', () => {
      expect(result[0]).to.equal(prop)
    })

})


}