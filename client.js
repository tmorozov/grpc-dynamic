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

const client = new one_proto.ServiceOne(
    'localhost:50500',
    grpc.credentials.createInsecure()
);


client.action({
    name: 'Client dynamic'
}, (err, response) => {
    console.log(response.message, response.age)
});
