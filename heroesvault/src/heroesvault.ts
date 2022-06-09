import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  HeroesVault,
  OwnershipTransferred,
  Stake,
  Unstake,
} from "../generated/HeroesVault/HeroesVault";
import { ExampleEntity, Record, RecordTotal } from "../generated/schema";

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex());

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1);

  // Entity fields can be set based on event parameters
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.feeAddress(...)
  // - contract.feePerMillion(...)
  // - contract.honToken(...)
  // - contract.hroToken(...)
  // - contract.onERC721Received(...)
  // - contract.owner(...)
  // - contract.recordCounts(...)
  // - contract.records(...)
  // - contract.tiers(...)
  // - contract.workerToken(...)
}

/// @dev Emits when `stake` method has been called
/// @param staker Staker address
/// @param tier Staker's tier
/// @param honAmount Staked Hon token amount
/// @param hroId Staked Hro token's id
/// @param workerAmount Issued Worker token amount
//event Stake(address staker, uint256 tier, uint256 honAmount, uint256 hroId, uint256 workerAmount);
export function handleStake(event: Stake): void {
  const staker = event.params.staker;
  const hroId = event.params.hroId;

  const record = createRecord(
    staker,
    hroId.toString(),
    event.params.honAmount,
    event.params.workerAmount
  );

  const recordTotal = getRecordTotal(staker.toHexString());
  if (recordTotal !== null) {
    recordTotal.hroAmount = recordTotal.hroAmount.plus(BigInt.fromU32(1));
    recordTotal.honAmount = recordTotal.honAmount.plus(event.params.honAmount);
    recordTotal.workerAmount = recordTotal.workerAmount.plus(event.params.workerAmount);
    recordTotal.save();
  }
  record.save();
}

/// @dev Emits when `unstake` method has been called
/// @param staker Staker address
/// @param hroId Id of the Hro token
/// @param fee Hon token fee
// event Unstake(address staker, uint256 hroId, uint256 fee);
export function handleUnstake(event: Unstake): void {
  const staker = event.params.staker;
  const hroId = event.params.hroId;

  const record = getRecord(staker, hroId.toString());
  const honAmount = record.honAmount;
  const workerAmount = record.workerAmount;

  const recordTotal = getRecordTotal(staker.toHexString());
  if (recordTotal !== null) {
    recordTotal.hroAmount = recordTotal.hroAmount.minus(BigInt.fromU32(1));
    recordTotal.honAmount = recordTotal.honAmount.minus(honAmount);
    recordTotal.workerAmount = recordTotal.workerAmount.minus(workerAmount);
    recordTotal.save();
  }
}

export function createRecord(
  user: Address,
  id: string,
  honAmount: BigInt,
  workerAmount: BigInt
): Record {
  let record = new Record(id);

  record.user = user;
  record.hroId = BigInt.fromString(id);
  record.honAmount = honAmount;
  record.workerAmount = workerAmount;

  return record as Record;
}

export function getRecord(user: Address, id: string): Record {
  let record = Record.load(id);

  if (!record) {
    record = new Record("none");
    return record as Record;
  }

  if (record.user.equals(user)) {
    return record as Record;
  } else {
    record = new Record("none");
    return record as Record;
  }
}

export function getRecordTotal(id: string): RecordTotal {
  let recordTotal = RecordTotal.load(id);

  if (recordTotal === null) {
    recordTotal = new RecordTotal(id);
    recordTotal.hroAmount = BigInt.fromU32(0);
    recordTotal.honAmount = BigInt.fromU32(0);
    recordTotal.workerAmount = BigInt.fromU32(0);
    recordTotal.save();
  }
  return recordTotal;
}
