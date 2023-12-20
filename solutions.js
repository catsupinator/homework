//console.log(transactions);
//console.log(customers);

function filter(data, predicate) {
    const newArray = [];
    for(let i in data) {
        if (!predicate(data[i])) {
            newArray.push(i);
        }
    }
    return newArray;
}

function findLast(data, predicate) {
    for (let i = data.length - 1; i >= 0; i--) {
        if (predicate(data[i])) {
            return data[i].amount;
        }
    }
}

function map(data, callback) {
    newArray = [];
    for (let i in data) {
        newArray.push(callback(data[i]));
    }
    return newArray;
}

function pairIf(data1, data2, predicate) {
    const newArray = [];
    for(let i in data1) {
        for (let j in data2) {
            if (predicate(data1[i], data2[j])) {
                newArray.push([data1[i], data2[j]]);
            }
        }
    }
    return newArray;
}

function reduce(data1, reducer, initialValue) {
    let previous = initialValue;
    for(let i in data1) {
        previous = reducer(data1[i], previous);
    }
    return previous;
}

const invalid = filter(transactions, x => 
    (x.amount) && (x.product === "FIG_JAM" || x.product === "FIG_JELLY" || x.product === "SPICY_FIG_JAM" || 
        x.product === "ORANGE_FIG_JELLY")).length;

const duplicates = pairIf(customers, customers, (customer1, customer2) => (customer1.emailAddress === customer2.emailAddress) && 
    (customer1.id !== customer2.id)).length;

const lastOver = findLast(transactions, x => x.amount > 200);

const smallMedLarge = reduce(transactions, (value, acc) => {
    if (value.amount < 25) {
        acc.small.push(value);
    } 
    if ((value.amount >= 25) && (value.amount < 75)) {
        acc.medium.push(value);
    } 
    if (value.amount >= 75) {
        acc.large.push(value);
    }
    return acc;
}, {small: [], medium: [], large: []});

const overTwo = filter(transactions, x => (x.amount <= 200));
const pairOverTwo = pairIf(overTwo, customers, (data1, data2) => (transactions[data1].customerId === data2.id));
const reduceOverTwo = reduce(pairOverTwo, (value, acc) => {
    acc.push(value[1]);
    return acc;
}, []);
const mapOverTwo = map(reduceOverTwo, customer => `${customer.firstName} ${customer.lastName}`);

console.log("Number of invalid transactions: " + invalid);
console.log("Number of duplicate customers: " + duplicates);
console.log("Most recent transaction over $200: $" + lastOver);
console.log("Number of small transactions: " + smallMedLarge.small.length + "\nNumber of medium transactions: " + 
    smallMedLarge.medium.length + "\nNumber of large transactions: " + smallMedLarge.large.length);
console.log(`Customers with transactions over $200:`);
console.log(reduceOverTwo);
console.log("Names of customers with transactions over $200:");
console.log(mapOverTwo);