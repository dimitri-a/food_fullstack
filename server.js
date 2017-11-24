const express = require("express");
const fs = require("fs");
const sqlite = require("sql.js");

const filebuffer = fs.readFileSync("db/usda-nnd.sqlite3");

const db = new sqlite.Database(filebuffer);

const app = express();
const axios = require('axios');

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const COLUMNS = [
  "carbohydrate_g",
  "protein_g",
  "fa_sat_g",
  "fa_mono_g",
  "fa_poly_g",
  "kcal",
  "description"
];

app.get("/api/food", (req, res) => {
    let url ='https://quoteapi.com/api/v4/symbols/tls.asx?appID=af5f4d73c1a54a33&averages=1&liveness=delayed';
    axios.get(url).then(function(response){
        //todo remove
        debugger;
        
        console.log('response.data.quote.open=',response.data.quote.open);

        res.json(response.data.quote.open)

    })

});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
