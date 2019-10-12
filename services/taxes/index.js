const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
    extend type Lead @key(fields: "id") {
        id: ID! @external
        taxes: [Tax]    
    }
    
    type Tax @key(fields: "leadId") {
        id: ID!
        leadId: Int
        title: String
        amount: Int
    }
`;

const resolvers = {
    Lead: {
        __resolveReference(object) {
            return {
                ...object,
                taxes: taxes.filter(tax => tax.leadId === parseInt(object.id)),
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

server.listen({ port: 4004 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

const taxes = [
    {
        id: 1,
        leadId: 1,
        title: 'Tax One',
        amount: 12,
    },
    {
        id: 2,
        leadId: 1,
        title: 'Tax Two',
        amount: 25,
    },
    {
        id: 3,
        leadId: 1,
        title: 'Tax Three',
        amount: 550,
    },
];
