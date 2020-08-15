interface Rodash {

	// Arrays 

	append: <T>(target:T[], ...args: Ordered<T>[]) => T[];
	defaultComparator: <T>(a:T,b:T) => boolean;
	first: <T extends Iterable<T>>(source:T, predicate:(element:K, key:V) => boolean) => V?




}


type Ordered<V> = V[] | Iterator<number,V>
