export const schemas = `#graphql

type Product {
   id:Int ,
   name:String,
   price:Float
}

type Query {
    hello:String
    products:[Product]
    product(id:Int):Product

}

type Mutation {
    update(id:Int,name:String,price:Float) : String
    delete(id:Int) : String
    add(id:Int,name:String,price:Float) : String
}


`;
