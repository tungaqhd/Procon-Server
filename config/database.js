const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/procon-server', {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})