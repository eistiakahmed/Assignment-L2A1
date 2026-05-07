// Problem 1: Filter Even Numbers
function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter(num => num % 2 === 0);
}


// Problem 2: Reverse String
function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

// Problem 3: Union Type and Type Guards
type StringOrNumber = string | number;

function checkType(input: StringOrNumber): string {
  if (typeof input === 'string') {
    return 'String';
  }
  return 'Number';
}

// Problem 4: Generic Function with Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Problem 5: Interface and Object Spread
interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

interface BookWithReadStatus extends Book {
  isRead: boolean;
}

function toggleReadStatus(book: Book): BookWithReadStatus {
  return {
    ...book,
    isRead: true
  };
}

// Problem 6: Class Inheritance
class Person {
  constructor(public name: string, public age: number) {}
}

class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

// Problem 7: Array Intersection
function getIntersection(arr1: number[], arr2: number[]): number[] {
  const set2 = new Set(arr2);
  return arr1.filter(num => set2.has(num));
}
