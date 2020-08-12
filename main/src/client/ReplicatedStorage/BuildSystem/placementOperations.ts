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

    const {left, right, top, bottom} = boundary(lot)
    const compare = boundary(object)

    const horizontal = compare.left >= left && compare.right <= right
    const vertical = compare.bottom >= bottom && compare.top <= top
    const isValid = horizontal && vertical

    const diffX = lot.Position.X - object.Position.X
    const diffZ = lot.Position.Z - object.Position.Z

    return isValid ? new Vector3(diffX, 0, diffZ) : new Vector3(0,0,0)
}

export const place = (lot:BasePart) => (object:Model) => {
    const main = object.PrimaryPart as BasePart
    const translation = offset(lot)(main)
    buildRemote.FireServer('place', main, translation)

}


