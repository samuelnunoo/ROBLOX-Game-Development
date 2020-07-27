import { LotGui } from "client/ReplicatedStorage/UI/LotUIController";
const cs = game.GetService("CollectionService");
const lots = cs.GetTagged("LotUI") as Array<LotGui>



for (const [k,v] of lots.entries()) {



}


function addListeners(gui:LotGui) {
    gui.Frame.Left.MouseButton1Click.Connect( () => main(1)  )
    gui.Frame.Right.MouseButton1Click.Connect( () => main(-1) )
    gui.Frame.Select Mou

}

function main() {}
function availableLots(){
    return 

}

export {}
