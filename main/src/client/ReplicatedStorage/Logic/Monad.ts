class Wrapper <T> {
    private _value: T
    constructor(value: T) {
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




export type Option = null 
const isNil = (x:any): x is undefined => x === undefined 


export class Maybe<T> {

    private wrappedValue: T | undefined 

    private constructor( private value: T | undefined)  {
        this.wrappedValue = value 
    }

    public map<U>( fn: (x:T) => U): Maybe<U> {
        if (!isNil(this.wrappedValue)) {
            return new Maybe(fn(this.wrappedValue))
        }
        return new Maybe<U>(undefined)

    }

    public filter(f: (arg:T) => boolean): Maybe<T> | Maybe<undefined> {
        if (!isNil(this.wrappedValue)) {
            if (f(this.wrappedValue)) return new Maybe(this.wrappedValue)
        }

        return new Maybe(undefined)
    }

    static some<T> (value:T) {
        if (!value) {
            throw error("Provided value must not be empty")
        }
        return new Maybe(value)
    }

    static none () {
        return new Maybe(undefined)
    }

    static fromNullable<T>(value: T): Maybe<T> | Maybe<undefined>  {
        return !isNil(value) ?  Maybe.some(value) : Maybe.none()
    }

    getOrElse<U>(defaultValue: U) {
        return isNil(this.wrappedValue) ? defaultValue : this.wrappedValue
    }

    get isNull () {
        return this.value === null 
    }

     chain(f:Fn): ReturnType<typeof f> {
        return f(this.value)
    }

    toString(): string {
        return `Maybe.Just(${this.value})`
    }




}

