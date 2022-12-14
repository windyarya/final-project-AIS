const PROTO_PATH = "../proto/order_service.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const OrderService = grpc.loadPackageDefinition(packageDefinition).OrderService;
const client = new OrderService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

module.exports = client;