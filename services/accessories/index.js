const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
    extend type Lead @key(fields: "id") {
        id: ID! @external
        accessories: [Accessory]    
    }
    
    type Accessory @key(fields: "leadId") {
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
                accessories: accessories.filter(accessory => accessory.leadId === parseInt(object.id)),
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

server.listen({ port: 4002 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

const accessories = [
    {
        id: 1,
        leadId: 1,
        title: 'Accessory One',
        price: 100,
    },
    {
        id: 2,
        leadId: 1,
        title: 'Accessory Two',
        price: 150,
    },
    {
        id: 3,
        leadId: 2,
        title: 'Accessory Three',
        price: 75,
    },
];
