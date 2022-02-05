import * as splToken from '@solana/spl-token';
import * as definedTypes from '../types';
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

export type WithdrawSharesFromTreasuryInstructionArgs = {
  numberOfShareArgs: definedTypes.NumberOfShareArgs;
};
const WithdrawSharesFromTreasuryStruct = new beet.BeetArgsStruct<
  WithdrawSharesFromTreasuryInstructionArgs & {
    instructionDiscriminator: number;
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ['numberOfShareArgs', definedTypes.numberOfShareArgsBeet],
  ],
  'WithdrawSharesFromTreasuryInstructionArgs',
);
/**
 * Accounts required by the _WithdrawSharesFromTreasury_ instruction
 *
 * @property [writable] destination Initialized Destination account for the shares being withdrawn
 * @property [writable] fractionTreasury Fraction treasury
 * @property [] vault The initialized active token vault
 * @property [] transferAuthority PDA-based Transfer authority to move tokens from treasury to your destination[PREFIX, program_id]
 * @property [signer] vaultAuthority Authority of vault
 */
export type WithdrawSharesFromTreasuryInstructionAccounts = {
  destination: web3.PublicKey;
  fractionTreasury: web3.PublicKey;
  vault: web3.PublicKey;
  transferAuthority: web3.PublicKey;
  vaultAuthority: web3.PublicKey;
};

const withdrawSharesFromTreasuryInstructionDiscriminator = 7;

/**
 * Creates a _WithdrawSharesFromTreasury_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 */
export function createWithdrawSharesFromTreasuryInstruction(
  accounts: WithdrawSharesFromTreasuryInstructionAccounts,
  args: WithdrawSharesFromTreasuryInstructionArgs,
) {
  const { destination, fractionTreasury, vault, transferAuthority, vaultAuthority } = accounts;

  const [data] = WithdrawSharesFromTreasuryStruct.serialize({
    instructionDiscriminator: withdrawSharesFromTreasuryInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: destination,
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
      isSigner: false,
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
