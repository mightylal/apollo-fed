const { ApolloServer, gql } = require('apollo-server-lambda');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
    extend type Query {
        lead(id: ID!): Lead    
    }
    
    type Lead @key(fields: "id") {
        id: ID!
        itemId: Int
    }
`;

const resolvers = {
    Query: {
        lead(_, {id}) {
            console.log('the lead id', id);
            return leads.find(lead => lead.id === parseInt(id));
        }
    },
    Lead: {
        __resolveReference(object) {
            console.log('the lead object', object);
            return leads.find(lead => lead.id === object.id)
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

const leads = [
    {
        id: 1,
        itemId: 1,
    },
    {
        id: 2,
        itemId: 2,
    },
    {
        id: 3,
        itemId: 3,
    },
];
