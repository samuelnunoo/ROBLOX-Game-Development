import Rodux, {AnyAction} from "@rbxts/rodux";
import Object from "@rbxts/object-utils"
import { Option } from "@rbxts/rust-option-result";

//---- Type Information --- //
export interface serverPlayerData {
    lots: {
        Business: {
            active: false | String;
        }
        Residential: {
            active: false | String;
        }
         
    }

}
export type Grid =  Workspace["Lots"]["Grid"]
export interface serverStore { 
    players:  Map<number,serverPlayerData>
    lots: Map<string, false | number>
    available: {
        Business: Set<string>
        Residential: Set<string>
    }
}

// -------- Action Types --- //
interface BaseAction extends AnyAction {
    payload : {
        id: number
    }
  
}
export interface ISetLot extends BaseAction {
    type: "setLot"
    payload: {
        id:number;
        lot:string;
        isAdd: boolean;
    }
}
export interface IaddPlayerAction extends BaseAction {
    type: "addPlayer"
    payload: {
        id:number;
    }
}


// ----- Default Data  ----- //
export const defaultData = ()=> { 
  
    // Resources 
   const lots =  game.Workspace.Lots.GetChildren();
   const framework = {
        players: new Map<number,serverPlayerData>(),
        lots: new Map<string, false | number>(),
        available: {
            Business: new Set<string>(),
            Residential: new Set<string>()
                    }
        }

   lots.forEach( lot => {
       //Add Lot to List
      framework.lots.set(lot.Name,false)
      
      //Add Lot to Available
      if ( (lot as Grid).LotType.Value === "Business") {
          framework.available.Business.add(lot.Name)
      }
      else if ((lot as Grid).LotType.Value === "Residential") {
          framework.available.Residential.add(lot.Name)
      }
      
   })


   return framework as serverStore

} 
export const defaultPlayerData = () => ({
    lots: {
        Business: {
            active: false 
                  },
        Residential: {
            active: false 
                    }           
            }
} as serverPlayerData)

// -- Methods -- //
export class helperMethods {

    static isValidLotID = (state:serverStore) => (lotString:string) => {
        const lot = state.lots.get(lotString)
        return lot !== undefined && lot === false;
    }
    
    static isValidPlayer = (state:serverStore) => (id:number) => {
        const player = state.players.get(id)
        return player !== undefined;
    
    }
    
    static getLotGrid = (lotString:string) => {
        return game.Workspace.Lots.FindFirstChild(lotString) as Grid
    
    }

    static isValidLot = (lot:Grid) => {
        return lot !== undefined && lot.LotType.Value !== "Community"
    }
    
    static playerHasLotAvailable = (state:serverStore) => (id:number,lotType:"Business"|"Residential") => {
        const player = state.players.get(id) as serverPlayerData
        return player.lots[lotType].active === false 
    }


    static makeUnavailable = (state:serverStore) => (lotID:string,lotType:"Business"|"Residential") => {
        (state.available[lotType] as Set<string>).delete(lotID);
    }


    static setPlayerData = (state:serverStore) => (playerID:number,lotID:string,lotType:"Business"|"Residential") => {
        (state.players.get(playerID) as serverPlayerData).lots[lotType].active = lotID;
    }
    
    static assignLot = (state:serverStore) => (playerID:number,lotType:"Business"|"Residential",lotID:string) => {
        //Remove from Available
        helperMethods.makeUnavailable(state)(lotID,lotType)
    
        //Set ServerPlayerData
        helperMethods.setPlayerData(state)(playerID,lotID,lotType)
 
        //Assign Lot
        state.lots.set(lotID,playerID);
    
    }

    static setPlayerLotOfTypeToFalse = (state:serverStore) => (lotType:"Business"|"Residential",playerID:number) => {
        const player = state.players.get(playerID) as serverPlayerData
        player.lots[lotType].active = false;
    
    }
    
    static makeAvailable = (state:serverStore) => (lotType:"Business"|"Residential",lotID:string) => {
        state.available[lotType].add(lotID)
    }
    

}
export const claimLot = (state:serverStore) => (lot:string,id:number) => {
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
    .unwrapOr(false)



    return result;
    
    
    
 
}
export const freeLot = (state:serverStore) => (lot:string,id:number) => {
    return Option.some(lot)

        //Check Lot and Player Validity 
        .filter(lot => state.lots.get(lot) !== undefined)
        .filter(lot => helperMethods.isValidPlayer(state)(id))

        //Get Lot Type
        .map(lot => helperMethods.getLotGrid(lot))
        .filter(lot => helperMethods.isValidLot(lot))
        .map(lot => lot.LotType.Value as "Business"|"Residential")

        //Set Player Lot of Type to False 
        .map( lotType => {
            helperMethods.setPlayerLotOfTypeToFalse(state)(lotType,id);
            return lotType
        })

        //Make Available
        .map( lotType => {
            state.lots.set(lot,false)
            return lotType})
        .map( lotType => { helperMethods.makeAvailable(state)(lotType,lot)
            return true
        })
        .unwrapOr(false)

   




}
const lotReducer = Rodux.createReducer<serverStore,ISetLot|IaddPlayerAction>(defaultData(), {
    setLot: (state, action) => {
        const {id,isAdd,lot} = action.payload
        const newState = Object.deepCopy(state)

        if (isAdd) claimLot(newState)(lot,id)   
        else freeLot(newState)(lot,id)
        
        return newState
    },

    addPlayer:(state,action) => {
        const {payload} = action;

        const newState = Object.deepCopy(state)
        newState.players.set(payload.id, defaultPlayerData())

        return newState

        }
        
    
})

export default lotReducer
