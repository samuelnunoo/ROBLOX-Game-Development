import IBuild from './interface'

export default class Observer implements IBuild {

    update (data:string): void {
        print(data)
    }

}