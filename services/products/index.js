const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
    extend type Lead @key(fields: "id") {
        id: ID! @external
        products: [Product]    
    }
    
    type Product @key(fields: "leadId") {
        id: ID!
        leadId: Int
        title: String
        price: Int
    }
`;

const resolvers = {
    Lead: {
        __resolveReference(object) {
            return {
                ...object,
                products: products.filter(product => product.leadId === parseInt(object.id)),
            };
        }
    }
};

const server = new ApolloServer({
    schema: buildFederatedSchema([
        {
            typeDefs,
            resolvers,
        },
    ]),
});

server.listen({ port: 4003 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

const products = [
    {
        id: 1,
        leadId: 1,
        title: 'Product One',
        price: 50,
    },
    {
        id: 2,
        leadId: 2,
        title: 'Product Two',
        price: 255,
    },
    {
        id: 3,
        leadId: 3,
        title: 'Product Three',
        price: 87,
    },
];
