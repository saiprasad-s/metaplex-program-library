import * as splToken from '@solana/spl-token';
import * as definedTypes from '../types';
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

export type WithdrawTokenFromSafetyDepositBoxInstructionArgs = {
  amountArgs: definedTypes.AmountArgs;
};
const WithdrawTokenFromSafetyDepositBoxStruct = new beet.BeetArgsStruct<
  WithdrawTokenFromSafetyDepositBoxInstructionArgs & {
    instructionDiscriminator: number;
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ['amountArgs', definedTypes.amountArgsBeet],
  ],
  'WithdrawTokenFromSafetyDepositBoxInstructionArgs',
);
/**
 * Accounts required by the _WithdrawTokenFromSafetyDepositBox_ instruction
 *
 * @property [writable] destination Initialized Destination account for the tokens being withdrawn
 * @property [writable] safetyDeposit The safety deposit box account key for the tokens
 * @property [writable] store The store key on the safety deposit box account
 * @property [writable] vault The initialized combined token vault
 * @property [] fractionMint Fraction mint
 * @property [signer] vaultAuthority Authority of vault
 * @property [] transferAuthority PDA-based Transfer authority to move the tokens from the store to the destination seed [PREFIX, program_id]
 */
export type WithdrawTokenFromSafetyDepositBoxInstructionAccounts = {
  destination: web3.PublicKey;
  safetyDeposit: web3.PublicKey;
  store: web3.PublicKey;
  vault: web3.PublicKey;
  fractionMint: web3.PublicKey;
  vaultAuthority: web3.PublicKey;
  transferAuthority: web3.PublicKey;
};

const withdrawTokenFromSafetyDepositBoxInstructionDiscriminator = 5;

/**
 * Creates a _WithdrawTokenFromSafetyDepositBox_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 */
export function createWithdrawTokenFromSafetyDepositBoxInstruction(
  accounts: WithdrawTokenFromSafetyDepositBoxInstructionAccounts,
  args: WithdrawTokenFromSafetyDepositBoxInstructionArgs,
) {
  const {
    destination,
    safetyDeposit,
    store,
    vault,
    fractionMint,
    vaultAuthority,
    transferAuthority,
  } = accounts;

  const [data] = WithdrawTokenFromSafetyDepositBoxStruct.serialize({
    instructionDiscriminator: withdrawTokenFromSafetyDepositBoxInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: destination,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: safetyDeposit,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: store,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: vault,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fractionMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: vaultAuthority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: transferAuthority,
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
