const PROTO_PATH = "../proto/order_service.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

var ordersProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();
const d = new Date();
const orders = [
    {
        id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
        username: "Windy Arya",
        paketBelajarName: "Paket Belajar Aktiva",
        total: 500000,
        paymentMethod: "ShopeePay",
        createdAt: d.toISOString(),
        updatedAt: d.toISOString()
    },
    {
        id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
        username: "Arya",
        paketBelajarName: "Paket Belajar Ultima",
        total: 1500000,
        paymentMethod: "ShopeePay",
        createdAt: d.toISOString(),
        updatedAt: d.toISOString()
    }
];

server.addService(ordersProto.OrderService.service, {
    getAll: (_, callback) => {
        callback(null, { orders: orders });
    },

    get: (call, callback) => {
        let order = orders.find(n => n.id == call.request.id);

        if (order) {
            callback(null, order);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },

    insert: (call, callback) => {
        let order = call.request;

        console.log(order);
        
        order.id = uuidv4();
        orders.push(order);
        callback(null, order);
        console.log(orders);
    },

    update: (call, callback) => {
        let existingOrder = orders.find(n => n.id == call.request.id);

        if (existingOrder) {
            existingOrder.paketBelajarName = call.request.paketBelajarName;
            existingOrder.total = call.request.total;
            existingOrder.paymentMethod = call.request.paymentMethod;
            callback(null, existingOrder);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },

    remove: (call, callback) => {
        let existingOrderIndex = orders.findIndex(
            n => n.id == call.request.id
        );

        if (existingOrderIndex != -1) {
            orders.splice(existingOrderIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    }
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
server.start();