const express = require('express');
const { v4: uuidV4 } = require("uuid")

const app = express();

app.use(express.json());

const customers = [];

function VerifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ error: "Customer not found" })
    }

    request.customer = customer;

    return next();
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);

    return balance;
}

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );

    if (customerAlreadyExists) {
        return response.status(400).json({ error: "Customer already exists" });
    }

    const customer = {
        id: uuidV4(),
        cpf,
        name,
        statement: []
    }

    customers.push(customer);

    return response.status(201).json(customer);
});

app.get("/statement", VerifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer.statement);
});

app.post("/deposit", VerifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { description, amount } = request.body;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).json(statementOperation);
});

app.post("/withdraw", VerifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { amount } = request.body;

    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return response.status(400).json({ error: "Insufficient founds" });
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).json(statementOperation);
});

app.get("/statement/date", VerifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter((statement) =>
        statement.created_at.toDateString() ===
        new Date(dateFormat).toDateString()
    );

    return response.json(statement);
});

app.put("/account", VerifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { name } = request.body;

    customer.name = name;

    return response.status(200).send();
});


app.get("/account", VerifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer);
});

app.delete("/account", VerifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    const index = customers.indexOf(customer); 

    customers.splice(index, 1);

    return response.status(204).send();
});

app.get("/balance", VerifyIfExistsAccountCPF, (request, response) => {
    const {customer} = request;

    const balance = getBalance(customer.statement);

    const result = {
        customer: {
            id: customer.id,
            name: customer.name
        },
        balance
    }

    return response.json(result);
});

app.listen(3333);