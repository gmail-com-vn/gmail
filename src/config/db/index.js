const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://vanduc10101010:20194184@gmail.tspti01.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure');
    }

}


module.exports = { connect }