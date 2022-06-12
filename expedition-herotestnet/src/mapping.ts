import { BigInt } from "@graphprotocol/graph-ts";
import {
  Expedition,
  FinishCampaign,
  OwnershipTransferred,
  Participate,
  Paused,
  ReinforceAttack,
  ReinforceDefense,
  UnlockAttackNFTs,
  Unpaused,
} from "../generated/Expedition/Expedition";
import { Campaign, Hero, HeroCampaign } from "../generated/schema";

export function handleParticipate(event: Participate): void {
  // Connect to the Expedition contract
  let expedition: Expedition = Expedition.bind(event.address);

  // Get tokens from event data
  const tokens: BigInt[] = event.params._tokenIds;

  // Load campaign record
  let campaign = Campaign.load(event.params._id.toString());

  // If the campaign does not exist create it with the campaign id
  if (!campaign) {
    campaign = new Campaign(event.params._id.toString());
  }

  // Get all the tokens
  for (let i = 0; i < tokens.length; i++) {
    const tokenId = tokens[i];
    let hero = Hero.load(tokenId.toString());

    // If the hero doesn't exist create the details
    if (!hero) {
      hero = new Hero(tokenId.toString());

      hero.level = expedition.getNFTLevel(tokenId);
      hero.attack = expedition.getNFTAttack(tokenId);
      hero.defense = expedition.getNFTDefense(tokenId);
      hero.endurance = expedition.getNFTEndurance(tokenId);

      hero.save();
    }

    // Create the heroCampaign record
    let heroCampaign = new HeroCampaign(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString() + "-" + tokenId.toString()
    );
    heroCampaign.hero = hero.id;
    heroCampaign.campaign = campaign.id;

    // not maker
    heroCampaign.isAmbusher = !event.params._isMaker;

    heroCampaign.save();

    // Set campaign timestamps for each token
    campaign.reinforceTimestamps.push(event.block.timestamp);
  }

  // Note: In the time event fired tier & area have already values so it's safe to retrieve here
  // Get campaign details from blockchain
  const campaignDetails = expedition.campaigns(event.params._id);

  // Set tier and area info
  campaign.tier = campaignDetails.value1;
  campaign.area = campaignDetails.value4;

  // if isMaker assign the sender as campaigner
  // store the tokens of campaigner or ambusher
  if (event.params._isMaker) {
    campaign.campaigner = event.params._sender;
    // set total defense
    campaign.totalDefense = event.params._points;

    // add timestamp
    campaign.startTimestamp = event.block.timestamp;
  } else {
    campaign.ambusher = event.params._sender;
    // set total attack
    campaign.totalAttack = event.params._points;
  }

  campaign.save();
}

export function handleFinishCampaign(event: FinishCampaign): void {
  // Connect to the Expedition contract
  let expedition: Expedition = Expedition.bind(event.address);

  const rewardMultiplier: BigInt = expedition.rewardMultiplier();
  const loserRewardMultiplier: BigInt = BigInt.fromU32(10000).minus(rewardMultiplier);

  // Load campaign record
  let campaign = Campaign.load(event.params._id.toString());

  // If the campaign does not exist create it with the campaign id
  if (!campaign) {
    campaign = new Campaign(event.params._id.toString());
  }

  // Caller is the maker
  // Set is claimed for the campaigner
  campaign.isClaimedCampaigner = true;

  // campaigner is the winner
  if (event.params._winner === event.params._sender) {
    campaign.rewardHonCampaigner = event.params._honReward;
    campaign.rewardHrmCampaigner = event.params._hrmReward;
    campaign.rewardHonAmbusher = BigInt.zero();
    campaign.rewardHrmAmbusher = BigInt.zero();
  } else {
    // ambusher is the winner
    campaign.rewardHonCampaigner = event.params._honReward
      .times(loserRewardMultiplier)
      .div(BigInt.fromU32(10000));
    campaign.rewardHrmCampaigner = event.params._hrmReward
      .times(loserRewardMultiplier)
      .div(BigInt.fromU32(10000));
    campaign.rewardHonAmbusher = event.params._honReward
      .times(rewardMultiplier)
      .div(BigInt.fromU32(10000));
    campaign.rewardHrmAmbusher = event.params._hrmReward
      .times(rewardMultiplier)
      .div(BigInt.fromU32(10000));
  }

  campaign.save();
}

export function handleUnlockAttackNFTs(event: UnlockAttackNFTs): void {
  // Load campaign record
  let campaign = Campaign.load(event.params._id.toString());

  // If the campaign does not exist create it with the campaign id
  if (!campaign) {
    campaign = new Campaign(event.params._id.toString());
  }

  // Set is claimed for the ambusher
  campaign.isClaimedAmbusher = true;

  campaign.save();
}

export function handleReinforceAttack(event: ReinforceAttack): void {
  // Connect to the Expedition contract
  let expedition: Expedition = Expedition.bind(event.address);

  // Load campaign record
  let campaign = Campaign.load(event.params._id.toString());

  // If the campaign does not exist create it with the campaign id
  if (!campaign) {
    campaign = new Campaign(event.params._id.toString());
  }

  let hero = Hero.load(event.params._tokenId.toString());

  // If hero does not exist create it
  if (!hero) {
    hero = new Hero(event.params._tokenId.toString());

    hero.level = expedition.getNFTLevel(event.params._tokenId);
    hero.attack = expedition.getNFTAttack(event.params._tokenId);
    hero.defense = expedition.getNFTDefense(event.params._tokenId);
    hero.endurance = expedition.getNFTEndurance(event.params._tokenId);

    hero.save();
  }

  // set the total attack points
  campaign.totalAttack = event.params._points;

  // Set campaign reinforcement timestamp
  campaign.reinforceTimestamps.push(event.block.timestamp);

  // Create the heroCampaign record
  let heroCampaign = new HeroCampaign(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  heroCampaign.hero = hero.id;
  heroCampaign.campaign = campaign.id;

  // ambusher only calls reinforceAttack
  heroCampaign.isAmbusher = true;

  heroCampaign.save();

  campaign.save();
}

export function handleReinforceDefense(event: ReinforceDefense): void {
  // Connect to the Expedition contract
  let expedition: Expedition = Expedition.bind(event.address);

  // Load campaign record
  let campaign = Campaign.load(event.params._id.toString());

  // If the campaign does not exist create it with the campaign id
  if (!campaign) {
    campaign = new Campaign(event.params._id.toString());
  }

  let hero = Hero.load(event.params._tokenId.toString());

  // If hero does not exist create it
  if (!hero) {
    hero = new Hero(event.params._tokenId.toString());

    hero.level = expedition.getNFTLevel(event.params._tokenId);
    hero.attack = expedition.getNFTAttack(event.params._tokenId);
    hero.defense = expedition.getNFTDefense(event.params._tokenId);
    hero.endurance = expedition.getNFTEndurance(event.params._tokenId);

    hero.save();
  }

  // set the total defense points
  campaign.totalDefense = event.params._points;

  // Set campaign reinforcement timestamp
  campaign.reinforceTimestamps.push(event.block.timestamp);

  // Create the heroCampaign record
  let heroCampaign = new HeroCampaign(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  heroCampaign.hero = hero.id;
  heroCampaign.campaign = campaign.id;

  // campaigner only calls reinforceDefense
  heroCampaign.isAmbusher = false;

  heroCampaign.save();

  campaign.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleUnpaused(event: Unpaused): void {}
