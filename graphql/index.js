// import express from "express";
// import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schemas } from "./schema/schema.js";

const PORT = 3000;

let products = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 200 },
  { id: 3, name: "Product C", price: 300 },
];

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers: {
    Query: {
      hello: () => "hello_world",
      products: () => products,
      product: (_, args) => {
        return products.find((product) => product.id == args.id);
      },
    },
    Mutation: {
      add: (_, args) => {
        const obj = {
          id: args.id,
          name: args.name,
          price: args.price,
        };

        products = [...products, obj];

        return "New Product added";
      },
      update: (_, args) => {
        products = products.map((product) => {
          if (product.id == args.id) {
            return {
              id: product.id,
              name: args.name,
              price: args.price,
            };
          }
          return product;
        });

        return "Product Updated";
      },
      delete: (_, args) => {
        products = products.filter((product) => product.id != args.id);
        return "product deleted";
      },
    },
  },
});

startStandaloneServer(server, { listen: { port: PORT } })
  .then(() => {
    console.log(`Apollo Server Started on PORT ${PORT}`);
  })
  .catch(() => {
    console.log(`Something went Wrong while starting a server `);
  });

// const app = express();
//
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors({ credentials: true, origin: "*" }));

// app.get("/", (_, res) => {
//   res.json({
//     success: true,
//     messgae: "Server is running",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server Started on PORT ${PORT}`);
// });
