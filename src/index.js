const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const customers = [];

app.use(express.json());


//  Middleware
function verifyAccountExists(req, res, next) {
    const { cpf } = req.headers;

    const customer = customers.find(
        (customer) => customer.cpf === cpf    
    );
    
    if (!customer){
        return res.status(400).json({
            error: 'Customer not found!'
        });
    }

    req.customer = customer;

    return next();
}


function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit'){
            return acc + operation.amount;
        }else {
            return acc - operation.amount;   
        }
    }, 0);

    return balance;
}


app.post('/account', (req, res) => {
    const { cpf, name } = req.body;

    const customerExists = customers.some(
        (customer) => customer.cpf === cpf
    );
    
    if (customerExists){
        return res.status(400).json({
            error: 'Customer already exists!'
        });
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return res.status(201).send();
});


app.get('/statement', verifyAccountExists, (req, res) => {
    const { customer } = req;

    return res.json(customer.statement);
});


app.post('/deposit', verifyAccountExists, (req, res) => {
    const { customer } = req;
    const { description, amount } = req.body;
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    };

    customer.statement.push(statementOperation);

    return res.status(201).send();
});


app.post('/withdraw', verifyAccountExists, (req, res) => {
    const { customer } = req;
    const { amount } = req.body;
    const statementOperation = {
        amount,
        created_at: new Date(),
        type: 'debit'
    };

    customer.statement.push(statementOperation);

    return res.status(201).send();
});


app.get('/statement/:date', verifyAccountExists, (req, res) => {
    const { customer } = req;
    const { date } = req.query;

    const dateFormat = new Date(date + ' 00:00');

    const statements = customer.statement.filter(
        (statements) => statements.created_at.toDateString() === new Date(dateFormat).toDateString()
    );

    return res.json(statements);
});


app.put('/account', verifyAccountExists, (req, res) => {
    const { name } = req.body;
    const { customer } = req;

    customer.name = name;

    return res.status(201).send();
});


app.get('/account', verifyAccountExists, (req, res) => {
    const { customer } = req;

    return res.json(customer);
})


app.delete('/account', verifyAccountExists, (req, res) => {
    const { customer } = req;

    customers.splice(customer, 1);

    return res.status(200).json(
        customers
    );
})


app.get('/balance', verifyAccountExists, (req, res) => {
    const { customer } = req;

    const balance = getBalance(customer.statement);

    return res.json(balance);
});



app.listen(3333, () => {
    console.log('Executando');
});