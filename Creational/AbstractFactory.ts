// Abstract Factory is a creational design pattern,
//  which solves the problem of creating entire product families without specifying their concrete classes.
interface OneTimePaymentProcessor {
    processOneTimePayment(amount: number): string;
}


interface SubscriptionPaymentProcessor {
    processSubscriptionPayment(amount: number): string;
}

class PayPalOneTimePayment implements OneTimePaymentProcessor {
    processOneTimePayment(amount: number): string {
        return `Paypal: One-time payment of ${amount} processed`;
    }
}

class PayPalSubscriptionPayment implements SubscriptionPaymentProcessor {
    processSubscriptionPayment(amount: number): string {
        return `Paypal: Subscription payment of ${amount} processed`;
    }
}

class MonerisOneTimePayment implements OneTimePaymentProcessor {
    processOneTimePayment(amount: number): string {
        return `Moneris: One-time payment of ${amount} processed`;
    }
}

class MonrerisSubscriptionPayment implements SubscriptionPaymentProcessor {
    processSubscriptionPayment(amount: number): string {
        return `Moneris: Subscripton payment of ${amount} processed`;
    }
}

class StripeOneTimePayment implements OneTimePaymentProcessor {
    processOneTimePayment(amount: number): string {
        return `Stripe: One-time payment of ${amount} processed`;
    }
}

class StripeSubscriptionPayment implements SubscriptionPaymentProcessor {
    processSubscriptionPayment(amount: number): string {
        return `Stripe: Subscription payment of ${amount} processed`;
    }
}

// Abstract Factory interface
// This Factory provides methods for creating both one-time and subscription payment processors
interface PaymentFactory {
    creatOneTimePaymentProcessor(): OneTimePaymentProcessor;
    creatSubscriptionPaymentProcessor(): SubscriptionPaymentProcessor;
}

//Implement Concret Factories
// Each factory is responsible for creating one-time and subscription payment procressor for a specific gateway
class PayPalFactory implements PaymentFactory {
    creatOneTimePaymentProcessor(): OneTimePaymentProcessor {
        return new PayPalOneTimePayment();
    }
    creatSubscriptionPaymentProcessor(): SubscriptionPaymentProcessor {
        return new PayPalSubscriptionPayment()
    }
}

class MonerisFactory implements PaymentFactory {
    creatOneTimePaymentProcessor(): OneTimePaymentProcessor {
        return new MonerisOneTimePayment();
    }
    creatSubscriptionPaymentProcessor(): SubscriptionPaymentProcessor {
        return new MonrerisSubscriptionPayment();
    }
}

class StripeFactory implements PaymentFactory {
    creatOneTimePaymentProcessor(): OneTimePaymentProcessor {
        return new StripeOneTimePayment();
    }
    creatSubscriptionPaymentProcessor(): SubscriptionPaymentProcessor {
        return new StripeSubscriptionPayment();
    }
}

// Dynamically choosing the Payment Factory
function getPaymentFactory(gateway: string): PaymentFactory {
    switch (gateway) {
        case 'PayPal':
            return new PayPalFactory();
        case 'Moneris':
            return new MonerisFactory();
        case 'Stripe':
            return new StripeFactory();
        default:
            throw Error('Unsupported payment gateway');
    }
}

const factory1 = getPaymentFactory('Stripe');
console.log(factory1.creatOneTimePaymentProcessor().processOneTimePayment(220));
console.log(factory1.creatSubscriptionPaymentProcessor().processSubscriptionPayment(230));

const factory2 = getPaymentFactory('PayPal');
console.log(factory2.creatOneTimePaymentProcessor().processOneTimePayment(120));
console.log(factory2.creatSubscriptionPaymentProcessor().processSubscriptionPayment(120));

