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
exports.botDiscordService = void 0;
const graphql_request_1 = require("graphql-request");
const apollo_1 = require("../config/apollo");
const botDiscordService = (wallet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = (0, graphql_request_1.gql) `
      query MyQuery($wallet: String!, $contract_id: String!) {
        mb_views_nft_owned_tokens(where: { owner: { _eq: $wallet }, nft_contract_id: { _eq: $contract_id } }) {
          base_uri
          burned_receipt_id
          burned_timestamp
          copies
          currency
          description
          nft_contract_is_mintbase
          nft_contract_name
          nft_contract_owner_id
          nft_contract_reference
          owner
          price
          title
          token_id
          expires_at
          extra
          issued_at
          last_transfer_receipt_id
          last_transfer_timestamp
          media
          market_id
          metadata_id
          mint_memo
          minted_receipt_id
          minter
          minted_timestamp
          metadata_content_flag
          media_hash
          reference
          reference_blob
          reference_hash
        }
      }
    `;
        let variables = { wallet: wallet, contract_id: process.env.CONTRACT_GRAPH };
        const resp = yield (0, apollo_1.queryGraphql)(query, variables);
        console.log(resp);
        if (!resp) {
            throw new Error(`Internal error swap preview.`);
        }
        return resp;
    }
    catch (err) {
        throw new Error(`Failed bot discord service, ${err}`);
    }
});
exports.botDiscordService = botDiscordService;
