import bodyParser from "body-parser"
import {db} from "./utils/db";
import {APP_PORT} from "./config";


let app = require('express')()

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
}));
app.use(bodyParser.json({
    limit: '10mb'
}));


const routes = require('./routes/index');
routes(app);

db.authenticate().then(() => {
    //connection to the mysql db is successful
    //start express app
    console.clear();
    console.log('successfully connected to the mysql db, starting express app...')
    console.log();

    app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`))

}).catch(error => {
    //connection to the mysql db failed
    console.log('error: ', error);
})
