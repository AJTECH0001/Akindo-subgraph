import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  BillAdded,
  BillPaid,
  OwnershipTransferred
} from "../generated/DimeSchedule/DimeSchedule"

export function createBillAddedEvent(
  billId: BigInt,
  recipient: Address,
  amount: BigInt,
  lockReleaseTime: BigInt
): BillAdded {
  let billAddedEvent = changetype<BillAdded>(newMockEvent())

  billAddedEvent.parameters = new Array()

  billAddedEvent.parameters.push(
    new ethereum.EventParam("billId", ethereum.Value.fromUnsignedBigInt(billId))
  )
  billAddedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  billAddedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  billAddedEvent.parameters.push(
    new ethereum.EventParam(
      "lockReleaseTime",
      ethereum.Value.fromUnsignedBigInt(lockReleaseTime)
    )
  )

  return billAddedEvent
}

export function createBillPaidEvent(
  billId: BigInt,
  recipient: Address,
  amount: BigInt
): BillPaid {
  let billPaidEvent = changetype<BillPaid>(newMockEvent())

  billPaidEvent.parameters = new Array()

  billPaidEvent.parameters.push(
    new ethereum.EventParam("billId", ethereum.Value.fromUnsignedBigInt(billId))
  )
  billPaidEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  billPaidEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return billPaidEvent
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
