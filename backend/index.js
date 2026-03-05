const express = require('express');
const app = express();
app.use(express.json());

const users = []; // Тут зберігатимуться юзери

// РЕЄСТРАЦІЯ
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    users.push({ email, password });
    console.log("Users now:", users);
    res.status(201).json({ message: "Успішна реєстрація!" });
});

// АВТОРИЗАЦІЯ (ЛОГІН)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.json({ message: "Ви увійшли!" });
    } else {
        res.status(401).json({ message: "Невірний логін або пароль" });
    }
});

app.get('/', (req, res) => {
    res.send('Сервер працює! Використовуй React-інтерфейс для реєстрації.');
});

app.listen(3111, () => console.log("Сервер: http://localhost:3111"));