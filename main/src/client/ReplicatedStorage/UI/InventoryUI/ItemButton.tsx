import Roact from "@rbxts/roact"
import { InventoryStuff } from "server/CSMiddleware/InventoryDataRequest"


export interface  ItemUIProp {
    itemID:string;
    camera:Camera;
    callback: (arg:string) => void;

}

//@todo make updates here 
export default function ItemButton(props:InventoryStuff) {
    const camera = new Instance("Camera");


    return 
        <viewportframe
        CurrentCamera = {camera}
        >
            {
                
            }
        </viewportframe>
   
    
      
}








