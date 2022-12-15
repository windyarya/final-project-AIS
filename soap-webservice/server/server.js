const soap = require("soap");
const express = require("express");
const fs = require("fs");

let app = express();

const PORT = 3000;

function resultRandom() {
    let r = Math.floor(Math.random() * 10);
    let country;
    switch (r) {
        case 0: country = "Argentina"; break;
        case 1: country = "France"; break;
        case 2: country = "Morocco"; break;
        case 3: country = "Croatia"; break;
        case 4: country = "England"; break;
        case 5: country = "Netherlands"; break;
        case 6: country = "Portugal"; break;
        case 7: country = "Spain"; break;
        case 8: country = "Qatar"; break;
        case 9: country = "Saudi Arabia"; break;
    
        default:
            break;
    }

    return country;
}

const serviceObject = {
  CityService: {
    CityServiceSoapPort: {
      City: (args) => {
        console.log(args.name);
        let rr= resultRandom();
        return `${rr} ${args.name}`;
      },
    },
    CityServiceSoap12Port: {
      City: (args) => {
        console.log(args.name);
        return `${args.name} will win the World Cup!`;
      },
    },
  },
};

const xml = fs.readFileSync("../service.wsdl", "utf8");

app.get("/", function (req, res) {
  res.send("App is working!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  const WSDL_PATH = "/wsdl";
  soap.listen(app, WSDL_PATH, serviceObject, xml);
  console.log(
    `Go to http://localhost:${PORT}${WSDL_PATH}?wsdl`
  );
});