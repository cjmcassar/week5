// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract NotQuiteRandom {
    function getRandomNumber()
        public
        view
        returns (uint256 notQuiteRandomNumber)
    {
        notQuiteRandomNumber = uint256(blockhash(block.number - 1));

        // TODO: get randomness from block hash
    }

    function tossCoin() public view returns (bool heads) {
        // make a function that returns heads or tails
        // use the random number to determine if it's heads or tails
        // return the result
        // uint256 randomNumber = getRandomNumber();
        // if (randomNumber % 2 == 0) {
        //     return true;
        // } else {
        //     return false;
        // }

        heads = getRandomNumber() % 2 == 0;
    }
}
