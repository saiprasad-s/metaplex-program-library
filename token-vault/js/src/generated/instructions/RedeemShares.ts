import * as splToken from '@solana/spl-token';
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

const RedeemSharesStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number;
}>([['instructionDiscriminator', beet.u8]], 'RedeemSharesInstructionArgs');
/**
 * Accounts required by the _RedeemShares_ instruction
 *
 * @property [writable] outstandingShares Initialized Token account containing your fractional shares
 * @property [writable] destination Initialized Destination token account where you wish your proceeds to arrive
 * @property [writable] fractionMint Fraction mint
 * @property [writable] redeemTreasury Redeem treasury account
 * @property [] transferAuthority PDA-based Transfer authority for the transfer of proceeds from redeem treasury to destination seed [PREFIX, program_id]
 * @property [signer] burnAuthority Burn authority for the burning of your shares
 * @property [] vault Combined token vault
 */
export type RedeemSharesInstructionAccounts = {
  outstandingShares: web3.PublicKey;
  destination: web3.PublicKey;
  fractionMint: web3.PublicKey;
  redeemTreasury: web3.PublicKey;
  transferAuthority: web3.PublicKey;
  burnAuthority: web3.PublicKey;
  vault: web3.PublicKey;
};

const redeemSharesInstructionDiscriminator = 4;

/**
 * Creates a _RedeemShares_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 */
export function createRedeemSharesInstruction(accounts: RedeemSharesInstructionAccounts) {
  const {
    outstandingShares,
    destination,
    fractionMint,
    redeemTreasury,
    transferAuthority,
    burnAuthority,
    vault,
  } = accounts;

  const [data] = RedeemSharesStruct.serialize({
    instructionDiscriminator: redeemSharesInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: outstandingShares,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: destination,
      isWritable: true,
      isSigner: false,
    },
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
      pubkey: transferAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: burnAuthority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: vault,
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
