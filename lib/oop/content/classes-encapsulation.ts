export const lessons: Record<string, { title: string; content: string }> = {
  fundamentals: {
    title: "Classes & Objects",
    content: `
## Classes & Objects

A class is a blueprint. An object is an instance of that blueprint. This is the fundamental building block of object-oriented programming.

### Core Concepts

**Class**: Defines attributes (data) and methods (behavior). A \`Car\` class has attributes like \`color\`, \`speed\`, \`fuelLevel\` and methods like \`accelerate()\`, \`brake()\`, \`refuel()\`.

**Object**: A concrete instance of a class. \`myCar = new Car("red", 0, 100)\` creates an object with specific attribute values.

**Constructor**: A special method called when creating an object. Initializes attributes. In Java/C++: same name as class. In Python: \`__init__\`. In TypeScript/JS: \`constructor()\`.

**The \`this\` / \`self\` keyword**: Refers to the current object instance. Distinguishes instance attributes from local variables: \`this.color = color\`.

**Static vs Instance**: Instance methods/attributes belong to each object (different per object). Static methods/attributes belong to the class itself (shared across all objects). \`Car.totalCarsCreated\` is static. \`myCar.color\` is instance.

### When to Use It

Everything in OOP starts here. If you're modeling real-world entities with state and behavior, you're defining classes. In interviews, the first step is always identifying the key classes/entities.

### Interview Tip

When asked "design a parking lot" or similar, start by listing the nouns — these become your classes. Parking Lot, Floor, Spot, Vehicle, Ticket. Then list the verbs — these become methods. park(), unpark(), calculateFee(). This noun/verb decomposition is the foundation.

### Key Takeaways

- Classes define the blueprint (attributes + methods), objects are instances
- Constructors initialize object state
- Static belongs to the class, instance belongs to each object
- Start OOP design by identifying nouns (classes) and verbs (methods)
`,
  },
  encapsulation: {
    title: "Encapsulation & Access Control",
    content: `
## Encapsulation & Access Control

Encapsulation bundles data and the methods that operate on it together, and restricts direct access to the internal state. This protects invariants and hides implementation details.

### Core Concepts

**Information Hiding**: External code shouldn't directly access or modify an object's internal state. Instead, it uses public methods (getters/setters) that can enforce rules. A \`BankAccount\` shouldn't let you set \`balance = -1000\` directly — the \`withdraw()\` method checks for sufficient funds first.

**Access Modifiers**:
- **public**: Accessible from anywhere
- **private**: Accessible only within the class itself
- **protected**: Accessible within the class and its subclasses
- **package-private** (Java default): Accessible within the same package

**Getters and Setters**: Methods that read (\`getBalance()\`) and write (\`setBalance()\`) private attributes. Setters can validate input. Getters can compute derived values. In Python, use \`@property\` decorators.

**Immutability**: Make attributes \`final\`/\`readonly\` and provide no setters. Once constructed, the object's state can't change. Thread-safe by default, easier to reason about.

### Trade-offs

| Approach | Flexibility | Safety | Complexity |
|----------|------------|--------|------------|
| All public | Maximum | None — anyone can break invariants | Low |
| Private + getters/setters | Controlled | Validation possible | Medium |
| Immutable objects | Least flexible | Maximum safety | Higher (need new object for changes) |

### Interview Tip

In OOP interviews, making attributes private by default shows good design sense. When the interviewer asks "how would you prevent invalid state?" — encapsulation is the answer. Show that your \`withdraw()\` method validates before modifying balance.

### Key Takeaways

- Encapsulation = bundle data + behavior, restrict direct access
- Default to private attributes, expose via public methods
- Setters validate input; getters can compute derived values
- Immutable objects are the safest — consider them for value objects
`,
  },
};
