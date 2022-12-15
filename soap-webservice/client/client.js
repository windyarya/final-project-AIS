import soap from "soap";

const PORT = 3000;
const url = `http://localhost:${PORT}/wsdl?wsdl`;

let name = "will win the World Cup!"

let args = { name: name };

soap.createClient(url, (err, client) => {
  if (err) {
    throw err;
  }
  client.City(args, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
});