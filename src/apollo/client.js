import {createHttpLink} from 'apollo-link-http';
import config from '../config';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';


export const getClient = (type, env) => {
    console.log("env", env)
    if (type === "auth"){
        const httpLinkLogin = createHttpLink({ uri: env === "Prod" ? config.loginApiProd : config.loginApiDev });
        return new ApolloClient({
            link: httpLinkLogin,
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'ignore',
                },
                query: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'all',
                },
            },
            cache: new InMemoryCache()
        });
    }
    const httpLink = createHttpLink({ uri: env === "Prod" ? config.appApiProd : config.appApiDev });
    return new ApolloClient({
        link: httpLink,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'ignore',
            },
            query: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
            },
        },
        cache: new InMemoryCache()
    });
}
