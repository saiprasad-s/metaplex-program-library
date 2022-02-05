import * as definedTypes from '../types';
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import * as beetSolana from '@metaplex-foundation/beet-solana';

/**
 * Arguments used to create {@link ExternalPriceAccount}
 */
export type ExternalPriceAccountArgs = {
  key: definedTypes.Key;
  pricePerShare: beet.bignum;
  priceMint: web3.PublicKey;
  allowedToCombine: boolean;
};
/**
 * Holds the data for the {@link ExternalPriceAccount} Account and provides de/serialization
 * functionality for that data
 */
export class ExternalPriceAccount implements ExternalPriceAccountArgs {
  private constructor(
    readonly key: definedTypes.Key,
    readonly pricePerShare: beet.bignum,
    readonly priceMint: web3.PublicKey,
    readonly allowedToCombine: boolean,
  ) {}

  /**
   * Creates a {@link ExternalPriceAccount} instance from the provided args.
   */
  static fromArgs(args: ExternalPriceAccountArgs) {
    return new ExternalPriceAccount(
      args.key,
      args.pricePerShare,
      args.priceMint,
      args.allowedToCombine,
    );
  }

  /**
   * Deserializes the {@link ExternalPriceAccount} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0,
  ): [ExternalPriceAccount, number] {
    return ExternalPriceAccount.deserialize(accountInfo.data, offset);
  }

  /**
   * Deserializes the {@link ExternalPriceAccount} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [ExternalPriceAccount, number] {
    return externalPriceAccountBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link ExternalPriceAccount} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return externalPriceAccountBeet.serialize(this);
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link ExternalPriceAccount}
   */
  static get byteSize() {
    return externalPriceAccountBeet.byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link ExternalPriceAccount} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment,
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(ExternalPriceAccount.byteSize, commitment);
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link ExternalPriceAccount} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset === ExternalPriceAccount.byteSize;
  }

  /**
   * Returns a readable version of {@link ExternalPriceAccount} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      key: this.key,
      pricePerShare: this.pricePerShare,
      priceMint: this.priceMint.toBase58(),
      allowedToCombine: this.allowedToCombine,
    };
  }
}

export const externalPriceAccountBeet = new beet.BeetStruct<
  ExternalPriceAccount,
  ExternalPriceAccountArgs
>(
  [
    ['key', definedTypes.keyBeet],
    ['pricePerShare', beet.u64],
    ['priceMint', beetSolana.publicKey],
    ['allowedToCombine', beet.bool],
  ],
  ExternalPriceAccount.fromArgs,
  'ExternalPriceAccount',
);
