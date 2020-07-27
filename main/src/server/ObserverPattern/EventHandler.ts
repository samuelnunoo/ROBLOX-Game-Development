import Observer from "./Observer"

export default class EventHandler {

    private _observers: Array<Observer>

    constructor () {
        this._observers = []
    }


    add (observer: Observer) {
        this._observers.push(observer)
    }


    notify (data:string) {
        this._observers.forEach(observer => {
            observer.update(data)
        })
    }

}