class Wrapper {
    private _value: any
    constructor(value: any) {
        this._value = value
    }
    static of(a:any) {
        return new Wrapper(a)
    }
    map(f:Fn) {
        return Wrapper.of(f(this._value))
    }
    join(): any {
        if (!(this._value instanceof Wrapper)) {
            return this
        }

        return this._value.join()
    }
    get() {
        return this._value
    }
    toString() {
        return `Wrapper (${this._value})`
    }
}

export class IO {
    private effect: Fn
    constructor(effect: Fn) {
        if (typeOf(effect) !=="function") {
            throw 'IO Usage: function Required'
        }

        this.effect = effect 
    }

    static of(a:any) {
        return new IO( () => a)
    }

    static from(fn:Fn) {
        return new IO(fn)
    }

    map(fn:Fn) {
        let self = this
        return new IO( () => fn(self.effect()))
    }
    
    chain(fn:Fn) {
        return fn(this.effect())
    }

    run() {
        return this.effect()
    }
}

export class Maybe {
    protected _value: unknown;
    static just(a:unknown) {
        return new Just(a)
    }

    static nothing() {
        return new Nothing()
    }

    static fromNullable(a:unknown): any {
        return a !== undefined ? Maybe.just(a) : Maybe.nothing()
    }

    static of(a:unknown) {
        return this.just(a)
    }

    get isNothing() {
        return false;
    }
}
class Just extends Maybe{
    constructor(value:unknown) {
        super()
        this._value = value 
    }

    get value() {
        return this._value
    }

    map(f:Fn) {
        return Maybe.fromNullable(f(this._value))
    }

    getOrElse() {
        return this._value
    }

    filter(f:Fn){
        Maybe.fromNullable(f(this._value) ? this._value : undefined)
    }

    chain(f:Fn) {
        return f(this.value)
    }

    toString() {
        return `Maybe.Just(${this._value})`
    }
}
class Nothing extends Maybe {
    map(f:Fn) {
        return this;
    }

    get value() {
        throw " Can't extract the value of a Nothing"
    }

    getOrElse (other:unknown) {
        return other 
    }

    filter(f:Fn) {
        return this._value
    }

    chain(f:Fn) {
        return this
    }

    toString() {
        return 'Maybe.Nothing'
    }
}


