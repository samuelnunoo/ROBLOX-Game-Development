import Rodux, {AnyAction} from "@rbxts/rodux";
import { Option } from "@rbxts/rust-option-result";

//---- Type Information --- //
interface serverPlayerData {
    lots: {
        Business: {
            active: false | String;
        }
        Residential: {
            active: false | String;
        }
         
    }

}
type Grid =  Workspace["Lots"]["Grid"]
export interface serverStore { //@note serverStore Type
    players:  Map<string,serverPlayerData>
    lots: Map<string, false | string>
    available: {
        Business: Set<string>
        Residential: Set<string>
    }
}


// -------- Action Types --- //
interface BaseAction extends AnyAction {
    payload : {
        id: string 
    }
  
}
export interface ISetLot extends BaseAction {
    type: "setLot"
    payload: {
        id:string;
        lot:string;
        isAdd: boolean;
    }
}


// ----- Default Data  ----- //
const defaultData = ()=> { 
  
    // Resources 
   const lots =  game.Workspace.Lots.GetChildren();
   const framework = {
        players: new Map<string,serverPlayerData>(),
        lots: new Map<string, false | string>(),
        available: {
            Business: new Set<string>(),
            Residential: new Set<string>()
                    }
        }

   lots.forEach( lot => {
       //Add Lot to List
      framework.lots.set(lot.Name,false)
      
      //Add Lot to Available
      if ( (lot as Grid).LotType.Value == "Business") {
          framework.available.Business.add(lot.Name)
      }
      else if ((lot as Grid).LotType.Value == "Residiential") {
          framework.available.Residential.add(lot.Name)
      }
      
   })


   return framework

} 
 


// -- Methods -- //
//@todo write tests
export class helperMethods {

    static isValidLotID = (state:serverStore) => (lotString:string) => {
        const lot = state.lots.get(lotString)
        return lot !== undefined && lot == false;
    }
    
    static isValidPlayer = (state:serverStore) => (id:string) => {
        const player = state.players.get(id)
        return player !== undefined;
    
    }
    
    static getLotGrid = (lotString:string) => {
        return game.Workspace.Lots.FindFirstChild(lotString) as Grid
    
    }

    static isValidLot = (lot:Grid) => {
        return lot != undefined && lot.LotType.Value != "Community"
    }
    
    static playerHasLotAvailable = (state:serverStore) => (id:string,lotType:"Business"|"Residential") => {
        const player = state.players.get(id) as serverPlayerData
        return player.lots[lotType].active == false 
    }
    
    static assignLot = (state:serverStore) => (playerID:string,lotType:"Business"|"Residential",lotID:string) => {
        //Remove from Available
        (state.available[lotType] as Set<string>).delete(lotID);
    
        //Set ServerPlayerData
        (state.players.get(playerID) as serverPlayerData).lots[lotType].active = lotID;
    
        //Assign Lot
        state.lots.set(lotID,playerID);
    
    }

    static setPlayerLotOfTypeToFalse = (state:serverStore) => (lotType:"Business"|"Residential",playerID:string) => {
        const player = state.players.get(playerID) as serverPlayerData
        player.lots[lotType].active = false;
    
    }
    
    
    static makeAvailable = (state:serverStore) => (lotType:"Business"|"Residential",lotID:string) => {
        state.available[lotType].add(lotID)
    }
    

}



const claimLot = (state:serverStore) => (lot:string,id:string) => {
    const result = Option.some(lot)
    .filter(lot =>  helperMethods.isValidLotID(state)(lot))
    .filter (lot => helperMethods.isValidPlayer(state)(id))
    .map(lot => helperMethods.getLotGrid(lot))
    .filter( lot => helperMethods.isValidLot(lot))
    .map( lot => lot.LotType.Value as "Residential" | "Business")
    .filter(lotType => helperMethods.playerHasLotAvailable(state)(id,lotType))
    .map(lotType => {
        helperMethods.assignLot(state)(id,lotType,lot); 
        return true
    })



    return result;
    
    
    
 
}
const freeLot = (state:serverStore) => (lot:string,id:string) => {
    Option.some(lot)

        //Check Lot and Player Validity 
        .filter(lot => isValidLotID(state)(lot))
        .filter(lot => isValidPlayer(state)(id))

        //Get Lot Type
        .map(lot => getLotGrid(lot))
        .filter(lot => isValidLot(lot))
        .map(lot => lot.LotType.Value as "Business"|"Residential")

        //Set Player Lot of Type to False 
        .map( lotType => {
            setPlayerLotOfTypeToFalse(state)(lotType,id);
            return lotType
        })

        //Make Available
        .map( lotType => { makeAvailable(state)(lotType,lot)
        })

        //


        // 




}

//@note i don't know where to go from here
const serverReducer = Rodux.createReducer<serverStore,ISetLot>(defaultData(), {
    setLot: (state, action) => {
        const {id,isAdd,lot} = action.payload


        //Claim Lot 
        if (isAdd) {
         

            
        }
        return state
    }
})


export default serverReducer
