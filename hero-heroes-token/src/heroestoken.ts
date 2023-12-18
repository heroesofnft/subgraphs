import {
  Nft,
  TransferHistory,
  Rent,
  NftAggregation,
  Owner,
  OwnerAggregation
} from "../generated/schema";
import { Transfer, UpdateUser } from "../generated/HeroesToken/HeroesToken";
import {
  Address,
  BigInt,
  BigDecimal,
  Bytes,
  dataSource,
  ethereum,
  log
} from "@graphprotocol/graph-ts";

// import fetch from "node-fetch";

export function handleTransferERC721(event: Transfer): void {
  // log.info("handleTransferERC721: {}", [event.params.tokenId.toString()]);
  if (event.params && event.params.tokenId && event.address) {
    const nftExist = Nft.load(event.params.tokenId.toString() + "-" + event.address.toHex());
    if (nftExist) {
      nftExist.owner = event.params.to;
      nftExist.createdAtTimestamp = event.block.timestamp;
      nftExist.save();
    } else {
      const nft = new Nft(event.params.tokenId.toString() + "-" + event.address.toHex());
      nft.tokenID = event.params.tokenId;
      nft.tokenContract = event.address;
      nft.owner = event.params.to;
      nft.createdAtTimestamp = event.block.timestamp;

      nft.tokenURI = `https://character.heroesofnft.com/token/${nft.tokenID.toString()}`;

      //const erc721 = Erc721__factory.connect(event.address.toString(), api);
      //const tokenURI = await erc721.tokenURI(event.args.tokenId.toString());

      // nft.tokenURI = `https://character.heroesofnft.com/token/${nft.tokenID.toString()}`;
      // const response = await fetch(nft.tokenURI);

      // const data = await response.json();
      // // logger.info("NFT metadata: " + JSON.stringify(data));
      // nft.metadata = data;

      nft.save();

      // Save the Nft Aggregation
      const nftAggregationExist = NftAggregation.load(event.address.toHex());
      if (nftAggregationExist) {
        nftAggregationExist.count = nftAggregationExist.count.plus(BigInt.fromI32(1));
        nftAggregationExist.save();
      } else {
        const nftAggregation = new NftAggregation(event.address.toHex());
        nftAggregation.count = BigInt.fromI32(1);
        nftAggregation.save();
      }
    }

    // History of transfer
    const transferHistory = new TransferHistory(
      event.params.tokenId.toString() +
        "-" +
        event.address.toHex() +
        "-" +
        event.block.timestamp.toString()
    );
    transferHistory.tokenID = event.params.tokenId;
    transferHistory.tokenContract = event.address;
    transferHistory.from = event.params.from;
    transferHistory.to = event.params.to;
    transferHistory.createdAtTimestamp = event.block.timestamp;
    transferHistory.save();

    // Owner Aggregation
    const ownerAggregationExist = OwnerAggregation.load(event.address.toHex());
    if (ownerAggregationExist) {
      const ownerExist = Owner.load(event.params.to.toHex());
      if (!ownerExist) {
        ownerAggregationExist.uniqueOwners = ownerAggregationExist.uniqueOwners.plus(
          BigInt.fromI32(1)
        );
        ownerAggregationExist.save();
      }
    } else {
      const ownerAggregation = new OwnerAggregation(event.address.toHex());
      ownerAggregation.uniqueOwners = BigInt.fromI32(1);
      ownerAggregation.save();
    }

    // Owner Entity
    const ownerExist = Owner.load(event.params.to.toHex());
    if (ownerExist) {
      ownerExist.count = ownerExist.count.plus(BigInt.fromI32(1));
      ownerExist.save();
    } else {
      const owner = new Owner(event.params.to.toHex());
      owner.count = BigInt.fromI32(1);
      owner.save();
    }

    const ownerExistFrom = Owner.load(event.params.from.toHex());
    if (ownerExistFrom) {
      ownerExistFrom.count = ownerExistFrom.count.minus(BigInt.fromI32(1));
      ownerExistFrom.save();
    } else {
      const owner = new Owner(event.params.from.toHex());
      owner.count = BigInt.fromI32(1);
      owner.save();
    }
  }
}

export function handleUpdateUser(event: UpdateUser): void {
  if (event.params && event.params.tokenId && event.address) {
    const rent = Rent.load(event.params.tokenId.toString() + "-" + event.address.toHex());
    if (rent) {
      rent.user = event.params.user;
      rent.expires = event.block.timestamp;
      rent.createdAtTimestamp = event.block.timestamp;
      rent.save();
    } else {
      const rent = new Rent(event.params.tokenId.toString() + "-" + event.address.toHex());
      rent.tokenID = event.params.tokenId;
      rent.user = event.params.user;
      rent.expires = event.params.expires;
      rent.createdAtTimestamp = event.block.timestamp;

      rent.save();
    }
  }
}
