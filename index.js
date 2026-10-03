const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Chats = require('./models/Chats');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

main()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/backend');
    console.log('Database Connected');
}

app.get('/chats', (req, res) => {
    res.render('newchat.ejs');
});

app.post('/chats/add', async (req, res) => {
    try {
        const { to, from, msg } = req.body;

        await Chats.create({
            to: to,
            from: from,
            msg: msg,
            created_at: new Date()
        });

        res.redirect('/chats');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error saving chat');
    }

    
});

app.get('/chats/allchats', async (req, res) => {
    let chats = await Chats.find();

    res.render('allchats.ejs', { chats });
});