import type { CourseTopic } from "@/types";

export const OOP_TRACKS = [
  {
    id: "principles",
    title: "Core Principles",
    description: "The four pillars of OOP and SOLID design",
  },
  {
    id: "design",
    title: "Design & Patterns",
    description: "Reusable patterns and visual modeling",
  },
  {
    id: "practice",
    title: "Interview Practice",
    description: "Classic OOP interview problems",
  },
] as const;

export const OOP_CURRICULUM: CourseTopic[] = [
  // === PRINCIPLES ===
  {
    slug: "classes-encapsulation",
    title: "Classes, Objects, Encapsulation",
    track: "principles",
    description:
      "Class anatomy, access modifiers, getters/setters, and constructors",
    lessons: [
      {
        slug: "fundamentals",
        title: "Classes & Objects",
        description:
          "Defining classes, creating objects, constructors, and the this keyword",
        duration: 12,
      },
      {
        slug: "encapsulation",
        title: "Encapsulation & Access Control",
        description:
          "Private/public/protected, getters/setters, and information hiding",
        duration: 10,
      },
    ],
  },
  {
    slug: "inheritance-polymorphism",
    title: "Inheritance & Polymorphism",
    track: "principles",
    description:
      "Method overriding, abstract classes, and runtime polymorphism",
    lessons: [
      {
        slug: "inheritance",
        title: "Inheritance",
        description:
          "Extending classes, super keyword, method overriding, and the diamond problem",
        duration: 12,
      },
      {
        slug: "polymorphism",
        title: "Polymorphism",
        description:
          "Compile-time vs runtime polymorphism, virtual methods, and dynamic dispatch",
        duration: 12,
      },
    ],
  },
  {
    slug: "abstraction-interfaces",
    title: "Abstraction & Interfaces",
    track: "principles",
    description:
      "Interface vs abstract class, dependency inversion, and contracts",
    lessons: [
      {
        slug: "overview",
        title: "Abstraction & Interfaces",
        description:
          "Abstract classes vs interfaces, when to use each, and composition over inheritance",
        duration: 15,
      },
    ],
  },
  {
    slug: "solid-principles",
    title: "SOLID Principles",
    track: "principles",
    description:
      "SRP, OCP, LSP, ISP, DIP — the foundation of maintainable OO design",
    lessons: [
      {
        slug: "srp-ocp",
        title: "SRP & Open-Closed Principle",
        description: "Single responsibility and extending without modifying",
        duration: 15,
      },
      {
        slug: "lsp-isp-dip",
        title: "LSP, ISP & Dependency Inversion",
        description:
          "Substitutability, interface segregation, and depending on abstractions",
        duration: 15,
      },
    ],
  },

  // === DESIGN ===
  {
    slug: "design-patterns",
    title: "Design Patterns",
    track: "design",
    description: "Factory, Singleton, Observer, Strategy, Builder, and Adapter",
    lessons: [
      {
        slug: "creational",
        title: "Creational Patterns",
        description: "Factory Method, Abstract Factory, Singleton, and Builder",
        duration: 15,
      },
      {
        slug: "behavioral-structural",
        title: "Behavioral & Structural Patterns",
        description: "Observer, Strategy, Adapter, Decorator, and Facade",
        duration: 15,
      },
    ],
  },
  {
    slug: "uml-class-diagrams",
    title: "UML & Class Diagrams",
    track: "design",
    description:
      "Class relationships, sequence diagrams, and reading/drawing UML",
    lessons: [
      {
        slug: "overview",
        title: "UML Class Diagrams",
        description:
          "Association, aggregation, composition, inheritance, and dependency in UML",
        duration: 12,
      },
    ],
  },

  // === PRACTICE ===
  {
    slug: "interview-problems",
    title: "OOP Interview Problems",
    track: "practice",
    description:
      "Design Parking Lot, Library System, Elevator, and Vending Machine",
    lessons: [
      {
        slug: "parking-lot",
        title: "Design a Parking Lot",
        description:
          "Spots, vehicles, ticketing, and payment — a classic OOP interview question",
        duration: 20,
      },
      {
        slug: "library-elevator",
        title: "Design Library System & Elevator",
        description:
          "Book management, member tracking, elevator scheduling, and state machines",
        duration: 20,
      },
    ],
  },
];

export function getOopTopicBySlug(slug: string): CourseTopic | undefined {
  return OOP_CURRICULUM.find((t) => t.slug === slug);
}

export const OOP_TOTAL_LESSONS = OOP_CURRICULUM.reduce(
  (sum, t) => sum + t.lessons.length,
  0,
);
