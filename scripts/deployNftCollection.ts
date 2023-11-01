import { beginCell, contractAddress, toNano, Cell, Address } from "ton";
import { NetworkProvider } from '@ton-community/blueprint';
// ================================================================= //
import { NftCollection } from "../wrappers/NftCollection";
// ================================================================= //

export async function run(provider: NetworkProvider) {
    const OFFCHAIN_CONTENT_PREFIX = 0x01;
    const string_first = "https://s.getgems.io/nft-staging/c/628f6ab8077060a7a8d52d63/"; // Change to the content URL you prepared
    let newContent = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(string_first).endCell();

    // ===== Parameters =====
    // Replace owner with your address (if you use deeplink)
    let owner = provider.sender().address!;

    let collection = provider.open(await NftCollection.fromInit(owner, newContent, {
        $$type: "RoyaltyParams",
        numerator: 350n, // 350n = 35%
        denominator: 1000n,
        destination: owner,
    }));

    // Do deploy
    await collection.send(provider.sender(), {value: toNano("0.1")}, "Mint");


    await provider.waitForDeploy(collection.address);

    // run methods on `collection`
}