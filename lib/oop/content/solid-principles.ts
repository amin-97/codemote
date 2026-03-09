export const lessons: Record<string, { title: string; content: string }> = {
  "srp-ocp": {
    title: "SRP & Open-Closed Principle",
    content: `
## Single Responsibility & Open-Closed Principle

The first two SOLID principles. They're the most impactful and the most frequently violated.

### Single Responsibility Principle (SRP)

**"A class should have only one reason to change."**

A class that handles user authentication, sends emails, AND generates reports has three reasons to change. If the email format changes, you modify a class that also handles auth. This creates risk.

**Fix**: Split into \`AuthService\`, \`EmailService\`, \`ReportGenerator\`. Each has one job, one reason to change.

**How to detect violations**: If you describe a class using "and" — "it handles orders AND sends notifications AND logs analytics" — it violates SRP.

### Open-Closed Principle (OCP)

**"Software entities should be open for extension but closed for modification."**

You should be able to add new behavior without changing existing code. Adding a new payment method (crypto) shouldn't require modifying the \`PaymentProcessor\` class.

**Fix**: Use polymorphism. Define a \`PaymentMethod\` interface. Each method (CreditCard, PayPal, Crypto) implements it. \`PaymentProcessor\` accepts any \`PaymentMethod\` — adding a new one requires zero changes to existing code.

**Without OCP**: Giant if/else or switch statements that grow every time you add a feature. Fragile, error-prone.

### Interview Tip

When designing classes in an interview, explicitly state: "I'm keeping this class focused on one responsibility" and "I'm using an interface here so we can extend with new types without modifying existing code." Naming the principles shows you think about maintainability, not just functionality.

### Key Takeaways

- SRP: one class, one job, one reason to change
- OCP: add new features by adding new classes, not modifying existing ones
- Polymorphism and interfaces are the tools for achieving OCP
- Detect SRP violations by looking for "and" in class descriptions
`,
  },
  "lsp-isp-dip": {
    title: "LSP, ISP & Dependency Inversion",
    content: `
## LSP, ISP & Dependency Inversion

The remaining three SOLID principles. They're about substitutability, lean interfaces, and depending on abstractions.

### Liskov Substitution Principle (LSP)

**"Subtypes must be substitutable for their base types."**

If your code works with \`Bird\`, it should work with \`Penguin\` (a subtype of Bird) without breaking. But if \`Bird\` has a \`fly()\` method and \`Penguin\` throws an exception in \`fly()\`, that violates LSP — Penguin can't substitute for Bird.

**Fix**: Redesign the hierarchy. \`Bird\` shouldn't have \`fly()\`. Create a \`FlyingBird\` subclass or a \`Flyable\` interface that only flying birds implement.

### Interface Segregation Principle (ISP)

**"Clients should not be forced to depend on interfaces they don't use."**

A fat \`Worker\` interface with \`work()\`, \`eat()\`, \`sleep()\` forces a \`Robot\` class to implement \`eat()\` and \`sleep()\`, which make no sense. This creates dummy implementations and confusion.

**Fix**: Split into \`Workable\`, \`Eatable\`, \`Sleepable\`. Human implements all three. Robot implements only \`Workable\`. Each client depends only on what it needs.

### Dependency Inversion Principle (DIP)

**"Depend on abstractions, not concretions."**

High-level modules (business logic) shouldn't depend on low-level modules (database, email). Both should depend on abstractions (interfaces).

**Without DIP**: \`OrderService\` directly creates \`MySQLDatabase\`. Switching to PostgreSQL requires changing OrderService.

**With DIP**: \`OrderService\` depends on a \`Database\` interface. \`MySQLDatabase\` and \`PostgresDatabase\` both implement it. Swap implementations without touching business logic. This also enables testing with mock databases.

### Interview Tip

DIP comes up constantly in system design and OOP interviews. When you say "the service depends on an interface, not a concrete class," and explain that this enables testing and swappability, you demonstrate senior-level thinking.

### Key Takeaways

- LSP: subtypes must work wherever the parent type is expected
- ISP: small, focused interfaces over one big bloated interface
- DIP: depend on abstractions (interfaces), inject concrete implementations
- Together, SOLID principles create code that's maintainable, testable, and extensible
`,
  },
};
