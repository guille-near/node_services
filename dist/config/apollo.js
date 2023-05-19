"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryGraphql = void 0;
const apollo_client_1 = require("apollo-client");
const apollo_link_http_1 = require("apollo-link-http");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const queryGraphql = (query, variables) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let client = new apollo_client_1.ApolloClient({
            link: (0, apollo_link_http_1.createHttpLink)({
                uri: process.env.GRAPH_URL,
                headers: {
                    "mb-api-key": "anon",
                    "Content-Type": "application/json",
                },
            }),
            cache: new apollo_cache_inmemory_1.InMemoryCache(),
        });
        if (!variables) {
            let result = yield client.query({
                query,
            });
            return result.data;
        }
        else {
            let result = yield client.query({
                query,
                variables,
            });
            return result.data;
        }
    }
    catch (error) {
        return null;
    }
});
exports.queryGraphql = queryGraphql;
