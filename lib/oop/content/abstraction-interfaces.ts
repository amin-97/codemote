export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "Abstraction & Interfaces",
    content: `
## Abstraction & Interfaces

Abstraction hides complexity behind simple interfaces. You drive a car without understanding the engine internals. In OOP, interfaces and abstract classes define *what* something does without specifying *how*.

### Core Concepts

**Abstract Class**: A class that can't be instantiated directly. May contain both abstract methods (no body — subclasses must implement) and concrete methods (with implementation). Used when subclasses share common behavior but differ in specifics. \`abstract class Shape { abstract area(): number; perimeter(): number { ... } }\`

**Interface**: A pure contract — only method signatures, no implementation (in classic OOP; modern languages allow default methods). A class can implement multiple interfaces. \`interface Flyable { fly(): void }\`, \`interface Swimmable { swim(): void }\`. A Duck implements both.

**When to Use Which**:
- **Abstract class**: When subclasses share state and behavior. "is-a" with common code.
- **Interface**: When unrelated classes share a capability. "can-do" contract. Multiple interfaces allowed.

**Composition over Inheritance (revisited)**: Instead of inheriting from abstract classes, inject dependencies via interfaces. \`PaymentProcessor\` takes a \`PaymentGateway\` interface — can be Stripe, PayPal, or a mock for testing.

### Trade-offs

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Multiple inheritance | No (single parent) | Yes (implement many) |
| State (fields) | Yes | No (traditionally) |
| Shared code | Yes (concrete methods) | Limited (default methods) |
| Coupling | Higher | Lower |
| Use case | Shared behavior hierarchy | Capability contracts |

### Interview Tip

In OOP interview problems, define interfaces for behaviors that multiple unrelated classes share. A \`Parkable\` interface for vehicles, a \`Billable\` interface for items. This shows you think in terms of contracts, not inheritance hierarchies.

### Key Takeaways

- Abstract classes share code among related classes (is-a)
- Interfaces define contracts for capabilities (can-do)
- Prefer interfaces for flexibility and testability
- Composition + interfaces > deep inheritance hierarchies
`,
  },
};
