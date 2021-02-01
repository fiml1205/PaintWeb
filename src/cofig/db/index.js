const mongoose = require('mongoose');

async function connect () {
    try{
        await mongoose.connect('mongodb://localhost:27017/app_paint', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
        });
        console.log('Success')
    } catch (error) {
        console.log('failt')
    }

} 

module.exports = {connect}