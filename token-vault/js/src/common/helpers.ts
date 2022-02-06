import {
  AccountLayout as TokenAccountLayout,
  MintLayout,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { Keypair, PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';

// -----------------
// Helpers from common/src/actions/action.ts
// -----------------
export function createMint(
  instructions: TransactionInstruction[],
  payer: PublicKey,
  mintRentExempt: number,
  decimals: number,
  owner: PublicKey,
  freezeAuthority: PublicKey,
  signers: Keypair[],
) {
  const account = createUninitializedMint(instructions, payer, mintRentExempt, signers);

  instructions.push(
    Token.createInitMintInstruction(TOKEN_PROGRAM_ID, account, decimals, owner, freezeAuthority),
  );

  return account;
}

export function createUninitializedMint(
  instructions: TransactionInstruction[],
  payer: PublicKey,
  amount: number,
  signers: Keypair[],
) {
  const account = Keypair.generate();
  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: account.publicKey,
      lamports: amount,
      space: MintLayout.span,
      programId: TOKEN_PROGRAM_ID,
    }),
  );

  signers.push(account);

  return account.publicKey;
}

export function createTokenAccount(
  instructions: TransactionInstruction[],
  payer: PublicKey,
  accountRentExempt: number,
  mint: PublicKey,
  owner: PublicKey,
  signers: Keypair[],
) {
  const account = createUninitializedAccount(instructions, payer, accountRentExempt, signers);

  instructions.push(Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, mint, account, owner));

  return account;
}

export function createUninitializedAccount(
  instructions: TransactionInstruction[],
  payer: PublicKey,
  amount: number,
  signers: Keypair[],
) {
  const account = Keypair.generate();
  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: account.publicKey,
      lamports: amount,
      space: TokenAccountLayout.span,
      programId: TOKEN_PROGRAM_ID,
    }),
  );

  signers.push(account);

  return account.publicKey;
}
