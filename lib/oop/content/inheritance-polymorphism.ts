export const lessons: Record<string, { title: string; content: string }> = {
  inheritance: {
    title: "Inheritance",
    content: `
## Inheritance

Inheritance lets a class (child/subclass) inherit attributes and methods from another class (parent/superclass). It models "is-a" relationships: a Dog is-a Animal.

### Core Concepts

**Extending a Class**: The child class gets all public/protected attributes and methods of the parent. It can add new ones and override existing ones. \`class Dog extends Animal\`.

**super Keyword**: Calls the parent's constructor or methods. \`super(name, age)\` in the child constructor initializes inherited attributes. \`super.speak()\` calls the parent's version of an overridden method.

**Method Overriding**: The child provides its own implementation of a parent method. \`Dog.speak()\` returns "Woof" instead of the generic \`Animal.speak()\`. The method signature must match.

**The Diamond Problem**: In multiple inheritance (C++, Python), if class D inherits from B and C, both of which inherit from A, which version of A's method does D get? Python uses MRO (Method Resolution Order). Java/C# avoid this by only allowing single class inheritance (but multiple interface implementation).

**Composition over Inheritance**: "Has-a" is often better than "is-a." Instead of \`ElectricCar extends Car\`, use \`Car has-a Engine\` where Engine can be \`ElectricEngine\` or \`GasEngine\`. More flexible, less coupled.

### Interview Tip

When discussing inheritance in interviews, always mention "composition over inheritance" as a design consideration. This shows maturity. Use inheritance for genuine "is-a" relationships with shared behavior, composition for "has-a" relationships with swappable components.

### Key Takeaways

- Inheritance models "is-a" relationships and enables code reuse
- Use super to call parent constructors and methods
- Override methods to specialize behavior in subclasses
- Prefer composition over inheritance for flexibility
`,
  },
  polymorphism: {
    title: "Polymorphism",
    content: `
## Polymorphism

Polymorphism means "many forms." The same interface or method name behaves differently depending on the object type. It's what makes OOP powerful — you write code against abstractions, not concrete types.

### Core Concepts

**Runtime Polymorphism (Method Overriding)**: A parent reference can point to a child object. When you call a method, the child's version runs. \`Animal a = new Dog(); a.speak();\` calls Dog's speak(), not Animal's. This is resolved at runtime via virtual method tables (vtable).

**Compile-time Polymorphism (Method Overloading)**: Same method name, different parameter lists. \`add(int, int)\` vs \`add(double, double)\`. Resolved at compile time based on argument types.

**Polymorphic Collections**: Store different subtypes in a single collection. \`List<Shape> shapes\` can contain Circle, Rectangle, Triangle objects. Iterate and call \`shape.area()\` — each computes its own area.

**The Liskov Substitution Principle (LSP)**: Subtypes must be substitutable for their parent type without breaking behavior. If your code works with \`Animal\`, it should work with \`Dog\` too, without surprises.

### How It Works

\`\`\`
Shape[] shapes = { new Circle(5), new Rectangle(3, 4), new Triangle(3, 4, 5) };
for (Shape s : shapes) {
    System.out.println(s.area());  // Each calls its own implementation
}
\`\`\`

Without polymorphism, you'd need if/else chains checking the type. Polymorphism eliminates this — the object itself knows how to behave.

### Interview Tip

When the interviewer asks "why polymorphism?" — the answer is extensibility. You can add new shapes (Pentagon, Hexagon) without modifying existing code. The loop above works with any future Shape subclass. This is the Open-Closed Principle in action.

### Key Takeaways

- Runtime polymorphism: parent reference, child behavior (method overriding)
- Compile-time polymorphism: same method name, different parameters (overloading)
- Enables writing generic code that works with any subtype
- Eliminates type-checking if/else chains — the object knows its own behavior
`,
  },
};
