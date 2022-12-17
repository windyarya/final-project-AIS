const soap = require("soap");
const express = require("express");
const fs = require("fs");

let app = express();

const PORT = 3000;

function resultRandom() {
    let r = Math.floor(Math.random() * 10);
    let country;
    switch (r) {
        case 0: country = "Indonesia"; break;
        case 1: country = "Perancis"; break;
        case 2: country = "Maroko"; break;
        case 3: country = "Malaysia"; break;
        case 4: country = "Inggris"; break;
        case 5: country = "Belanda"; break;
        case 6: country = "Brazil"; break;
        case 7: country = "Singapore"; break;
        case 8: country = "Australia"; break;
        case 9: country = "Thailand"; break;
    
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
        return `${args.name} ${rr}`;
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