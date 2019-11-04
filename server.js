const grpc = require('grpc');

const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './one.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const one_proto = grpc.loadPackageDefinition(packageDefinition);

function action(call, cb) {
    cb(null, {
        message: `Server dynamic ${call.request.name}`,
        age: 12
    });
}

const server = new grpc.Server();
server.addService(one_proto.ServiceOne.service, { action });
server.bind('localhost:50500', grpc.ServerCredentials.createInsecure());
server.start();

