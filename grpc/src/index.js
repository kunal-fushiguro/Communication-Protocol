import grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const PROTO_Path = "./problems.proto";
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_Path, options);
const problemsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let problems = [
  {
    id: "0",
    title: "Polyfill of Array.map",
    description: "Some description",
  },
  {
    id: "1",
    title: "Polyfill of Promise.all()",
    description: "Some description",
  },
];

server.addService(problemsProto.ProblemService.service, {
  getAllProblems: (_, callback) => {
    callback(null, { problems: problems });
  },
  UpdateProblem: (call, callback) => {
    const id = call.request.id;
    problems = problems.map((p) => {
      if (id === p.id) {
        return { ...p, ...call.request };
      }
      return p;
    });

    const updatedProblem = problems.find((p) => p.id == id);
    callback(null, { ...updatedProblem });
  },
});

server.bindAsync(
  "127.0.0.1:5000",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    console.log(`GRPC Server started ${port} `);
    server.start();
  }
);
