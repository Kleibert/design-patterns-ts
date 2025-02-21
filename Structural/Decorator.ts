// Decorator is a structural design pattern that lets you attach new behaviors to objects by placing 
// these objects inside special wrapper objects that contain the behaviors.

interface Component {
    operation(): string;
}

class ConcreteComponent implements Component {
    public operation(): string {
        return 'ConcreteComponent';
    }
}

abstract class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    public operation(): string {
        return this.component.operation();
    }
}

class ConcreteDecoratorA extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`;
    }
}

class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`;
    }
}

function clientCode(component: Component) {
    console.log(`RESULT: ${component.operation()}`);
}

const simple = new ConcreteComponent();
clientCode(simple);
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('Client: Now I\'ve got a decorated component:');
clientCode(decorator2);

// Real world Example
// Base interface
interface Coffee {
    cost(): number;
    description(): string;
}

// Concrete Component
class SimpleCoffee implements Coffee {
    cost(): number {
        return 5;
    }

    description(): string {
        return 'Simple Coffe'
    }
}

// Base Decorator Class

abstract class CoffeeDecorator implements Coffee {
    constructor(protected coffee: Coffee) {}

    cost(): number {
        return this.coffee.cost();
    }

    description(): string {
        return this.coffee.description();
    }
}

// Implement Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
    cost(): number {
        return this.coffee.cost() + 1;
    }

    description(): string {
        return this.coffee.description() +', Milk';
    }
}

class SugarDecorator extends CoffeeDecorator {
    cost(): number {
        return this.coffee.cost() + 0.5;
    }

    description(): string {
        return this.coffee.description() + ',Sugar';
    }
}

class CaramelDecorator extends CoffeeDecorator {
    cost(): number {
        return this.coffee.cost() + 1.5; 
    }

    description(): string {
        return this.coffee.description() + ", Caramel";
    }
}


class WhippedCreamDecorator extends CoffeeDecorator {
    cost(): number {
        return this.coffee.cost() + 2; 
    }

    description(): string {
        return this.coffee.description() + ", Whipped Cream";
    }
}

interface Decorators {
    [key:string]: new (coffee:Coffee) => CoffeeDecorator
}

function createCustomCoffe(baseCofee: Coffee, addOns: string[]): Coffee {
    const decorators: Decorators = {
        milk: MilkDecorator,
        sugar: SugarDecorator,
        caramel: CaramelDecorator,
        whippedCream: WhippedCreamDecorator
    };

    for (const addOn of addOns) {
        if ( decorators[addOn]) {
            baseCofee = new decorators[addOn](baseCofee);
        }
    }

    return baseCofee;

}

const userSelection = ['milk', 'caramel', 'sugar'];

const customCoffee = createCustomCoffe(new SimpleCoffee(), userSelection);

console.log(`${customCoffee.description()} => Cost: $${customCoffee.cost()}`);
