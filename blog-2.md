# How Generics Enable Reusable Type-Safe Components in TypeScript

## Introduction

One of TypeScript's most powerful features is generics. Generics allow you to write reusable code that works with multiple types while maintaining full type safety. They're like variables for types you can define a function, class, or interface once and use it with different types without sacrificing type information.

## The Problem Generics Solve

Without generics, you'd either need to duplicate code or use `any`:

```typescript
// Without generics - code duplication
function getFirstNumber(arr: number[]): number {
  return arr[0];
}

function getFirstString(arr: string[]): string {
  return arr[0];
}

// Without generics - using any (loses type safety)
function getFirstAny(arr: any[]): any {
  return arr[0];
}

const result = getFirstAny([1, 2, 3]);
// result is 'any' - no autocomplete, no type checking
```

## Basic Generic Functions

With generics, you write once and reuse with type safety:

```typescript
// With generics - reusable and type-safe
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const num = getFirst([1, 2, 3]);        // num is number
const str = getFirst(['a', 'b', 'c']);  // str is string
const bool = getFirst([true, false]);    // bool is boolean

// TypeScript knows the exact type!
num.toFixed(2);      // Valid
str.toUpperCase();   // Valid
bool.toString();     // Valid
```

## Generic Constraints

Sometimes you want to ensure the generic type meets certain requirements. You can use constraints with the `extends` keyword:

```typescript
// Without constraint - could error at runtime
function getProperty<T>(obj: T, key: string): any {
  return obj[key]; // Error: implicit any
}

// With constraint - compile-time safety
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'Eistiak', age: 30 };

const name = getProperty(user, 'name');  //  string
const age = getProperty(user, 'age');    //  number
// const invalid = getProperty(user, 'invalid'); // Compile error!
```

## Generic Classes

Generics shine in class definitions, especially for collections and containers:

```typescript
class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

// Type-safe stores for different data types
const userStore = new DataStore<{ id: number; name: string }>();
userStore.add({ id: 1, name: 'Eistiak' });
// userStore.add({ id: 'wrong' }); //  Error!

const numberStore = new DataStore<number>();
numberStore.add(42);
numberStore.add(3.14);
// numberStore.add('not a number'); //  Error!
```

## Multiple Generic Type Parameters

You can use multiple type parameters for complex relationships:

```typescript
function createMap<K extends string | number, V>() {
  const map = new Map<K, V>();

  return {
    set(key: K, value: V): void {
      map.set(key, value);
    },
    get(key: K): V | undefined {
      return map.get(key);
    },
    has(key: K): boolean {
      return map.has(key);
    }
  };
}

const userMap = createMap<number, { name: string; email: string }>();
userMap.set(1, { name: 'Eistiak', email: 'eistiakahmed@gmail.com' });
const user = userMap.get(1); 

// Type is { name: string; email: string } | undefined
```

## Generic Default Types

You can provide default types for your generics:

```typescript
interface ApiResponse<Data = unknown, Error = string> {
  success: boolean;
  data?: Data;
  error?: Error;
}

// Usage with explicit types
type UserResponse = ApiResponse<{ id: number; name: string }>;

// Usage with defaults
type GenericResponse = ApiResponse;
```

## Conclusion

Generics are a cornerstone of TypeScript's type system. They enable you to write reusable, flexible code while maintaining strict type safety. By capturing type information rather than discarding it (like `any` does), generics let you build components that adapt to different data structures while providing excellent IDE support and catching errors at compile time.
