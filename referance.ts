
{
  interface Person {
    first: string;
    last: string;
    [key: string]: any;
  }

  const person: Person = {
    first: "Adam",
    last: "Venton",
  }

  const person2: Person = {
    first: "Your",
    last: "Mother",
    gay: true,
  }

  function pow(x: number, y: number): string {
    return Math.pow(x, y).toString();
  }

  pow(5, 10);

  type MyList = [number?, string?, boolean?]

  const arr: MyList = [];

  arr.push(1);
  arr.push(23);
  arr.push(0);

  class Observable<T> {
    constructor(public value: T) { }
  }

  let x: Observable<number>;
  let y: Observable<Person>;
  let z = new Observable(23);
}