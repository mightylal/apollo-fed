const { ApolloServer, gql } = require('apollo-server-lambda');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
    extend type Lead @key(fields: "id") {
        id: ID! @external
        pricing: Pricing
    }
    
    type Pricing {
        total: Int
        accessoriesTotal: Int
    }    
`;

const resolvers = {
    Lead: {
        __resolveReference(object) {
            console.log('the pricing object', object);
            return {
                ...object,
                pricing: {
                    total: 300,
                    accessoriesTotal: 400,
                },
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

exports.handler = server.createHandler();
