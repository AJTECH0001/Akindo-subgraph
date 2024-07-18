import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BillAdded } from "../generated/schema"
import { BillAdded as BillAddedEvent } from "../generated/DimeSchedule/DimeSchedule"
import { handleBillAdded } from "../src/dime-schedule"
import { createBillAddedEvent } from "./dime-schedule-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let billId = BigInt.fromI32(234)
    let recipient = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let lockReleaseTime = BigInt.fromI32(234)
    let newBillAddedEvent = createBillAddedEvent(
      billId,
      recipient,
      amount,
      lockReleaseTime
    )
    handleBillAdded(newBillAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BillAdded created and stored", () => {
    assert.entityCount("BillAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BillAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "billId",
      "234"
    )
    assert.fieldEquals(
      "BillAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "recipient",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BillAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "BillAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "lockReleaseTime",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
