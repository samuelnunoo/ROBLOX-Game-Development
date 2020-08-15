export {}


export function sequence(...func:Fn[]) {
    return (val:any) => func.forEach( fn => fn(val))
}