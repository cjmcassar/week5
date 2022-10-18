import { OverflowTest } from "../typechain-types/OverflowTest";
import { ethers } from "hardhat";
import { expect } from "chai";

const SAFE_INCREMENT = 99;
const UNSAFE_INCREMENT = 199;

if (SAFE_INCREMENT + UNSAFE_INCREMENT <= 2 ** 8)
	throw new Error("Test not properly configured");

describe("Testing Overflow operations", async () => {
	let testContract: OverflowTest;

	beforeEach(async () => {
		const testContractFactory = await ethers.getContractFactory("OverflowTest");
		testContract = await testContractFactory.deploy();
		await testContract.deployed();
		const tx = await testContract.increment(SAFE_INCREMENT);
		await tx.wait();
	});

	describe("When incrementing under safe circumstances", async () => {
		it("increments correctly", async () => {
			const counter = await testContract.counter();
			expect(counter).to.equal(SAFE_INCREMENT);
		});
	});
	describe("When incrementing to overflow", async () => {
		it("reverts", async () => {
			await expect(
				testContract.increment(UNSAFE_INCREMENT)
			).to.be.revertedWithPanic("0x11");
		});
	});
	describe("When incrementing to overflow within a unchecked block", async () => {
		it("overflows and increments", async () => {
			const tx = await testContract.forceIncrement(UNSAFE_INCREMENT);
			await tx.wait();
			const newValue = await testContract.counter();
			const overflowValue = SAFE_INCREMENT + UNSAFE_INCREMENT - 2 ** 8;
			expect(newValue).to.equal(overflowValue);
			console.log(
				"The value ${SAFE_INCREMENT} + ${UNSAFE_INCREMENT} tried to be stored in a uint8, but holds up to ${2 ** 8 - 1}."
			);
			console.log(
				"So the saved value is ${overflowValue} due to the overflow."
			);
			if (overflowValue === 42) {
				console.log(
					"The answer to the ultimate question of life, the universe, and everything."
				);
			}
		});
	});
});
