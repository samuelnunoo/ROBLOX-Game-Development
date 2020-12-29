/// <reference types="@rbxts/testez/globals" />

import {IObserver, testVersion} from "client/ReplicatedStorage/Observer/Observer"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import {notifyListeners} from "client/ReplicatedStorage/Observer/notifyListeners"

class testClass implements IObserver {

    private target: any;
    constructor(target:any) {
        this.target = target;
    }
    public update(value:any) {
        this.target = true;
        return true;
    }
}

class testClass2 implements IObserver {

    private target: any;
    constructor(target:any) {
        this.target = target;
    }
    public update(value:any) {
        this.target = value
        return true;
    }
}

export = () => {
    describe("subscribe",() => {
        let target = false;
        const instance = new testClass(target)
      

        it("should be in listeners",() => {
            const Observer = new testVersion()
            Observer.subscribe(Request_ID.Lot_Request,instance)
            expect(Observer.listeners[0]).to.equal(instance)
        })



    })

    describe("notify",() => {
    
        it("it should invoke method",() => {
            let target = false;
            const Observer = new testVersion()
            const instance = new testClass(target);
            Observer.subscribe(Request_ID.Lot_Request,instance)
            Observer.notify(Request_ID.Lot_Request,{})
            expect(target).to.equal(true)
        })

        it("should not invoke method", () => {
            let target = false;
            const Observer = new testVersion()
            const instance = new testClass(target);
            Observer.subscribe(Request_ID.Lot_Request,instance)
            Observer.notify(Request_ID.Update_Store,{})
            expect(target).to.equal(false)
        })


    })

    describe("unsubscribe",() => {
        let target = false;

        it('should remove object', () => {
            const Observer = new testVersion()
            const instance = new testClass(target);
            Observer.subscribe(Request_ID.Lot_Request,instance)
            Observer.unsubscribe(instance)
            expect(Observer.listeners.size()).to.equal(0)
      
        })

    })

    describe("notifyListeners",() => {

        let target = false 
        const io = new testClass2(target)
        const Observer = new testVersion()
        Observer.subscribe(Request_ID.Update_Store,io)
        const payload = {
            request: Request_ID.Update_Store,
            field1: 1,
            field2: 2,
            field3: 3
        }
        notifyListeners(Observer)(payload)

        it("should have payload",() => {
            expect(target).to.equal({field1:1,field2:2,field3:3})
        })

    })



}