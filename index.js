const { ApolloServer } = require("apollo-server-lambda");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
    serviceList: [
        { name: "leads", url: "https://b5a30vxpkj.execute-api.us-west-2.amazonaws.com/dev/graphql" },
        { name: 'accessories', url: 'https://lwbpylxp41.execute-api.us-west-2.amazonaws.com/dev/graphql' },
        { name: 'products', url: 'https://j223udf321.execute-api.us-west-2.amazonaws.com/dev/graphql' },
        { name: 'taxes', url: 'https://xgbhw089p3.execute-api.us-west-2.amazonaws.com/dev/graphql' },
        { name: 'pricing', url: 'https://ide4v4tyw8.execute-api.us-west-2.amazonaws.com/dev/graphql' },
    ]
});

const createHandler = async () => {
    const {schema, executor} = await gateway.load();

    const server = new ApolloServer( {schema, executor} );

    return server.createHandler();
};

exports.handler = (event, context, callback) => {
    createHandler().then(handler => handler(event, context, callback));
};
