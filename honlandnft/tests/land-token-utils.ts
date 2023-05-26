import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  Approval,
  ApprovalForAll,
  BeaconUpgraded,
  Initialized,
  OwnershipTransferred,
  Paused,
  TokenSaleEvent,
  TokenSaleProgramEvent,
  Transfer,
  TransferSaleTotalAmountEvent,
  Unpaused,
  UpdateUser,
  Upgraded,
  WhiteListSaveEvent
} from "../generated/LandToken/LandToken"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createTokenSaleEventEvent(
  tierId: BigInt,
  price: BigInt,
  purchasedPrice: BigInt,
  tokenId: BigInt,
  reamingAmount: BigInt,
  seller: Address
): TokenSaleEvent {
  let tokenSaleEventEvent = changetype<TokenSaleEvent>(newMockEvent())

  tokenSaleEventEvent.parameters = new Array()

  tokenSaleEventEvent.parameters.push(
    new ethereum.EventParam("tierId", ethereum.Value.fromUnsignedBigInt(tierId))
  )
  tokenSaleEventEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  tokenSaleEventEvent.parameters.push(
    new ethereum.EventParam(
      "purchasedPrice",
      ethereum.Value.fromUnsignedBigInt(purchasedPrice)
    )
  )
  tokenSaleEventEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  tokenSaleEventEvent.parameters.push(
    new ethereum.EventParam(
      "reamingAmount",
      ethereum.Value.fromUnsignedBigInt(reamingAmount)
    )
  )
  tokenSaleEventEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return tokenSaleEventEvent
}

export function createTokenSaleProgramEventEvent(
  tierId: BigInt,
  name: string,
  price: BigInt,
  count: BigInt,
  remainingAmount: BigInt,
  saleEnabled: boolean,
  startDate: BigInt,
  endDate: BigInt,
  tokenIdRange: Array<BigInt>,
  whiteListEnabled: boolean
): TokenSaleProgramEvent {
  let tokenSaleProgramEventEvent = changetype<TokenSaleProgramEvent>(
    newMockEvent()
  )

  tokenSaleProgramEventEvent.parameters = new Array()

  tokenSaleProgramEventEvent.parameters.push(
    new ethereum.EventParam("tierId", ethereum.Value.fromUnsignedBigInt(tierId))
  )
  tokenSaleProgramEventEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  tokenSaleProgramEventEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  tokenSaleProgramEventEvent.parameters.push(
    new ethereum.EventParam("count", ethereum.Value.fromUnsignedBigInt(count))
  )
  tokenSaleProgramEventEvent.parameters.push(
    new ethereum.EventParam(
      "remainingAmount",
      ethereum.Value.fromUnsignedBigInt(remainingAmount)
    )
  )
  tokenSaleProgramEventEvent.parameters.push(
    new ethereum.EventParam(
      "saleEnabled",
      ethereum.Value.fromBoolean(saleEnabled)
    )
  )
  tokenSaleProgramEventEvent.parameters.push(
    new ethereum.EventParam(
      "startDate",
      ethereum.Value.fromUnsignedBigInt(startDate)
    )
  )
  tokenSaleProgramEventEvent.parameters.push(
    new ethereum.EventParam(
      "endDate",
      ethereum.Value.fromUnsignedBigInt(endDate)
    )
  )
  tokenSaleProgramEventEvent.parameters.push(
    new ethereum.EventParam(
      "tokenIdRange",
      ethereum.Value.fromUnsignedBigIntArray(tokenIdRange)
    )
  )
  tokenSaleProgramEventEvent.parameters.push(
    new ethereum.EventParam(
      "whiteListEnabled",
      ethereum.Value.fromBoolean(whiteListEnabled)
    )
  )

  return tokenSaleProgramEventEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createTransferSaleTotalAmountEventEvent(
  tokenAmount: BigInt,
  transferAddress: Address
): TransferSaleTotalAmountEvent {
  let transferSaleTotalAmountEventEvent = changetype<
    TransferSaleTotalAmountEvent
  >(newMockEvent())

  transferSaleTotalAmountEventEvent.parameters = new Array()

  transferSaleTotalAmountEventEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAmount",
      ethereum.Value.fromUnsignedBigInt(tokenAmount)
    )
  )
  transferSaleTotalAmountEventEvent.parameters.push(
    new ethereum.EventParam(
      "transferAddress",
      ethereum.Value.fromAddress(transferAddress)
    )
  )

  return transferSaleTotalAmountEventEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createUpdateUserEvent(
  tokenId: BigInt,
  user: Address,
  expires: BigInt
): UpdateUser {
  let updateUserEvent = changetype<UpdateUser>(newMockEvent())

  updateUserEvent.parameters = new Array()

  updateUserEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  updateUserEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  updateUserEvent.parameters.push(
    new ethereum.EventParam(
      "expires",
      ethereum.Value.fromUnsignedBigInt(expires)
    )
  )

  return updateUserEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createWhiteListSaveEventEvent(
  whiteListProgramId: BigInt,
  tierId: BigInt,
  whiteList: Array<Address>,
  whiteListDiscountRatio: BigInt
): WhiteListSaveEvent {
  let whiteListSaveEventEvent = changetype<WhiteListSaveEvent>(newMockEvent())

  whiteListSaveEventEvent.parameters = new Array()

  whiteListSaveEventEvent.parameters.push(
    new ethereum.EventParam(
      "whiteListProgramId",
      ethereum.Value.fromUnsignedBigInt(whiteListProgramId)
    )
  )
  whiteListSaveEventEvent.parameters.push(
    new ethereum.EventParam("tierId", ethereum.Value.fromUnsignedBigInt(tierId))
  )
  whiteListSaveEventEvent.parameters.push(
    new ethereum.EventParam(
      "whiteList",
      ethereum.Value.fromAddressArray(whiteList)
    )
  )
  whiteListSaveEventEvent.parameters.push(
    new ethereum.EventParam(
      "whiteListDiscountRatio",
      ethereum.Value.fromUnsignedBigInt(whiteListDiscountRatio)
    )
  )

  return whiteListSaveEventEvent
}
