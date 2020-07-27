import IBuild from './interface'

export default class LotStateManager implements IBuild {
    private _state: Map<string,undefined|number>
    private _grids: Array<Instance>
    
    constructor () {
        this._grids = game.Workspace.Grids.GetChildren()
        this._state = new Map<string, undefined|number>()
        this.init()
    }
    
        init (): void {
            for (const [key, value] of this._grids.entries()) {
                this._state.set(value.Name, undefined)
            }  
        }

        private isAvailable (grid: string): boolean {
            return this._state.get(grid) === undefined
        }

        public availableLots (): Array<string> {
            const available: Array<string> = []

            for( const [key,value] of this._state) {
                if (value === undefined) available.push(key)
            }
            return available
        }

        private isOwner (player: Player, grid: string): boolean {
            let playerID: number = player.UserId
            return this._state.get(grid) === playerID
        }

        public updateState (owner: Player, grid:string): boolean {
            if (this.isAvailable(grid)) {
                let playerID: number = owner.UserId
                this._state.set(grid, playerID)
            }

            return this.isOwner(owner, grid)
        }

        update() {
            for (const [key, value] of this._grids.entries() )
            print(key,value)
        }
}



