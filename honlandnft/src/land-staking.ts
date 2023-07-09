import {
  SaveStakingProgram as SaveStakingProgramEvent,
  ChangeLandOwnerShareCommission as ChangeLandOwnerShareCommissionEvent,
  StakeLandOwner as StakeLandOwnerEvent,
  StakeLandShare as StakeLandShareEvent
} from "../generated/LandStaking/LandStaking"
import {
  StakingProgram,
  ChangeLandOwnerShareCommissionHistory,
  StakeLandOwner,
  StakeLandShare,
  StakingProgramHistory
} from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts";

export function handleSaveStakingProgram(
  event: SaveStakingProgramEvent
): void {
  const stakingProgramId = event.params.stakingProgramId.toString();
  let tokenStakingProgram = StakingProgram.load(stakingProgramId.toString())
  if (tokenStakingProgram) {
    tokenStakingProgram.tierID = event.params.tierId;
    tokenStakingProgram.stakingTimeDuration = event.params.stakingTimeDuration.toString();
    tokenStakingProgram.stakingReward = event.params.stakingReward;
    tokenStakingProgram.defaultLandOwnerComission = event.params.defaultLandOwnerComission;
    tokenStakingProgram.landSharePricePerUnit = event.params.landSharePricePerUnit;
    tokenStakingProgram.totalLandShareSize = event.params.totalLandShareSize;
    tokenStakingProgram.landShareStakingDailyReward = event.params.landShareStakingDailyReward;
  }
  else {
    tokenStakingProgram = new StakingProgram(stakingProgramId.toString());
    tokenStakingProgram.tierID = event.params.tierId;
    tokenStakingProgram.stakingTimeDuration = event.params.stakingTimeDuration.toString();
    tokenStakingProgram.stakingReward = event.params.stakingReward;
    tokenStakingProgram.defaultLandOwnerComission = event.params.defaultLandOwnerComission;
    tokenStakingProgram.landSharePricePerUnit = event.params.landSharePricePerUnit;
    tokenStakingProgram.totalLandShareSize = event.params.totalLandShareSize;
    tokenStakingProgram.landShareStakingDailyReward = event.params.landShareStakingDailyReward;
  }
  tokenStakingProgram.save()

  let stakingProgramHistory = new StakingProgramHistory(event.transaction.hash)
  stakingProgramHistory.tierID = event.params.tierId;
  stakingProgramHistory.stakingTimeDuration = event.params.stakingTimeDuration.toString();
  stakingProgramHistory.stakingReward = event.params.stakingReward;
  stakingProgramHistory.defaultLandOwnerComission = event.params.defaultLandOwnerComission;
  stakingProgramHistory.landSharePricePerUnit = event.params.landSharePricePerUnit;
  stakingProgramHistory.totalLandShareSize = event.params.totalLandShareSize;
  stakingProgramHistory.landShareStakingDailyReward = event.params.landShareStakingDailyReward;
  stakingProgramHistory.blockNumber = event.block.number
  stakingProgramHistory.blockTimestamp = event.block.timestamp
  stakingProgramHistory.transactionHash = event.transaction.hash
  stakingProgramHistory.save()

}

export function handleChangeLandOwnerShareCommission(
  event: ChangeLandOwnerShareCommissionEvent
): void {
  const changeLandOwnerShareCommissionHistory = new ChangeLandOwnerShareCommissionHistory(event.transaction.hash.toString());
  changeLandOwnerShareCommissionHistory.stakingSubscribeId = event.params.landOwnerStakeId;
  changeLandOwnerShareCommissionHistory.stakingAddress = event.params.stakingAddress.toString();
  changeLandOwnerShareCommissionHistory.landOwnerCommission = event.params.landOwnerCommission;
  changeLandOwnerShareCommissionHistory.blockNumber = event.block.number
  changeLandOwnerShareCommissionHistory.blockTimestamp = event.block.timestamp
  changeLandOwnerShareCommissionHistory.transactionHash = event.transaction.hash
  changeLandOwnerShareCommissionHistory.save();

  const ownerStakingSubscribeExist = StakeLandOwner.load(event.params.landOwnerStakeId.toString());
  if (ownerStakingSubscribeExist) {
    ownerStakingSubscribeExist.landOwnerCommission = event.params.landOwnerCommission;
    ownerStakingSubscribeExist.save();
  }
}

export function handleStakeLandOwner(
  event: StakeLandOwnerEvent
): void {
  const landOwnerStakeId = event.params.landOwnerStakeId.toString();

  if (event.params.state == 1) {
    const ownerStakingSubscribeExist = StakeLandOwner.load(landOwnerStakeId);
    if (ownerStakingSubscribeExist) {
      ownerStakingSubscribeExist.claimAtTimestamp = event.block.timestamp;
      ownerStakingSubscribeExist.save();
    }
  }
  else {
    const stakeLandOwner = new StakeLandOwner(landOwnerStakeId);
    const stakingProgramId = event.params.stakingProgramId.toString();
    stakeLandOwner.tokenId = event.params.tokenId;
    stakeLandOwner.ownerAddress = event.params.ownerAddress.toString();
    stakeLandOwner.stakingProgram = stakingProgramId;
    stakeLandOwner.stakingStartDate = event.params.stakingStartDate;
    stakeLandOwner.stakingEndDate = event.params.stakingEndDate;
    stakeLandOwner.stakingReward = event.params.stakingReward;
    stakeLandOwner.landOwnerCommission = event.params.landOwnerCommission;
    const tokenStakingProgramExist = StakingProgram.load(stakingProgramId);
    if (tokenStakingProgramExist) {
      stakeLandOwner.shareStakingCount = tokenStakingProgramExist.totalLandShareSize;
      stakeLandOwner.shareStakingReaming = tokenStakingProgramExist.totalLandShareSize;
      stakeLandOwner.shareStakingReward = new BigInt(0);
    }
    stakeLandOwner.createdAtTimestamp = event.block.timestamp;
    stakeLandOwner.blockNumber = event.block.number
    stakeLandOwner.blockTimestamp = event.block.timestamp
    stakeLandOwner.transactionHash = event.transaction.hash
    stakeLandOwner.save();
  }
}

export function handleStakeLandShare(
  event: StakeLandShareEvent
): void {
  const shareStakingSubscribeId = event.params.landShareStakeId.toString();

  if (event.params.state == 1) {
    const shareStakingSubscribeExist = StakeLandOwner.load(shareStakingSubscribeId);
    if (shareStakingSubscribeExist) {
      shareStakingSubscribeExist.claimAtTimestamp = event.block.timestamp;
      shareStakingSubscribeExist.save();
    }
  }
  else {

    const shareStakingSubscribe = new StakeLandShare(shareStakingSubscribeId);
    shareStakingSubscribe.stakeLandOwner = event.params.landOwnerStakeId.toString();
    shareStakingSubscribe.shareAddress = event.params.shareAddress.toString();
    shareStakingSubscribe.shareAmount = event.params.shareAmount;
    shareStakingSubscribe.stakingStartDate = event.params.stakingStartDate;
    shareStakingSubscribe.stakingEndDate = event.params.stakingEndDate;
    shareStakingSubscribe.stakingReward = event.params.stakingReward;
    shareStakingSubscribe.lockedTokenAmount = event.params.lockedTokenAmount;
    shareStakingSubscribe.landOwnerCommissionAmount = event.params.landOwnerCommissionAmount;
    shareStakingSubscribe.createdAtTimestamp = event.block.timestamp;
    const stakeLandOwnerExist = StakeLandOwner.load(shareStakingSubscribe.stakeLandOwner.toString());
    if (stakeLandOwnerExist) {
      stakeLandOwnerExist.shareStakingReaming = stakeLandOwnerExist.shareStakingReaming.minus(BigInt.fromU32(1));
      stakeLandOwnerExist.shareStakingReward = stakeLandOwnerExist.shareStakingReaming.plus(BigInt.fromU32(1));
      stakeLandOwnerExist.save();
    }
    shareStakingSubscribe.blockNumber = event.block.number
    shareStakingSubscribe.blockTimestamp = event.block.timestamp
    shareStakingSubscribe.transactionHash = event.transaction.hash
    shareStakingSubscribe.save();
  }
}
