import { setActiveItem } from "server/Store/Actions/playerAction"

export const handleRequest = (payload:Player,itemID:unknown) => {

    if (typeOf(itemID) === "string") {
         setActiveItem(payload,itemID as string)
    }
 }
 //@todo depreciate this