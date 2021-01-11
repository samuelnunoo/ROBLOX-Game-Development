/// <reference types="@rbxts/testez/globals" />

import {IObserver, testVersion} from "client/ReplicatedStorage/Observer/Observer"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import {notifyListeners} from "client/ReplicatedStorage/Observer/notifyListeners"
import Object from "@rbxts/object-utils";

class testClass2 implements IObserver {

    private target: any;
    constructor(target:any) {
        this.target = target;
    }

    public update(value:any) {
        this.target = value        
    }

    public getValue() {
        return this.target;
    }
}


export = () => {
    describe("subscribe",() => {
        let target = false;
        const instance = new testClass2(target)
        const Observer = new testVersion()
        Observer.subscribe(Request_ID.Lot_Request,instance)

        it("should have proper object",() => {
     
            expect(Observer.listeners[0].object).to.equal(instance)
        })

        it("should have proper id",() => {
            expect(Observer.listeners[0].id).to.equal(Request_ID.Lot_Request)
        })



    })

    describe("notify",() => {
    
        it("it should invoke method",() => {
            const Observer = new testVersion()
            const instance = new testClass2(false);


            Observer.subscribe(Request_ID.Lot_Request,instance)
            Observer.notify(Request_ID.Lot_Request,true)
            expect(instance.getValue()).to.equal(true)
        })

        it("should not invoke method", () => {
            const Observer = new testVersion()
            const instance = new testClass2(false);
            
            Observer.subscribe(Request_ID.Lot_Request,instance)
            Observer.notify(Request_ID.Update_Store,{})
            expect(instance.getValue()).to.equal(false)
        })


    })

    describe("unsubscribe",() => {
     
        it('should remove object', () => {
            const Observer = new testVersion()
            const instance = new testClass2(false);
            Observer.subscribe(Request_ID.Lot_Request,instance)
            Observer.unsubscribe(instance)

            expect(Observer.listeners.size()).to.equal(0)
      
        })

    })

    describe("notifyListeners",() => {

        let target = {field1:"hah"}
        const instance = new testClass2(target)
        const Observer = new testVersion()
        Observer.subscribe(Request_ID.Lot_Request,instance)
      
        const payload = {
            request: Request_ID.Lot_Request,
            data: false
        }
        notifyListeners(Observer)(payload)

        it("should have payload",() => {
            expect(instance.getValue()).to.equal(false)
        })

    })



}