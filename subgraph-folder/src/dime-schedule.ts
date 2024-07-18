import {
  BillAdded as BillAddedEvent,
  BillPaid as BillPaidEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/DimeSchedule/DimeSchedule"
import { BillAdded, BillPaid, OwnershipTransferred } from "../generated/schema"

export function handleBillAdded(event: BillAddedEvent): void {
  let entity = new BillAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.billId = event.params.billId
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount
  entity.lockReleaseTime = event.params.lockReleaseTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBillPaid(event: BillPaidEvent): void {
  let entity = new BillPaid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.billId = event.params.billId
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
