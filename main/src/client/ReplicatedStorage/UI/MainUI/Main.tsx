import Roact from "@rbxts/roact"
import ImageButton from "../Components/ImageButton"
import ButtonContainer from "./ButtonContainer"
import UIBar from "./UIBar"

interface Prop {

}

export {}

class Main extends Roact.Component<Prop> {

    constructor() {
        super({})
    }


    public render(): Roact.Element {

        return  (
            <screengui>
                <UIBar>
                </UIBar>
            </screengui>
        )
    }

}

export default  Main 