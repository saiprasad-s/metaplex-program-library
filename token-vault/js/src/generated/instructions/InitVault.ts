import * as splToken from '@solana/spl-token';
import * as definedTypes from '../types';
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

export type InitVaultInstructionArgs = {
  initVaultArgs: definedTypes.InitVaultArgs;
};
const InitVaultStruct = new beet.BeetArgsStruct<
  InitVaultInstructionArgs & {
    instructionDiscriminator: number;
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ['initVaultArgs', definedTypes.initVaultArgsBeet],
  ],
  'InitVaultInstructionArgs',
);
/**
 * Accounts required by the _InitVault_ instruction
 *
 * @property [writable] fractionMint Initialized fractional share mint with 0 tokens in supply, authority on mint must be pda of program with seed [prefix, programid]
 * @property [writable] redeemTreasury Initialized redeem treasury token account with 0 tokens in supply, owner of account must be pda of program like above
 * @property [writable] fractionTreasury Initialized fraction treasury token account with 0 tokens in supply, owner of account must be pda of program like above
 * @property [writable] vault Uninitialized vault account
 * @property [] authority Authority on the vault
 * @property [] pricingLookupAddress Pricing Lookup Address
 */
export type InitVaultInstructionAccounts = {
  fractionMint: web3.PublicKey;
  redeemTreasury: web3.PublicKey;
  fractionTreasury: web3.PublicKey;
  vault: web3.PublicKey;
  authority: web3.PublicKey;
  pricingLookupAddress: web3.PublicKey;
};

const initVaultInstructionDiscriminator = 0;

/**
 * Creates a _InitVault_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 */
export function createInitVaultInstruction(
  accounts: InitVaultInstructionAccounts,
  args: InitVaultInstructionArgs,
) {
  const {
    fractionMint,
    redeemTreasury,
    fractionTreasury,
    vault,
    authority,
    pricingLookupAddress,
  } = accounts;

  const [data] = InitVaultStruct.serialize({
    instructionDiscriminator: initVaultInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: fractionMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: redeemTreasury,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fractionTreasury,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: vault,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: authority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: pricingLookupAddress,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey('vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn'),
    keys,
    data,
  });
  return ix;
}
