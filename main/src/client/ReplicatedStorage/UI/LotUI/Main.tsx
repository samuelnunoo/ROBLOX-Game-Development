import Roact from "@rbxts/roact";
import roactRedux from "@rbxts/roact-rodux";
import { ClientStore } from "client/ReplicatedStorage/ClientState/Store";
import { Lots } from "client/ReplicatedStorage/ClientState/Reducers/availableLots";
import LotButton from "client/ReplicatedStorage/UI/LotUI/LotButton";

interface MyComponentState extends Props {
  currentLot: Instance | undefined 
  index: number;
}
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

    const lots = this.getLots(this.props.isTaken as Lots)

    this.setState({
      ...defaults,
      currentTime: 0,
      index: 0,
      lots: lots,
      isTaken: this.props.isTaken,
      currentLot: lots[0]
    } as MyComponentState);

    if (this.state.isTaken) {
      print(this.state.isTaken.get(this.state.example(this.state)));
    }
  }

  public render(): Roact.Element {

    return (
      <screengui>
        <frame
            Size = {new UDim2(0,383,0,235)}
            Position = {new UDim2(0,178,0,314)}
        >

          <LotButton
   
          callback = { (key: string) => this.setIndex(key) }
          position = { new UDim2(0,25,0,25)}
          text = { "Left"} />

           <LotButton
          callback = { (key:string) => this.setIndex(key) }
          position = { new UDim2(0,25,0,25)}
          text = { "Right"} />

           <LotButton
          callback = { () => undefined }
          position = { new UDim2(0,250,0,25)}
          text = { "Choose"} />

        
        </frame>
      </screengui>
    );
  }


  private setIndex(key:string) {
    const direction = key === "Left" ? 1 : -1
    const index = this.state.index
    const lot = this.state.lots
    const newIndex = index + direction

    if (newIndex >= lot.size()) return 0
    if (newIndex < 0) return lot.size() - 1


    this.setState({
      index: newIndex
    })

  }

  private getLots(lots: Lots) {
    const newLots = []
    for (const [key,value] of lots.entries()) {
      if (value === false) newLots.push(key)
    }

    return newLots
  }
}

export default roactRedux.connect((state: ClientStore) => {
  return {
    ...defaults,
    isTaken: state.availableLots,
    lots: game.Workspace.Grids.GetChildren(),
  } as Props;
})(LotUI);
