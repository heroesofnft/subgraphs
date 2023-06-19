import { Nft, Ask, ReserveAuction, Offer, PriceHistory } from "../generated/schema";
import {
  AskCreated,
  AskPriceUpdated,
  AskCanceled,
  AskFilled
} from "../generated/AsksV1_1/AsksV1_1";
import {
  AuctionCreated,
  AuctionBid,
  AuctionCanceled,
  AuctionReservePriceUpdated,
  AuctionEnded
} from "../generated/ReserveAuctionCoreErc20/ReserveAuctionCoreErc20";
import {
  OfferCreated,
  OfferCanceled,
  OfferUpdated,
  OfferFilled
} from "../generated/OffersV1/OffersV1";
import {
  Address,
  BigInt,
  BigDecimal,
  Bytes,
  dataSource,
  ethereum,
  store,
  log
} from "@graphprotocol/graph-ts";

// ASK HANDLERS
export function handleAskCreated(event: AskCreated): void {
  // log.info("handleAskCreated: {}", [event.params.tokenId.toString()]);
  if (event.params && event.params.tokenId && event.address && event.params.ask) {
    const ask = new Ask(event.params.tokenId.toString() + "-" + event.params.tokenContract.toHex());
    ask.tokenID = event.params.tokenId;
    ask.tokenContract = event.params.tokenContract;
    ask.seller = event.params.ask.seller;
    ask.sellerFundsRecipient = event.params.ask.sellerFundsRecipient;
    ask.askCurrency = event.params.ask.askCurrency;
    ask.askPrice = event.params.ask.askPrice;
    ask.createdAtTimestamp = event.block.timestamp;
    ask.save();
  }
}

export function handleAskPriceUpdated(event: AskPriceUpdated): void {
  if (event.params && event.params.tokenId && event.address && event.params.ask) {
    const ask = Ask.load(
      event.params.tokenId.toString() + "-" + event.params.tokenContract.toHex()
    );
    if (ask) {
      ask.askPrice = event.params.ask.askPrice;
      ask.askCurrency = event.params.ask.askCurrency;
      ask.save();
    }
  }
}

export function handleAskCanceled(event: AskCanceled): void {
  if (event.params && event.params.tokenId && event.address) {
    const ask = Ask.load(
      event.params.tokenId.toString() + "-" + event.params.tokenContract.toHex()
    );
    if (ask) {
      store.remove("Ask", ask.id);
    }
  }
}

export function handleAskFilled(event: AskFilled): void {
  if (event.params && event.params.tokenId && event.address) {
    const ask = Ask.load(
      event.params.tokenId.toString() + "-" + event.params.tokenContract.toHex()
    );
    if (ask) {
      store.remove("Ask", ask.id);

      // Adding price to PriceHistory
      const priceHistory = new PriceHistory(
        event.params.tokenId.toString() +
          "-" +
          event.params.tokenContract.toHex() +
          "-" +
          event.block.timestamp.toString()
      );
      priceHistory.tokenID = event.params.tokenId;
      priceHistory.tokenContract = event.params.tokenContract;
      priceHistory.seller = event.params.ask.seller;
      priceHistory.price = event.params.ask.askPrice;
      priceHistory.currency = event.params.ask.askCurrency;
      priceHistory.createdAtTimestamp = event.block.timestamp;
      priceHistory.save();
    }
  }
}

// AUCTION HANDLERS

export function handleAuctionCreated(event: AuctionCreated): void {
  if (event.params && event.params.tokenId && event.address) {
    const reserveAuction = new ReserveAuction(
      event.params.tokenId.toString() + "-" + event.params.tokenContract.toHex()
    );
    reserveAuction.tokenID = event.params.tokenId;
    reserveAuction.tokenContract = event.params.tokenContract;
    reserveAuction.seller = event.params.auction.seller;
    reserveAuction.sellerFundsRecipient = event.params.auction.sellerFundsRecipient;
    reserveAuction.currency = event.params.auction.currency;
    reserveAuction.reservePrice = event.params.auction.reservePrice;
    reserveAuction.duration = event.params.auction.duration;
    reserveAuction.startTime = event.params.auction.startTime;
    reserveAuction.createdAtTimestamp = event.block.timestamp;
    reserveAuction.save();
  }
}

export function handleAuctionReservePriceUpdated(event: AuctionReservePriceUpdated): void {
  if (event.params && event.params.tokenId && event.address) {
    const reserveAuction = ReserveAuction.load(
      event.params.tokenId.toString() + "-" + event.params.tokenContract.toHex()
    );
    if (reserveAuction) {
      reserveAuction.reservePrice = event.params.auction.reservePrice;
      reserveAuction.save();
    }
  }
}

export function handleAuctionBid(event: AuctionBid): void {
  if (event.params && event.params.tokenId && event.address) {
    const reserveAuction = ReserveAuction.load(
      event.params.tokenId.toString() + "-" + event.params.tokenContract.toHex()
    );
    if (reserveAuction) {
      reserveAuction.duration = event.params.auction.duration;
      reserveAuction.highestBid = event.params.auction.highestBid;
      reserveAuction.highestBidder = event.params.auction.highestBidder;
      reserveAuction.firstBidTime = event.params.auction.firstBidTime;
      reserveAuction.updatedAtTimestamp = event.block.timestamp;
      reserveAuction.save();
    }
  }
}

export function handleAuctionCanceled(event: AuctionCanceled): void {
  if (event.params && event.params.tokenId && event.address) {
    const reserveAuction = ReserveAuction.load(
      event.params.tokenId.toString() + "-" + event.params.tokenContract.toHex()
    );
    if (reserveAuction) {
      store.remove("ReserveAuction", reserveAuction.id);
    }
  }
}

export function handleAuctionEnded(event: AuctionEnded): void {
  if (event.params && event.params.tokenId && event.address) {
    const reserveAuction = ReserveAuction.load(
      event.params.tokenId.toString() + "-" + event.params.tokenContract.toHex()
    );
    if (reserveAuction) {
      store.remove("ReserveAuction", reserveAuction.id);

      // Adding price to PriceHistory
      const priceHistory = new PriceHistory(
        event.params.tokenId.toString() +
          "-" +
          event.params.tokenContract.toHex() +
          "-" +
          event.block.timestamp.toString()
      );

      priceHistory.tokenID = event.params.tokenId;
      priceHistory.tokenContract = event.params.tokenContract;
      priceHistory.seller = event.params.auction.seller;
      priceHistory.price = event.params.auction.highestBid;
      priceHistory.currency = event.params.auction.currency;
      priceHistory.createdAtTimestamp = event.block.timestamp;
      priceHistory.save();
    }
  }
}

// OFFER HANDLERS

export function handleOfferCreated(event: OfferCreated): void {
  if (event.params && event.params.tokenId && event.address) {
    const offer = new Offer(event.params.id.toString());
    offer.tokenID = event.params.tokenId;
    offer.tokenContract = event.params.tokenContract;
    offer.currency = event.params.offer.currency;
    offer.offerPrice = event.params.offer.amount;
    offer.maker = event.params.offer.maker;
    offer.findersFeeBps = event.params.offer.findersFeeBps;
    offer.createdAtTimestamp = event.block.timestamp;
    offer.save();
  }
}

export function handleOfferUpdated(event: OfferUpdated): void {
  if (event.params && event.params.tokenId && event.address) {
    const offer = Offer.load(event.params.id.toString());
    if (offer) {
      offer.currency = event.params.offer.currency;
      offer.offerPrice = event.params.offer.amount;
      offer.save();
    }
  }
}

export function handleOfferCanceled(event: OfferCanceled): void {
  if (event.params && event.params.tokenId && event.address) {
    const offer = Offer.load(event.params.id.toString());
    if (offer) {
      store.remove("Offer", offer.id);
    }
  }
}

export function handleOfferFilled(event: OfferFilled): void {
  if (event.params && event.params.tokenId && event.address) {
    const offer = Offer.load(event.params.id.toString());
    if (offer) {
      store.remove("Offer", offer.id);

      // // Adding price to PriceHistory
      // const priceHistory = new PriceHistory(
      //   event.params.tokenId.toString() +
      //     "-" +
      //     event.params.tokenContract.toHex() +
      //     "-" +
      //     event.block.timestamp.toString()
      // );
      // priceHistory.tokenID = event.params.tokenId;
      // priceHistory.tokenContract = event.params.tokenContract;
      // priceHistory.seller = event.params.offer.maker;
      // priceHistory.price = event.params.offer.amount;
      // priceHistory.currency = event.params.offer.currency;
      // priceHistory.createdAtTimestamp = event.block.timestamp;
      // priceHistory.save();
    }
  }
}
