const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello from Express Server!');
});

app.get('/add', (req, res) => {
    const num1 = parseInt(req.query.num1);
    const num2 = parseInt(req.query.num2);

     if (isNaN(num1) || isNaN(num2)) {
        return res.send('Please provide valid numbers');
    }

    res.json({ result: num1 + num2 });
});


app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;

    if (isNaN(num1) || isNaN(num2)) {
        return res.json({ error: 'Invalid input' });
    }

     res.json({ result: Number(num1) + Number(num2) });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

