import * as splToken from '@solana/spl-token';
import * as definedTypes from '../types';
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

export type AddSharesToTreasuryInstructionArgs = {
  numberOfShareArgs: definedTypes.NumberOfShareArgs;
};
const AddSharesToTreasuryStruct = new beet.BeetArgsStruct<
  AddSharesToTreasuryInstructionArgs & {
    instructionDiscriminator: number;
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ['numberOfShareArgs', definedTypes.numberOfShareArgsBeet],
  ],
  'AddSharesToTreasuryInstructionArgs',
);
/**
 * Accounts required by the _AddSharesToTreasury_ instruction
 *
 * @property [writable] source Initialized account from which shares will be withdrawn
 * @property [writable] fractionTreasury Fraction treasury
 * @property [] vault The initialized active token vault
 * @property [signer] transferAuthority Transfer authority to move tokens from your account to treasury
 * @property [signer] vaultAuthority Authority of vault
 */
export type AddSharesToTreasuryInstructionAccounts = {
  source: web3.PublicKey;
  fractionTreasury: web3.PublicKey;
  vault: web3.PublicKey;
  transferAuthority: web3.PublicKey;
  vaultAuthority: web3.PublicKey;
};

const addSharesToTreasuryInstructionDiscriminator = 8;

/**
 * Creates a _AddSharesToTreasury_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 */
export function createAddSharesToTreasuryInstruction(
  accounts: AddSharesToTreasuryInstructionAccounts,
  args: AddSharesToTreasuryInstructionArgs,
) {
  const { source, fractionTreasury, vault, transferAuthority, vaultAuthority } = accounts;

  const [data] = AddSharesToTreasuryStruct.serialize({
    instructionDiscriminator: addSharesToTreasuryInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: source,
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
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: transferAuthority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: vaultAuthority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: splToken.TOKEN_PROGRAM_ID,
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
