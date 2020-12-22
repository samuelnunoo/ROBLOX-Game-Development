import Roact from "@rbxts/roact";
import roactRedux from "@rbxts/roact-rodux";
import LotButton from "client/ReplicatedStorage/UI/LotUI/LotButton";
import serverRequest from "client/ReplicatedStorage/ServerGateway/serverRequest"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";


//interface MyComponentState extends Props {
  //currentLot: Instance | undefined 
  //index: number;
//}
/** 
interface Props {
  test: number;
  example: (...args: any[]) => Instance;
  lots: Instance[];
  isTaken?: Lots;
}

const defaults = {
  test: 5,
  example: (state: MyComponentState) => state.lots[state.index],
  lots: [],
} as Props;

class LotUI extends Roact.Component<Props, MyComponentState> {
  private running: boolean = false;

  constructor() {
    super(defaults);

    this.setState({
      ...defaults,
      index: 0,
      lots: this.props.lots,
      currentLot: this.props.lots[0]
    } as MyComponentState);

    if (this.state.isTaken) {
      print(this.state.isTaken.get(this.state.example(this.state)));
    }
  }

  public render(): Roact.Element {

    return (
      <screengui>
        <frame
            Size = {new UDim2(0,591,0,340)}
            Position = {new UDim2(0,341,0,238)}
            BackgroundTransparency = { 1 }
        >

          <LotButton
          callback = { (key: string) => this.setIndex(key) }
          position = { new UDim2(0,34,0,100)}
          text = { "Left" } />

           <LotButton
          callback = { (key:string) => this.setIndex(key) }
          position = { new UDim2(0,751,0,100)}
          text = { "Right" } />

           <LotButton
          callback = { () => this.requestLot() }
          position = { new UDim2(0,391,0,100)}
          text = { "Choose" } />

        
        </frame>
      </screengui>
    );
  }

  public didUpdate() {
    if (this.props.lots !==  this.state.lots) {
      this.setState({
        lots: this.props.lots
      })
    }
 
  }
  private setIndex(key:string): void {
    const direction = key === "Left" ? 1 : -1
    const index = this.state.index
    const lot = this.state.lots
    let newIndex = index + direction

    if (newIndex >= lot.size()) newIndex = 0
    if (newIndex < 0) newIndex = lot.size() - 1


    this.setState({
      index: newIndex,
      currentLot: lot[newIndex]
    })

    this.setCamera()



  }

  private requestLot() {
    const currentLot = this.state.currentLot
    serverRequest(Request_ID.Lot_Request,{currentLot})

  }

  private setCamera() {
    const camera = game.Workspace.CurrentCamera as Camera
    const current = this.state.currentLot

    camera.CameraSubject = current as BasePart
  }
}

function getLots(lots: Lots): Instance[] {
  const newLots = []
  for (const [key,value] of lots) {
    if (value === false) newLots.push(key)
  }

  return newLots
}

export default roactRedux.connect((state: ClientStore) => {
  return {
    ...defaults,
    lots: getLots(state.availableLots)
  } as Props;
})(LotUI);

*/