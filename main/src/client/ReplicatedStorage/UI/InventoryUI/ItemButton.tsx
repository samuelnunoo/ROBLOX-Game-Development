import Roact from "@rbxts/roact"
import { InventoryStuff } from "server/CSMiddleware/InventoryDataRequest"


export interface  ItemUIProp {
    itemID:string;
    camera:Camera;
    callback: (arg:string) => void;

}

export default function ItemButton(props:InventoryStuff) {
    const camera = new Instance("Camera");
    const {model,rarity} = props

    const bounds = model.GetBoundingBox();

    return 
        <viewportframe
        CurrentCamera = {camera}
        >
            {
                
            }
        </viewportframe>
   
    
      
}








