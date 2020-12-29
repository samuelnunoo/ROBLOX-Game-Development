import Object from "@rbxts/object-utils";
import Roact from "@rbxts/roact"

const localPlayer = game.GetService("Players").LocalPlayer as LocalPlayer 
class UIManager {

    private UI = new Map<string,Roact.ComponentInstanceHandle>()

    public mount(name:string,app:Roact.Element,parent?:Instance|undefined) {
        const location = parent !== undefined ? parent : localPlayer.PlayerGui
        const binding = Roact.mount(app,location,name)
        this.UI.set(name,binding)
    }

    public unmount(name:string) {
        const binding = this.UI.get(name)
        if (binding) {
            Roact.unmount(binding)
        }
    }

    public get(name:string) {
        return this.UI.get(name)
    }

    public clearAll() {
        for (const [key,value] of this.UI) {
            Roact.unmount(value)
            this.UI.delete(key)
        }
    }
    
}


export default new UIManager() 