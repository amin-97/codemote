export const lessons: Record<string, { title: string; content: string }> = {
  creational: {
    title: "Creational Patterns",
    content: `
## Creational Patterns

Creational patterns abstract the instantiation process — they decide *how* objects are created rather than creating them directly with \`new\`.

### Factory Method

**Problem**: You need to create objects but don't know the exact type until runtime. A logistics app needs to create \`Truck\` or \`Ship\` transport depending on the delivery type.

**Solution**: Define a factory method that subclasses override to create the appropriate object. The caller uses the base interface — it never knows or cares about the concrete type.

**When to use**: When the exact type of object depends on configuration, user input, or runtime conditions. When you want to decouple creation from usage.

### Abstract Factory

**Problem**: You need to create families of related objects. A UI toolkit needs to create Buttons, Checkboxes, and Menus that are all consistent — either all Windows-style or all Mac-style.

**Solution**: Define an abstract factory interface with methods for each product type. Concrete factories (WindowsFactory, MacFactory) create platform-specific objects. The client code only uses the abstract factory and product interfaces.

### Singleton

**Problem**: A class should have exactly one instance globally — a database connection pool, a logger, a configuration manager.

**Solution**: Private constructor, static \`getInstance()\` method that creates the instance on first call and returns it on subsequent calls. In multi-threaded environments, use double-checked locking or initialize eagerly.

**Warning**: Singletons are essentially global state. They make testing harder (can't substitute) and hide dependencies. Use sparingly — dependency injection is usually better.

### Builder

**Problem**: Constructing a complex object requires many parameters, some optional. A \`new House(walls, doors, windows, roof, garage, pool, garden)\` constructor is unreadable.

**Solution**: A Builder class with fluent methods: \`new HouseBuilder().setWalls(4).setDoors(2).setRoof("tile").build()\`. Each method returns the builder for chaining. The \`build()\` method validates and returns the final object.

### Interview Tip

Know Factory and Singleton deeply — they come up in nearly every OOP interview. For Factory, draw the class diagram showing the creator hierarchy and product hierarchy. For Singleton, mention thread-safety concerns.

### Key Takeaways

- Factory Method: subclasses decide which class to instantiate
- Abstract Factory: create families of related objects
- Singleton: one instance globally — use sparingly, prefer DI
- Builder: construct complex objects step by step with fluent API
`,
  },
  "behavioral-structural": {
    title: "Behavioral & Structural Patterns",
    content: `
## Behavioral & Structural Patterns

Behavioral patterns manage communication between objects. Structural patterns compose objects into larger structures.

### Observer (Behavioral)

**Problem**: Multiple objects need to react when another object's state changes. A stock price changes — the chart, the alert system, and the portfolio display all need to update.

**Solution**: The subject maintains a list of observers. When state changes, it notifies all observers. Observers register/unregister dynamically. This is the foundation of event systems and reactive programming.

### Strategy (Behavioral)

**Problem**: You need to switch between different algorithms at runtime. A navigation app switches between driving, walking, and cycling route calculations.

**Solution**: Define a \`RouteStrategy\` interface. \`DrivingStrategy\`, \`WalkingStrategy\`, \`CyclingStrategy\` each implement it. The \`Navigator\` class holds a strategy reference and delegates to it. Swap strategies without changing Navigator.

### Adapter (Structural)

**Problem**: Two classes with incompatible interfaces need to work together. Your app expects a \`MediaPlayer\` interface but you have a third-party \`VLCPlayer\` with a different API.

**Solution**: Create an \`VLCAdapter\` that implements \`MediaPlayer\` and wraps \`VLCPlayer\`, translating method calls. The adapter bridges the gap without modifying either class.

### Decorator (Structural)

**Problem**: You need to add behavior to objects dynamically without modifying their class. Add encryption to a file writer, then add compression on top.

**Solution**: Wrap the object in decorator classes that implement the same interface. \`EncryptedWriter\` wraps \`FileWriter\`, \`CompressedWriter\` wraps \`EncryptedWriter\`. Each adds behavior, then delegates to the wrapped object.

### Facade (Structural)

**Problem**: A complex subsystem has too many classes for clients to interact with directly. Home theater: TV, speakers, Blu-ray player, lights each have their own API.

**Solution**: A \`HomeTheaterFacade\` provides simple methods like \`watchMovie()\` that coordinates all the subsystem objects internally.

### Interview Tip

Observer and Strategy are the most commonly asked behavioral patterns. For Observer, mention real-world uses: event listeners, pub/sub, React state updates. For Strategy, show how it eliminates if/else chains for algorithm selection.

### Key Takeaways

- Observer: one-to-many notifications when state changes
- Strategy: swap algorithms at runtime via interface
- Adapter: bridge incompatible interfaces
- Decorator: add behavior by wrapping objects
- Facade: simplify complex subsystems with a unified interface
`,
  },
};
