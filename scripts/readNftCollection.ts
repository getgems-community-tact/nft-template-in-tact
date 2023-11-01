import { beginCell, contractAddress, toNano, Cell, Address } from "ton";
import { NetworkProvider } from '@ton-community/blueprint';
// ================================================================= //
import { NftCollection } from "../wrappers/NftCollection";
// ================================================================= //

export async function run(provider: NetworkProvider) {
    let collection_address = Address.parse("YOUR Collection ADDRESS");

    let collection = provider.open(NftCollection.fromAddress(collection_address));

    const nft_index = 0n;
    let address_by_index = await collection.getGetNftAddressByIndex(nft_index);

    console.log("NFT ID[" + nft_index + "]: " + address_by_index);
}