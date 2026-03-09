export const lessons: Record<string, { title: string; content: string }> = {
  "parking-lot": {
    title: "Design a Parking Lot",
    content: `
## Design a Parking Lot

The most classic OOP interview question. It tests class design, relationships, and handling real-world constraints.

### Requirements

- Multiple floors, each with multiple spots
- Three spot sizes: small (motorcycle), medium (car), large (truck/bus)
- Vehicles are assigned the smallest available spot that fits them
- Entry/exit with automated ticketing
- Calculate fee based on duration
- Track available spots per floor and size

### Key Classes

**ParkingLot**: Singleton. Has floors, entry/exit panels. Methods: \`park(vehicle)\`, \`unpark(ticket)\`, \`getAvailableSpots()\`.

**Floor**: Has a list of spots. Methods: \`findAvailableSpot(vehicleType)\`, \`getAvailableCount()\`.

**ParkingSpot**: Has \`spotSize\`, \`isAvailable\`, \`vehicle\` (if occupied). Methods: \`canFit(vehicle)\`, \`assignVehicle(vehicle)\`, \`removeVehicle()\`.

**Vehicle** (abstract): Subclasses: \`Motorcycle\`, \`Car\`, \`Truck\`. Each knows its size requirement. Has \`licensePlate\`.

**Ticket**: Generated on entry. Has \`vehicle\`, \`spot\`, \`entryTime\`, \`exitTime\`, \`fee\`. Methods: \`calculateFee()\`.

**PaymentProcessor**: Strategy pattern — \`CashPayment\`, \`CardPayment\`. Processes ticket payment.

### Design Decisions

**Spot assignment**: Use a priority queue per size per floor. Pop the first available spot of the right size. If none available, try the next size up (car in a large spot).

**Fee calculation**: Strategy pattern. \`HourlyRate\`, \`FlatRate\`, \`WeekendRate\`. The ParkingLot delegates to the active pricing strategy.

**Concurrency**: Multiple cars entering simultaneously. Use locks on spot assignment to prevent two cars getting the same spot.

### Patterns Used

- **Singleton**: ParkingLot (one system)
- **Strategy**: PaymentProcessor, FeeCalculator
- **Factory**: VehicleFactory creates the right Vehicle subclass from input
- **Observer**: Display boards observe spot availability changes

### Key Takeaways

- Start with nouns (classes) and verbs (methods)
- Vehicle hierarchy uses inheritance (is-a)
- ParkingLot → Floor → Spot uses composition (has-a)
- Strategy pattern for swappable fee calculation and payment
- Handle edge cases: lot full, invalid ticket, oversized vehicle
`,
  },
  "library-elevator": {
    title: "Design Library System & Elevator",
    content: `
## Design Library System

A system for managing books, members, borrowing, and returns.

### Key Classes

**Library**: Has catalog of books, list of members. Methods: \`searchBook(query)\`, \`registerMember()\`.

**Book**: \`title\`, \`author\`, \`isbn\`, \`copies\` (list of BookCopy). A book can have multiple physical copies.

**BookCopy**: \`id\`, \`book\`, \`status\` (available/borrowed/reserved/lost). The actual physical item.

**Member**: \`name\`, \`memberId\`, \`borrowedBooks\`, \`maxBooks\` (limit). Methods: \`borrow(bookCopy)\`, \`return(bookCopy)\`, \`reserve(book)\`.

**BorrowRecord**: \`member\`, \`bookCopy\`, \`borrowDate\`, \`dueDate\`, \`returnDate\`, \`fine\`. Tracks each borrowing transaction.

**FineCalculator**: Strategy pattern. \`PerDayFine\`, \`FlatFine\`. Calculates overdue charges.

### Design Decisions

- **Book vs BookCopy separation**: A Book is the logical entity (title, author). BookCopy is the physical item. One Book has many BookCopies. This lets you track individual copy status while searching by book title.
- **Reservation queue**: If all copies are borrowed, a member can reserve. When a copy is returned, the first person in the queue is notified (Observer pattern).
- **Member limits**: Different member types (Student: max 3, Faculty: max 10). Use inheritance or a \`MemberType\` enum with configurable limits.

---

## Design an Elevator System

A system managing multiple elevators in a building.

### Key Classes

**ElevatorSystem**: Manages all elevators. Receives requests, dispatches the optimal elevator. Methods: \`requestElevator(floor, direction)\`.

**Elevator**: \`currentFloor\`, \`direction\` (up/down/idle), \`doorState\`, \`requestQueue\`. Methods: \`addRequest(floor)\`, \`move()\`, \`openDoors()\`.

**Request**: \`floor\`, \`direction\`, \`timestamp\`. External request (from a floor button) or internal request (from inside the elevator).

**Dispatcher** (Strategy): Decides which elevator handles a request. Strategies: \`NearestElevator\`, \`LeastLoadedElevator\`, \`ZoneBasedDispatcher\`.

### Design Decisions

- **State Machine**: Elevator has states: Idle, MovingUp, MovingDown, DoorOpen. Transitions are well-defined. This is a textbook state pattern application.
- **Scheduling**: SCAN algorithm (elevator-style) — move in one direction serving all requests, then reverse. Like a disk arm. Minimizes total travel.
- **Multiple elevators**: The Dispatcher decouples request handling from individual elevator logic. Adding a new dispatching strategy requires no changes to Elevator class (OCP).

### Patterns Used Across Both

| Pattern | Library Use | Elevator Use |
|---------|-------------|-------------|
| Strategy | FineCalculator, SearchStrategy | Dispatcher algorithm |
| Observer | Notify on book return | Notify on floor arrival |
| State | BookCopy status transitions | Elevator state machine |
| Singleton | Library system | ElevatorSystem |
| Factory | Create member types | Create request objects |

### Key Takeaways

- Separate logical entities from physical instances (Book vs BookCopy)
- State machines are natural for entities with well-defined transitions
- Strategy pattern makes algorithms swappable (dispatching, pricing, searching)
- Observer pattern decouples event producers from consumers
- Always identify: what are the entities, what are the actions, what varies?
`,
  },
};
