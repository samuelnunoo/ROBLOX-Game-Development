export default abstract class ILot {
    abstract getLots (): Array<Instance> 
    abstract pushLot (lot:string): void
}