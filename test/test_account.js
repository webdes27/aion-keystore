/// Basic Account Functionality Tests
const assert = require('chai').assert;
const Accounts = require('../src/accounts');
const BN = require('bn.js');

describe("basic account tests", () => {
  describe("account private/public key tests", () => {
    it("should correctly add an account", () => {
      const accs = new Accounts();
      const acc = accs.create();
      assert.isNotNull(acc.publicKey);
      assert.isNotNull(acc.address);
    });

    it("should generate an account", () => {
      // information retrieved from AION node
      const expectedAddress = "0xa0359946e3d0cc409e4079608f4efb7fd19a93f23a968c9130270f36af92141c";
      const privateKey = "0xefbc7a4bb0bf24624f97409473027b62f7ff76e3d232f167e002e1f5872cc2884dcff097bf9912b71d619fc78100de8cf7f55dfddbc2bf5f9fdc36bd670781ee";

      const accs = new Accounts();
      const acc = accs.privateKeyToAccount(privateKey);
      assert.equal(acc.address, expectedAddress);
    });

    it("should generate a valid signature", async () => {
      const privateKey = "0xefbc7a4bb0bf24624f97409473027b62f7ff76e3d232f167e002e1f5872cc2884dcff097bf9912b71d619fc78100de8cf7f55dfddbc2bf5f9fdc36bd670781ee";
      const expectedEncodedTransaction = "0xf8a001a0a050486fc4a5c236a9072961a5b7394885443cd53a704b2630d495d2fc6c268b880de0b6b3a764000080845b8457118252088800000002540be40001b8604dcff097bf9912b71d619fc78100de8cf7f55dfddbc2bf5f9fdc36bd670781ee84be4c9fdfa713e23c6b1b7f74e77f2a65037b82088611ae496c40ffc182fce2683787da136b19872cc7d9ac95a1c3400e2345202a7b09ec67c876587818010b";

      const accs = new Accounts();
      const acc = accs.privateKeyToAccount(privateKey);

      const transaction = {
        to: "0xa050486fc4a5c236a9072961a5b7394885443cd53a704b2630d495d2fc6c268b",
        data: "",
        gasPrice: 10000000000,
        gas: 21000,
        value: new BN("1000000000000000000"),
        nonce: 1,
        timestamp: 1535399697
      };

      // we should get the same results using callback and promise API
      const res = await acc.signTransaction(transaction);
      assert.equal(res.rawTransaction, expectedEncodedTransaction);
    });
  });
});