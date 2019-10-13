const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
    serviceList: [
        { name: "leads", url: "http://localhost:4001/graphql" },
        { name: 'accessories', url: 'http://localhost:4002/graphql' },
        { name: 'products', url: 'http://localhost:4003/graphql' },
        { name: 'taxes', url: 'http://localhost:4004/graphql' },
        { name: 'pricing', url: 'http://localhost:4005/graphql' },
    ]
});

(async () => {
    const { schema, executor } = await gateway.load();

    const server = new ApolloServer({ schema, executor });

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
})();
