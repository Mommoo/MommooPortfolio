export type StreamCallback<T,R> = (value : T, index? : number, array? : T[]) => R;
export type ReduceCallback<T,K> = (accumulator : K, currentValue : T, currentIndex? : number, array? : T[]) => K;
export type CompareCallback<T> = (a : T, b : T) => number;
