const buildRemote = game.GetService("ReplicatedStorage").buildEvent

export const boundary = (value:BasePart) => {

    const sX = value.Size.X
    const sZ = value.Size.Z
    const pX = value.Position.X
    const pZ = value.Position.Z

    const right = pX + (sX/2)
    const left = pX - (sX/2)
    const top = pZ + (sZ/2)
    const bottom = pZ - (sZ/2)

    return {right,left,top,bottom}

}
export const offset = (lot:BasePart) => (object:BasePart) => {
    const isValid = isInBounds(lot)(object)

    const diffX = lot.Position.X - object.Position.X
    const diffZ = lot.Position.Z - object.Position.Z

    return isValid ? new Vector3(diffX, 0, diffZ) : new Vector3(0,0,0)
}
export const place = (lot:BasePart) => (object:Model) => {
    const main = object.PrimaryPart as BasePart
    const id = object.Name
    const pos = main.Position

    buildRemote.FireServer(id, pos)

}
export const rotate = (object:BasePart, direction: 1 | -1) => {
    const interval = direction === 1 ? 5 : -5
    const rot = object.Orientation

    return new Vector3(0,rot.Y + interval,0)
}
export const isInBounds = (lot: BasePart) => (object:BasePart) => {
    const {left, right, top, bottom} = boundary(lot)
    const obj = boundary(object)

    const horizontal = obj.left >= left && obj.right <= right 
    const vertical = obj.bottom >= bottom && obj.top <= top 

    return horizontal && vertical
}
