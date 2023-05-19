import { queryGraphql } from "../config/apollo";
import gql from "graphql-tag";
const lib = require("lib")({ token: process.env.TOKEN_DISCORD });

const botDiscordService = async (wallet: string, discordId: string) => {
  try {
    let query = gql`
      query MyQuery($wallet: String!, $contract_id: String!) {
        mb_views_nft_owned_tokens(where: { owner: { _eq: $wallet }, nft_contract_id: { _eq: $contract_id } }) {
          description
          owner
          price
          title
          media
          reference_blob
          token_id
          media_hash
        }
      }
    `;

    let variables = { wallet: wallet, contract_id: process.env.CONTRACT_GRAPH };

    const resp = await queryGraphql(query, variables);

    const nfts = resp.mb_views_nft_owned_tokens;

    if (nfts.length === 0) return false;

    for (let nft of nfts) {
      const refDiscord = nft.reference_blob.extra.find((element: any) => element.trait_type.toLowerCase() === "discord");

      try {
        await lib.discord.guilds["@0.1.0"].members.roles.update({
          guild_id: process.env.GUILD_ID,
          user_id: discordId,
          role_id: refDiscord.value,
        });
      } catch (error) {
        console.log(error);
        continue;
      }
    }

    return true;
  } catch (err) {
    throw new Error(`Failed bot discord service, ${err}`);
  }
};

export { botDiscordService };
