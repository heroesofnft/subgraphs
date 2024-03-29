import {
  TokenSaleEvent as TokenSaleEventEvent,
  TokenSaleProgramEvent as TokenSaleProgramEventEvent,
  Transfer as TransferEvent,
  TransferSaleTotalAmountEvent as TransferSaleTotalAmountEventEvent,
  WhiteListSaveEvent as WhiteListSaveEventEvent
} from "../generated/LandToken/LandToken"
import {
  Nft,
  TokenSaleHistory,
  TokenSaleProgram,
  TransferHistory,
  TransferSaleTotalAmount,
  WhiteListProgram} from "../generated/schema"
  import {BigInt} from "@graphprotocol/graph-ts";

export function handleTokenSaleEvent(event: TokenSaleEventEvent): void {
    const tokenSaleHistory = new TokenSaleHistory(event.block.hash.toString());
    tokenSaleHistory.tierID = event.params.tierId;
    tokenSaleHistory.price = event.params.price;
    tokenSaleHistory.purchasedPrice = event.params.purchasedPrice;
    tokenSaleHistory.tokenId = event.params.tokenId;
    tokenSaleHistory.seller = event.params.seller.toString();
    tokenSaleHistory.createdAtTimestamp = event.block.timestamp;
    tokenSaleHistory.blockNumber = event.block.number
    tokenSaleHistory.blockTimestamp = event.block.timestamp
    tokenSaleHistory.transactionHash = event.transaction.hash
    tokenSaleHistory.save();

    const tokenSaleProgramExist = TokenSaleProgram.load(event.params.tierId.toString());
    if(tokenSaleProgramExist) {
      tokenSaleProgramExist.remainingAmount = tokenSaleProgramExist.remainingAmount.minus(BigInt.fromU32(1));
      tokenSaleProgramExist.save();
    }
}

export function handleTokenSaleProgramEvent(
  event: TokenSaleProgramEventEvent
): void {
  const tokenSaleProgram = new TokenSaleProgram(event.params.tierId.toString());
  tokenSaleProgram.tierID = event.params.tierId;
  tokenSaleProgram.count = event.params.count;
  tokenSaleProgram.remainingAmount =  event.params.remainingAmount;
  tokenSaleProgram.name = event.params.name.toString();
  tokenSaleProgram.price = event.params.price;
  tokenSaleProgram.startDate = event.params.startDate;
  tokenSaleProgram.endDate = event.params.endDate;
  tokenSaleProgram.saleEnabled = event.params.saleEnabled;
  tokenSaleProgram.tokenIdRange = event.params.tokenIdRange.toString();
  tokenSaleProgram.whiteListEnabled = event.params.whiteListEnabled;
  tokenSaleProgram.savedAtTimestamp = event.block.timestamp;
  tokenSaleProgram.blockNumber = event.block.number
  tokenSaleProgram.blockTimestamp = event.block.timestamp
  tokenSaleProgram.transactionHash = event.transaction.hash
  tokenSaleProgram.save();
}

export function handleTransfer(event: TransferEvent): void {
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
      nft.tokenURI = `https://land.heroesofnft.com/token/${nft.tokenID.toString()}`;
      if((event.params.tokenId.equals(BigInt.fromI32(0))) && (event.params.tokenId.equals(BigInt.fromI32(24)) || event.params.tokenId.gt(BigInt.fromI32(24)))){
        nft.tierID = BigInt.fromI32(0);
      }
      else if((event.params.tokenId.equals(BigInt.fromI32(25)) || event.params.tokenId.gt(BigInt.fromI32(25))) && (event.params.tokenId.equals(BigInt.fromI32(274)) || event.params.tokenId.lt(BigInt.fromI32(274)))){
        nft.tierID = BigInt.fromI32(1);
      }
      else if((event.params.tokenId.equals(BigInt.fromI32(275)) || event.params.tokenId.gt(BigInt.fromI32(275))) && (event.params.tokenId.equals(BigInt.fromI32(1024)) || event.params.tokenId.lt(BigInt.fromI32(1024)))){
        nft.tierID = BigInt.fromI32(2);
      }
      else if((event.params.tokenId.equals(BigInt.fromI32(1025)) || event.params.tokenId.gt(BigInt.fromI32(1025))) && (event.params.tokenId.equals(BigInt.fromI32(2274)) || event.params.tokenId.lt(BigInt.fromI32(2274)))){
        nft.tierID = BigInt.fromI32(3);
      }
      else if((event.params.tokenId.equals(BigInt.fromI32(2275)) || event.params.tokenId.gt(BigInt.fromI32(2275))) && (event.params.tokenId.equals(BigInt.fromI32(4024)) || event.params.tokenId.lt(BigInt.fromI32(4024)))){
        nft.tierID = BigInt.fromI32(4);
      }
      else nft.tierID = BigInt.fromI32(0);
      nft.save();
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
  }
}

export function handleTransferSaleTotalAmountEvent(
  event: TransferSaleTotalAmountEventEvent
): void {
  const transferSaleTotalAmount = new TransferSaleTotalAmount(event.block.hash.toString());
  transferSaleTotalAmount.tokenAmount = event.params.tokenAmount;
  transferSaleTotalAmount.transferAddress = event.params.transferAddress.toString();
  transferSaleTotalAmount.save();
}

export function handleWhiteListSaveEvent(event: WhiteListSaveEventEvent): void {
    const whiteListProgramId = event.params.whiteListProgramId.toString();
    const whiteListProgram = new WhiteListProgram(whiteListProgramId);
    whiteListProgram.tierId = event.params.tierId;
    whiteListProgram.whiteList = event.params.whiteList.toString();
    whiteListProgram.whiteListDiscountRatio = event.params.whiteListDiscountRatio;
    whiteListProgram.blockNumber = event.block.number
    whiteListProgram.blockTimestamp = event.block.timestamp
    whiteListProgram.transactionHash = event.transaction.hash
    whiteListProgram.save();
}
