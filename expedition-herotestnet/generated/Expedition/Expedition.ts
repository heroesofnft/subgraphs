// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class FinishCampaign extends ethereum.Event {
  get params(): FinishCampaign__Params {
    return new FinishCampaign__Params(this);
  }
}

export class FinishCampaign__Params {
  _event: FinishCampaign;

  constructor(event: FinishCampaign) {
    this._event = event;
  }

  get _sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _winner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _loser(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _honReward(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _hrmReward(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get _id(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Participate extends ethereum.Event {
  get params(): Participate__Params {
    return new Participate__Params(this);
  }
}

export class Participate__Params {
  _event: Participate;

  constructor(event: Participate) {
    this._event = event;
  }

  get _sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _isMaker(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }

  get _points(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _tokenIds(): Array<BigInt> {
    return this._event.parameters[4].value.toBigIntArray();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ReinforceAttack extends ethereum.Event {
  get params(): ReinforceAttack__Params {
    return new ReinforceAttack__Params(this);
  }
}

export class ReinforceAttack__Params {
  _event: ReinforceAttack;

  constructor(event: ReinforceAttack) {
    this._event = event;
  }

  get _sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _points(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class ReinforceDefense extends ethereum.Event {
  get params(): ReinforceDefense__Params {
    return new ReinforceDefense__Params(this);
  }
}

export class ReinforceDefense__Params {
  _event: ReinforceDefense;

  constructor(event: ReinforceDefense) {
    this._event = event;
  }

  get _sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _points(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class UnlockAttackNFTs extends ethereum.Event {
  get params(): UnlockAttackNFTs__Params {
    return new UnlockAttackNFTs__Params(this);
  }
}

export class UnlockAttackNFTs__Params {
  _event: UnlockAttackNFTs;

  constructor(event: UnlockAttackNFTs) {
    this._event = event;
  }

  get _sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Expedition__campaignsResult {
  value0: BigInt;
  value1: BigInt;
  value2: Address;
  value3: Address;
  value4: BigInt;
  value5: BigInt;
  value6: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: Address,
    value3: Address,
    value4: BigInt,
    value5: BigInt,
    value6: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    map.set("value3", ethereum.Value.fromAddress(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    return map;
  }
}

export class Expedition extends ethereum.SmartContract {
  static bind(address: Address): Expedition {
    return new Expedition("Expedition", address);
  }

  CAMPAIGN_DURATION(): BigInt {
    let result = super.call(
      "CAMPAIGN_DURATION",
      "CAMPAIGN_DURATION():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_CAMPAIGN_DURATION(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "CAMPAIGN_DURATION",
      "CAMPAIGN_DURATION():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  WINDOW_DURATION(): BigInt {
    let result = super.call(
      "WINDOW_DURATION",
      "WINDOW_DURATION():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_WINDOW_DURATION(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "WINDOW_DURATION",
      "WINDOW_DURATION():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  boostAmountBp(): BigInt {
    let result = super.call("boostAmountBp", "boostAmountBp():(uint256)", []);

    return result[0].toBigInt();
  }

  try_boostAmountBp(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "boostAmountBp",
      "boostAmountBp():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  campaigns(param0: BigInt): Expedition__campaignsResult {
    let result = super.call(
      "campaigns",
      "campaigns(uint256):(uint256,uint256,address,address,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new Expedition__campaignsResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toAddress(),
      result[3].toAddress(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBigInt()
    );
  }

  try_campaigns(
    param0: BigInt
  ): ethereum.CallResult<Expedition__campaignsResult> {
    let result = super.tryCall(
      "campaigns",
      "campaigns(uint256):(uint256,uint256,address,address,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Expedition__campaignsResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toAddress(),
        value[3].toAddress(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBigInt()
      )
    );
  }

  currentCampaigns(): BigInt {
    let result = super.call(
      "currentCampaigns",
      "currentCampaigns():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_currentCampaigns(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "currentCampaigns",
      "currentCampaigns():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getAttackNFTs(_id: BigInt): Array<BigInt> {
    let result = super.call(
      "getAttackNFTs",
      "getAttackNFTs(uint256):(uint256[])",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );

    return result[0].toBigIntArray();
  }

  try_getAttackNFTs(_id: BigInt): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "getAttackNFTs",
      "getAttackNFTs(uint256):(uint256[])",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  getDefenseNFTs(_id: BigInt): Array<BigInt> {
    let result = super.call(
      "getDefenseNFTs",
      "getDefenseNFTs(uint256):(uint256[])",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );

    return result[0].toBigIntArray();
  }

  try_getDefenseNFTs(_id: BigInt): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "getDefenseNFTs",
      "getDefenseNFTs(uint256):(uint256[])",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  getFirstActiveCampaignId(): BigInt {
    let result = super.call(
      "getFirstActiveCampaignId",
      "getFirstActiveCampaignId():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getFirstActiveCampaignId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getFirstActiveCampaignId",
      "getFirstActiveCampaignId():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getNFTAttack(_tokenId: BigInt): BigInt {
    let result = super.call("getNFTAttack", "getNFTAttack(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    ]);

    return result[0].toBigInt();
  }

  try_getNFTAttack(_tokenId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getNFTAttack",
      "getNFTAttack(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getNFTDefense(_tokenId: BigInt): BigInt {
    let result = super.call(
      "getNFTDefense",
      "getNFTDefense(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );

    return result[0].toBigInt();
  }

  try_getNFTDefense(_tokenId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getNFTDefense",
      "getNFTDefense(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getNFTEndurance(_tokenId: BigInt): BigInt {
    let result = super.call(
      "getNFTEndurance",
      "getNFTEndurance(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );

    return result[0].toBigInt();
  }

  try_getNFTEndurance(_tokenId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getNFTEndurance",
      "getNFTEndurance(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getNFTLevel(_tokenId: BigInt): BigInt {
    let result = super.call("getNFTLevel", "getNFTLevel(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    ]);

    return result[0].toBigInt();
  }

  try_getNFTLevel(_tokenId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getNFTLevel",
      "getNFTLevel(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  honReward(param0: BigInt): BigInt {
    let result = super.call("honReward", "honReward(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toBigInt();
  }

  try_honReward(param0: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("honReward", "honReward(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  honToken(): Address {
    let result = super.call("honToken", "honToken():(address)", []);

    return result[0].toAddress();
  }

  try_honToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("honToken", "honToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  hrmReward(param0: BigInt): BigInt {
    let result = super.call("hrmReward", "hrmReward(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toBigInt();
  }

  try_hrmReward(param0: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("hrmReward", "hrmReward(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hrmToken(): Address {
    let result = super.call("hrmToken", "hrmToken():(address)", []);

    return result[0].toAddress();
  }

  try_hrmToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("hrmToken", "hrmToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  joinedCampaigns(param0: Address, param1: BigInt): BigInt {
    let result = super.call(
      "joinedCampaigns",
      "joinedCampaigns(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_joinedCampaigns(
    param0: Address,
    param1: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "joinedCampaigns",
      "joinedCampaigns(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  maxCampaignCards(): BigInt {
    let result = super.call(
      "maxCampaignCards",
      "maxCampaignCards():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_maxCampaignCards(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "maxCampaignCards",
      "maxCampaignCards():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  nft(): Address {
    let result = super.call("nft", "nft():(address)", []);

    return result[0].toAddress();
  }

  try_nft(): ethereum.CallResult<Address> {
    let result = super.tryCall("nft", "nft():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  penaltyAmountBp(): BigInt {
    let result = super.call(
      "penaltyAmountBp",
      "penaltyAmountBp():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_penaltyAmountBp(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "penaltyAmountBp",
      "penaltyAmountBp():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardMultiplier(): BigInt {
    let result = super.call(
      "rewardMultiplier",
      "rewardMultiplier():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_rewardMultiplier(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardMultiplier",
      "rewardMultiplier():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalCampaigns(): BigInt {
    let result = super.call("totalCampaigns", "totalCampaigns():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalCampaigns(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalCampaigns",
      "totalCampaigns():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ChangeRewardsCall extends ethereum.Call {
  get inputs(): ChangeRewardsCall__Inputs {
    return new ChangeRewardsCall__Inputs(this);
  }

  get outputs(): ChangeRewardsCall__Outputs {
    return new ChangeRewardsCall__Outputs(this);
  }
}

export class ChangeRewardsCall__Inputs {
  _call: ChangeRewardsCall;

  constructor(call: ChangeRewardsCall) {
    this._call = call;
  }

  get _honReward(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get _hrmReward(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }
}

export class ChangeRewardsCall__Outputs {
  _call: ChangeRewardsCall;

  constructor(call: ChangeRewardsCall) {
    this._call = call;
  }
}

export class CreateAndParticipateCampaignCall extends ethereum.Call {
  get inputs(): CreateAndParticipateCampaignCall__Inputs {
    return new CreateAndParticipateCampaignCall__Inputs(this);
  }

  get outputs(): CreateAndParticipateCampaignCall__Outputs {
    return new CreateAndParticipateCampaignCall__Outputs(this);
  }
}

export class CreateAndParticipateCampaignCall__Inputs {
  _call: CreateAndParticipateCampaignCall;

  constructor(call: CreateAndParticipateCampaignCall) {
    this._call = call;
  }

  get _tier(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _tokenIds(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }
}

export class CreateAndParticipateCampaignCall__Outputs {
  _call: CreateAndParticipateCampaignCall;

  constructor(call: CreateAndParticipateCampaignCall) {
    this._call = call;
  }
}

export class EmergencyWithdrawNFTCall extends ethereum.Call {
  get inputs(): EmergencyWithdrawNFTCall__Inputs {
    return new EmergencyWithdrawNFTCall__Inputs(this);
  }

  get outputs(): EmergencyWithdrawNFTCall__Outputs {
    return new EmergencyWithdrawNFTCall__Outputs(this);
  }
}

export class EmergencyWithdrawNFTCall__Inputs {
  _call: EmergencyWithdrawNFTCall;

  constructor(call: EmergencyWithdrawNFTCall) {
    this._call = call;
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class EmergencyWithdrawNFTCall__Outputs {
  _call: EmergencyWithdrawNFTCall;

  constructor(call: EmergencyWithdrawNFTCall) {
    this._call = call;
  }
}

export class FinishCampaignCall extends ethereum.Call {
  get inputs(): FinishCampaignCall__Inputs {
    return new FinishCampaignCall__Inputs(this);
  }

  get outputs(): FinishCampaignCall__Outputs {
    return new FinishCampaignCall__Outputs(this);
  }
}

export class FinishCampaignCall__Inputs {
  _call: FinishCampaignCall;

  constructor(call: FinishCampaignCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class FinishCampaignCall__Outputs {
  _call: FinishCampaignCall;

  constructor(call: FinishCampaignCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _honToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _hrmToken(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _nft(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class ParticipateCall extends ethereum.Call {
  get inputs(): ParticipateCall__Inputs {
    return new ParticipateCall__Inputs(this);
  }

  get outputs(): ParticipateCall__Outputs {
    return new ParticipateCall__Outputs(this);
  }
}

export class ParticipateCall__Inputs {
  _call: ParticipateCall;

  constructor(call: ParticipateCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _tokenIds(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }
}

export class ParticipateCall__Outputs {
  _call: ParticipateCall;

  constructor(call: ParticipateCall) {
    this._call = call;
  }
}

export class PauseCall extends ethereum.Call {
  get inputs(): PauseCall__Inputs {
    return new PauseCall__Inputs(this);
  }

  get outputs(): PauseCall__Outputs {
    return new PauseCall__Outputs(this);
  }
}

export class PauseCall__Inputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PauseCall__Outputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class ReinforceAttackCall extends ethereum.Call {
  get inputs(): ReinforceAttackCall__Inputs {
    return new ReinforceAttackCall__Inputs(this);
  }

  get outputs(): ReinforceAttackCall__Outputs {
    return new ReinforceAttackCall__Outputs(this);
  }
}

export class ReinforceAttackCall__Inputs {
  _call: ReinforceAttackCall;

  constructor(call: ReinforceAttackCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ReinforceAttackCall__Outputs {
  _call: ReinforceAttackCall;

  constructor(call: ReinforceAttackCall) {
    this._call = call;
  }
}

export class ReinforceDefenseCall extends ethereum.Call {
  get inputs(): ReinforceDefenseCall__Inputs {
    return new ReinforceDefenseCall__Inputs(this);
  }

  get outputs(): ReinforceDefenseCall__Outputs {
    return new ReinforceDefenseCall__Outputs(this);
  }
}

export class ReinforceDefenseCall__Inputs {
  _call: ReinforceDefenseCall;

  constructor(call: ReinforceDefenseCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ReinforceDefenseCall__Outputs {
  _call: ReinforceDefenseCall;

  constructor(call: ReinforceDefenseCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetBoostAmountBpCall extends ethereum.Call {
  get inputs(): SetBoostAmountBpCall__Inputs {
    return new SetBoostAmountBpCall__Inputs(this);
  }

  get outputs(): SetBoostAmountBpCall__Outputs {
    return new SetBoostAmountBpCall__Outputs(this);
  }
}

export class SetBoostAmountBpCall__Inputs {
  _call: SetBoostAmountBpCall;

  constructor(call: SetBoostAmountBpCall) {
    this._call = call;
  }

  get _boostAmountBp(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetBoostAmountBpCall__Outputs {
  _call: SetBoostAmountBpCall;

  constructor(call: SetBoostAmountBpCall) {
    this._call = call;
  }
}

export class SetPenaltyAmountBpCall extends ethereum.Call {
  get inputs(): SetPenaltyAmountBpCall__Inputs {
    return new SetPenaltyAmountBpCall__Inputs(this);
  }

  get outputs(): SetPenaltyAmountBpCall__Outputs {
    return new SetPenaltyAmountBpCall__Outputs(this);
  }
}

export class SetPenaltyAmountBpCall__Inputs {
  _call: SetPenaltyAmountBpCall;

  constructor(call: SetPenaltyAmountBpCall) {
    this._call = call;
  }

  get _penaltyAmountBp(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetPenaltyAmountBpCall__Outputs {
  _call: SetPenaltyAmountBpCall;

  constructor(call: SetPenaltyAmountBpCall) {
    this._call = call;
  }
}

export class SetRewardMultiplierCall extends ethereum.Call {
  get inputs(): SetRewardMultiplierCall__Inputs {
    return new SetRewardMultiplierCall__Inputs(this);
  }

  get outputs(): SetRewardMultiplierCall__Outputs {
    return new SetRewardMultiplierCall__Outputs(this);
  }
}

export class SetRewardMultiplierCall__Inputs {
  _call: SetRewardMultiplierCall;

  constructor(call: SetRewardMultiplierCall) {
    this._call = call;
  }

  get _rewardMultiplier(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetRewardMultiplierCall__Outputs {
  _call: SetRewardMultiplierCall;

  constructor(call: SetRewardMultiplierCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UnlockAttackNFTsCall extends ethereum.Call {
  get inputs(): UnlockAttackNFTsCall__Inputs {
    return new UnlockAttackNFTsCall__Inputs(this);
  }

  get outputs(): UnlockAttackNFTsCall__Outputs {
    return new UnlockAttackNFTsCall__Outputs(this);
  }
}

export class UnlockAttackNFTsCall__Inputs {
  _call: UnlockAttackNFTsCall;

  constructor(call: UnlockAttackNFTsCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UnlockAttackNFTsCall__Outputs {
  _call: UnlockAttackNFTsCall;

  constructor(call: UnlockAttackNFTsCall) {
    this._call = call;
  }
}

export class UnpauseCall extends ethereum.Call {
  get inputs(): UnpauseCall__Inputs {
    return new UnpauseCall__Inputs(this);
  }

  get outputs(): UnpauseCall__Outputs {
    return new UnpauseCall__Outputs(this);
  }
}

export class UnpauseCall__Inputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnpauseCall__Outputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class WithdrawAllCall extends ethereum.Call {
  get inputs(): WithdrawAllCall__Inputs {
    return new WithdrawAllCall__Inputs(this);
  }

  get outputs(): WithdrawAllCall__Outputs {
    return new WithdrawAllCall__Outputs(this);
  }
}

export class WithdrawAllCall__Inputs {
  _call: WithdrawAllCall;

  constructor(call: WithdrawAllCall) {
    this._call = call;
  }
}

export class WithdrawAllCall__Outputs {
  _call: WithdrawAllCall;

  constructor(call: WithdrawAllCall) {
    this._call = call;
  }
}
