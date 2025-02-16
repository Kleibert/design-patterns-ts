// Singleton is a creational design pattern that lets you ensure that a class has only one instance, 
// while providing a global access point to this instance.
export class Singleton {
    private static instance: Singleton;
    private constructor() { }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public someBusinessLogic() {
        console.log('Singleton');
    }
    public getSomeData(data: string) {
        console.log('Singleton data:', data);
    }
}

function clientCode() {
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if (s1 === s2) {
        console.log('Singleton works, both variables contain the same instance.');
        s1.getSomeData('data s1');
        s2.getSomeData('data S2');
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode();