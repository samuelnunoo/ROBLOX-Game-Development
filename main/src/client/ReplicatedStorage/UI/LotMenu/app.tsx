import Main from "./Main"
import Roact from "@rbxts/roact"
import { StoreProvider } from "@rbxts/roact-rodux"
import clientStore from "client/ReplicatedStorage/ClientState/Store"


export default  (
    <screengui>
        <StoreProvider store = { clientStore } >
            <Main/>
        </StoreProvider>
    </screengui>
 )

