import Roact from "@rbxts/roact"
import Main from "./Main"


function LotPreview(name:string) {

    return(
        <screengui>
            <Main 
                type = {name}
            />
        </screengui>

    )
}


export default LotPreview