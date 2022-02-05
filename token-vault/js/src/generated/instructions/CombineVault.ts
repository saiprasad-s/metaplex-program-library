import * as splToken from '@solana/spl-token';
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

const CombineVaultStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number;
}>([['instructionDiscriminator', beet.u8]], 'CombineVaultInstructionArgs');
/**
 * Accounts required by the _CombineVault_ instruction
 *
 * @property [writable] vault Initialized activated token vault
 * @property [writable] yourOutstandingShares Token account containing your portion of the outstanding fraction shares
 * @property [writable] yourPayment Token account of the redeem_treasury mint type that you will pay with
 * @property [writable] fractionMint Fraction mint
 * @property [writable] fractionTreasury Fraction treasury account
 * @property [writable] redeemTreasury Redeem treasury account
 * @property [] newVaultAuthority New authority on the vault going forward - can be same authority if you want
 * @property [signer] vaultAuthority Authority on the vault
 * @property [signer] transferAuthority Transfer authority for the token account and outstanding fractional shares account you're transferring from
 * @property [] fractionBurnAuthority PDA-based Burn authority for the fraction treasury account containing the uncirculated shares seed [PREFIX, program_id]
 * @property [] externalPricing External pricing lookup address
 */
export type CombineVaultInstructionAccounts = {
  vault: web3.PublicKey;
  yourOutstandingShares: web3.PublicKey;
  yourPayment: web3.PublicKey;
  fractionMint: web3.PublicKey;
  fractionTreasury: web3.PublicKey;
  redeemTreasury: web3.PublicKey;
  newVaultAuthority: web3.PublicKey;
  vaultAuthority: web3.PublicKey;
  transferAuthority: web3.PublicKey;
  fractionBurnAuthority: web3.PublicKey;
  externalPricing: web3.PublicKey;
};

const combineVaultInstructionDiscriminator = 3;

/**
 * Creates a _CombineVault_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 */
export function createCombineVaultInstruction(accounts: CombineVaultInstructionAccounts) {
  const {
    vault,
    yourOutstandingShares,
    yourPayment,
    fractionMint,
    fractionTreasury,
    redeemTreasury,
    newVaultAuthority,
    vaultAuthority,
    transferAuthority,
    fractionBurnAuthority,
    externalPricing,
  } = accounts;

  const [data] = CombineVaultStruct.serialize({
    instructionDiscriminator: combineVaultInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: vault,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: yourOutstandingShares,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: yourPayment,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fractionMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fractionTreasury,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: redeemTreasury,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: newVaultAuthority,
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
      isSigner: true,
    },
    {
      pubkey: fractionBurnAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: externalPricing,
      isWritable: false,
      isSigner: false,
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
