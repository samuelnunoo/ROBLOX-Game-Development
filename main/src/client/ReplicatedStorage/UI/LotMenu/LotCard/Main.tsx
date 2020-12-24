import Roact from "@rbxts/roact"
import { isBreakOrContinueStatement } from "typescript"
import ImageButton from "./ImageButton"
import {IImageButton} from "./ImageButton"
import TextLabel from "./TextLabel"
import {ITextLabel} from "./TextLabel"

export interface ILotCard {
    image: string;
    type:"residential" | "business"
    event: Fn;
    text: string;
    color: Color3;
    background: Color3;
}

const LotCard = (props:ILotCard) => {
    return(
        <ImageButton
            image = { props.image}
            event = {props.event}
            type = { props.type }
        >
                <TextLabel
                    text = { props.text}
                    color = {props.color}
                    background = {props.background}
                />
        </ImageButton>
       
    )

}



export default LotCard