import LotUIController, { LotGui } from "./LotUIController";

const cs: CollectionService = game.GetService("CollectionService")
const lotUI = cs.GetTagged("LotUI") as Array<LotGui>

for (const [i, item] of lotUI.entries()) {
    new LotUIController(item)
}




