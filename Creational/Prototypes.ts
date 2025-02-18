// Prototype is a creational design pattern that allows cloning objects,
// even complex ones, without coupling to their specific classes.

interface DocumentPrototype {
    clone(): DocumentPrototype;
    display(): void;
}

class ReportDocument implements DocumentPrototype {
    constructor(public title: string, public content: string) {}

    clone(): DocumentPrototype {
        return new ReportDocument(this.title, this.content);
    }

    display(): void {
        console.log(`Report Document: ${this.title}\nContent: ${this.content}\n`);
    }
}

class InvoiceDocument implements DocumentPrototype {
    constructor(public invoiceNumber: number, public amount: number) {}

    clone(): DocumentPrototype {
        return new InvoiceDocument(this.invoiceNumber, this.amount);
    }

    display(): void {
        console.log(`Invoice #${this.invoiceNumber}\nAmoutn: ${this.amount}\n`);
    }
}

class ContractDocument implements DocumentPrototype {
    constructor(public parties: string[], public terms: string) {}

    clone(): DocumentPrototype {
        return new ContractDocument([...this.parties], this.terms);
    }

    display(): void {
        console.log(`Contract between: ${this.parties.join(" & ")}\nTerms: ${this.terms}\n`);
    }
}

//We can use a Prototype Registry to manage document templates for duplication.

class DocumentRegistry {
    private prototypes: { [key: string]: DocumentPrototype } = {};

    registreDocument(type: string, document: DocumentPrototype) {
        this.prototypes[type]= document;
    }

    createDocument(type: string): DocumentPrototype {
        return this.prototypes[type].clone() ?? null;
    }
}

const registry = new DocumentRegistry();
registry.registreDocument('report', new ReportDocument('Monthly Sales Report','Sales data for the month...'));
registry.registreDocument('invoice', new InvoiceDocument(1234,5000));
registry.registreDocument('contract', new ContractDocument(['John', 'Marta'],'John will lease his apartment to Marta'));


const cloneReport = registry.createDocument('report');
const cloneInvoice = registry.createDocument('invoice');
const cloneContract = registry.createDocument('contract');

console.log('\nProtorype Registry:');
cloneReport?.display();
cloneInvoice?.display();
cloneContract?.display();