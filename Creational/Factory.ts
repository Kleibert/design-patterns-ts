// Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, 
// but allows subclasses to alter the type of objects that will be created.
// It’s very useful when you need to provide a high level of flexibility for your code.

interface Product {
    operation(): string;
}

export class SimplePoduct implements Product {
    public operation(): string {
        return 'Result of the SingleProduct'
    }
}

export class ConfigurableProduct implements Product {
    public operation(): string {
        return 'Resul of the ConfigurableProduct'
    }
}


abstract class ProductFactory {
    public abstract factoryMethod(): Product;

    public someOperation(): string {
        const product = this.factoryMethod();

        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

export class SimplePoductFactory extends ProductFactory {
    public factoryMethod(): Product {
        return new SimplePoduct();
    }
}

export class ConfigurableProductFactory extends ProductFactory {
    public factoryMethod(): Product {
        return new ConfigurableProduct();
    }
}

function clientCode(product: ProductFactory) {
    console.log('Client: I\'m not aware of the product\'s class, but it still works.');
    console.log(product.someOperation());
}

//clientCode(new SimplePoductFactory());
//clientCode(new ConfigurableProductFactory);

function getProductFactory(productType: string): ProductFactory {
    switch (productType) {
        case 'simple':
            return new SimplePoductFactory();
        case 'configurable':
            return new ConfigurableProductFactory();
        default:
            throw new Error('Unsupported product')
    }
}

const productFactory1 = getProductFactory('simple');
console.log(productFactory1.someOperation());

const productFactory2 = getProductFactory('configurable');
console.log(productFactory2.someOperation());
