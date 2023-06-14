import {
  ChangeLandOwnerShareCommissionEvent as ChangeLandOwnerShareCommissionEventEvent,
  OwnerStakingSubscribeEvent as OwnerStakingSubscribeEventEvent,
  SaveStakingProgramEvent as SaveStakingProgramEventEvent,
  ShareStakingSubscribeEvent as ShareStakingSubscribeEventEvent} from "../generated/LandStaking/LandStaking"
import {
  ChangeLandOwnerShareCommissionHistory,
  OwnerStakingSubscribe,
  ShareStakingSubscribe,
  TokenStakingProgram} from "../generated/schema"
import {
  BigInt} from "@graphprotocol/graph-ts";

export function handleChangeLandOwnerShareCommissionEvent(
  event: ChangeLandOwnerShareCommissionEventEvent
): void {
    const changeLandOwnerShareCommissionHistory = new ChangeLandOwnerShareCommissionHistory(event.transaction.hash.toString());
    changeLandOwnerShareCommissionHistory.stakingSubscribeId = event.params.stakingSubscribeId;
    changeLandOwnerShareCommissionHistory.stakingAddress = event.params.stakingAddress.toString();
    changeLandOwnerShareCommissionHistory.oldLandOwnerCommission = event.params.oldLandOwnerCommission;
    changeLandOwnerShareCommissionHistory.landOwnerCommission = event.params.landOwnerCommission;
    changeLandOwnerShareCommissionHistory.blockNumber = event.block.number
    changeLandOwnerShareCommissionHistory.blockTimestamp = event.block.timestamp
    changeLandOwnerShareCommissionHistory.transactionHash = event.transaction.hash
    changeLandOwnerShareCommissionHistory.save();
    
    const ownerStakingSubscribeExist = OwnerStakingSubscribe.load(event.params.stakingSubscribeId.toString());
    if(ownerStakingSubscribeExist) {
      ownerStakingSubscribeExist.landOwnerCommission = event.params.landOwnerCommission;
      ownerStakingSubscribeExist.save();
    }
}
//test
export function handleOwnerStakingSubscribeEvent(
  event: OwnerStakingSubscribeEventEvent
): void {
  const ownerStakingSubscribeId = event.params.ownerStakingSubscribeId.toString();
    
    if(event.params.state == 1) {
      const ownerStakingSubscribeExist = OwnerStakingSubscribe.load(ownerStakingSubscribeId);
      if(ownerStakingSubscribeExist) {
        ownerStakingSubscribeExist.claimAtTimestamp = event.block.timestamp;
        ownerStakingSubscribeExist.save();
      }
    }
    else {
      const ownerStakingSubscribe = new OwnerStakingSubscribe(ownerStakingSubscribeId);
      const stakingProgramId = event.params.stakingProgramId.toString();
      ownerStakingSubscribe.tokenId = event.params.tokenId;
      ownerStakingSubscribe.stakingAddress = event.params.stakingAddress.toString();
      ownerStakingSubscribe.stakingProgram = stakingProgramId;
      ownerStakingSubscribe.stakingStartDate = event.params.stakingStartDate;
      ownerStakingSubscribe.stakingEndDate = event.params.stakingEndDate;
      ownerStakingSubscribe.stakingReward = event.params.stakingReward;
      ownerStakingSubscribe.landOwnerCommission = event.params.landOwnerCommission;
      const tokenStakingProgramExist = TokenStakingProgram.load(stakingProgramId);
      if(tokenStakingProgramExist) {
         ownerStakingSubscribe.shareStakingCount = tokenStakingProgramExist.totalLandShareSize;
         ownerStakingSubscribe.shareStakingReaming = tokenStakingProgramExist.totalLandShareSize;
         ownerStakingSubscribe.shareStakingReward = new BigInt(0);
      }
      ownerStakingSubscribe.createdAtTimestamp = event.block.timestamp;
      ownerStakingSubscribe.blockNumber = event.block.number
      ownerStakingSubscribe.blockTimestamp = event.block.timestamp
      ownerStakingSubscribe.transactionHash = event.transaction.hash
      ownerStakingSubscribe.save();
    }
}

export function handleSaveStakingProgramEvent(
  event: SaveStakingProgramEventEvent
): void {
  const stakingProgramId = event.params.stakingProgramId.toString();
  let tokenStakingProgram = new TokenStakingProgram(stakingProgramId.toString())
  tokenStakingProgram.tierID = event.params.tierId;
  tokenStakingProgram.landNftPurchasePrice = event.params.landNftPurchasePrice;
  tokenStakingProgram.stakingTimeDuration = event.params.stakingTimeDuration.toString();
  tokenStakingProgram.stakingOwnerRate = event.params.stakingOwnerRate;
  tokenStakingProgram.defaultLandOwnerComission = event.params.defaultLandOwnerComission;
  tokenStakingProgram.landSharePricePerUnit = event.params.landSharePricePerUnit;
  tokenStakingProgram.totalLandShareSize = event.params.totalLandShareSize;
  tokenStakingProgram.landShareStakingDailyReward = event.params.landShareStakingDailyReward;

  tokenStakingProgram.blockNumber = event.block.number
  tokenStakingProgram.blockTimestamp = event.block.timestamp
  tokenStakingProgram.transactionHash = event.transaction.hash

  tokenStakingProgram.save()
}

export function handleShareStakingSubscribeEvent(
  event: ShareStakingSubscribeEventEvent
): void {
      const shareStakingSubscribeId = event.params.shareStakingSubscribeId.toString();

      if(event.params.state == 1) {
        const shareStakingSubscribeExist = ShareStakingSubscribe.load(shareStakingSubscribeId);
        if(shareStakingSubscribeExist) {
          shareStakingSubscribeExist.claimAtTimestamp = event.block.timestamp;
          shareStakingSubscribeExist.save();
        }
      }
      else {
        
        const shareStakingSubscribe = new ShareStakingSubscribe(shareStakingSubscribeId);
        shareStakingSubscribe.ownerStakingSubscribe = event.params.ownerStakingSubscribeId.toString();
        shareStakingSubscribe.stakingAddress = event.params.stakingAddress.toString();
        shareStakingSubscribe.shareAmount = event.params.shareAmount;
        shareStakingSubscribe.stakingStartDate = event.params.stakingStartDate;
        shareStakingSubscribe.stakingEndDate = event.params.stakingEndDate;
        shareStakingSubscribe.stakingReward = event.params.stakingReward;
        shareStakingSubscribe.lockedTokenAmount = event.params.lockedTokenAmount;
        shareStakingSubscribe.landOwnerCommissionAmount = event.params.landOwnerCommissionAmount;
        shareStakingSubscribe.createdAtTimestamp = event.block.timestamp;
        const ownerStakingSubscribeExist = OwnerStakingSubscribe.load(shareStakingSubscribe.ownerStakingSubscribe.toString());
        if(ownerStakingSubscribeExist){
          ownerStakingSubscribeExist.shareStakingReaming = ownerStakingSubscribeExist.shareStakingReaming.minus(BigInt.fromU32(1));
          ownerStakingSubscribeExist.shareStakingReward  = ownerStakingSubscribeExist.shareStakingReaming.plus(BigInt.fromU32(1));
          ownerStakingSubscribeExist.save();
        }
        shareStakingSubscribe.blockNumber = event.block.number
        shareStakingSubscribe.blockTimestamp = event.block.timestamp
        shareStakingSubscribe.transactionHash = event.transaction.hash
        shareStakingSubscribe.save();
      }
}
