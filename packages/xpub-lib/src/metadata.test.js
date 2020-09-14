import { NETWORKS } from "unchained-bitcoin"
import { KEY } from "../test/fixtures"
import {
  getExtPubKeyType,
  getNetworkFromExtPubKey,
  getExtPubKeyMetadata,
} from "./metadata"

describe("getNetworkFromExtPubKey", () => {
  test("xpub/ypub/zpub should be mainnet", () => {
    expect(getNetworkFromExtPubKey(KEY.MAIN.XPUB)).toBe(NETWORKS.MAINNET)
    expect(getNetworkFromExtPubKey(KEY.MAIN.YPUB)).toBe(NETWORKS.MAINNET)
    expect(getNetworkFromExtPubKey(KEY.MAIN.ZPUB)).toBe(NETWORKS.MAINNET)
  })
  test("tpu/upub/vpub should be mainnet", () => {
    expect(getNetworkFromExtPubKey(KEY.TEST.TPUB)).toBe(NETWORKS.TESTNET)
    expect(getNetworkFromExtPubKey(KEY.TEST.UPUB)).toBe(NETWORKS.TESTNET)
    expect(getNetworkFromExtPubKey(KEY.TEST.VPUB)).toBe(NETWORKS.TESTNET)
  })
  test("invalid key should be undefined", () => {
    expect(getNetworkFromExtPubKey("abc")).toBeFalsy()
  })
})

describe("getExtPubKeyType", () => {
  test("xpub/tpub should be of type P2PKH (BIP 44)", () => {
    expect(getExtPubKeyType(KEY.MAIN.XPUB)).toBe("44")
    expect(getExtPubKeyType(KEY.TEST.TPUB)).toBe("44")
  })
  test("ypub/upub should be of type P2SH (BIP 49)", () => {
    expect(getExtPubKeyType(KEY.MAIN.YPUB)).toBe("49")
    expect(getExtPubKeyType(KEY.TEST.UPUB)).toBe("49")
  })
  test("zpub/vpub should be of type P2WPKH (BIP 84)", () => {
    expect(getExtPubKeyType(KEY.MAIN.ZPUB)).toBe("84")
    expect(getExtPubKeyType(KEY.TEST.VPUB)).toBe("84")
  })
})

describe("getExtPubKeyMetadata", () => {
  test("xpub metadata", () => {
    expect(getExtPubKeyMetadata(KEY.MAIN.XPUB)).toStrictEqual({
      chaincode:
        "2d6929b63bd13b5f21af8470535baf7ca10924cf21c88fd96f735d65cd0a6cfc",
      depth: 4,
      index: 0,
      network: "mainnet",
      parentFingerprint: 3131820507,
      pubkey:
        "02dd9d5ff10088b43146268c361911d10bb730904bf3a5291402d63c04f66ed2a2",
      type: "44",
      version: "0488b21e",
    })
    expect(getExtPubKeyMetadata(KEY.MAIN.YPUB)).toStrictEqual({
      chaincode:
        "2d6929b63bd13b5f21af8470535baf7ca10924cf21c88fd96f735d65cd0a6cfc",
      depth: 4,
      index: 0,
      network: "mainnet",
      parentFingerprint: 3131820507,
      pubkey:
        "02dd9d5ff10088b43146268c361911d10bb730904bf3a5291402d63c04f66ed2a2",
      type: "49",
      version: "049d7cb2",
    })
    expect(getExtPubKeyMetadata(KEY.MAIN.ZPUB)).toStrictEqual({
      chaincode:
        "2d6929b63bd13b5f21af8470535baf7ca10924cf21c88fd96f735d65cd0a6cfc",
      depth: 4,
      index: 0,
      network: "mainnet",
      parentFingerprint: 3131820507,
      pubkey:
        "02dd9d5ff10088b43146268c361911d10bb730904bf3a5291402d63c04f66ed2a2",
      type: "84",
      version: "04b24746",
    })
  })
})
