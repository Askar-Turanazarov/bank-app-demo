export type CardType = 'visa' | 'humo' | 'uzcard';
export type TransactionStatus = 'success' | 'pending' | 'failed';
export type Locale = 'ru' | 'uz' | 'en';
export type AppTheme = 'apple' | 'retro';
export type HistoryFilter = 'all' | 'payments' | 'topups';

export interface User {
  name: string;
}

export interface BankCard {
  id: string;
  number: string;
  maskedNumber: string;
  holder: string;
  expiry: string;
  type: CardType;
  balance: number;
  isDefault: boolean;
}

export interface PaymentCategory {
  id: string;
  nameKey: string;
  icon: string;
}

export interface PaymentService {
  id: string;
  categoryId: string;
  nameKey: string;
  icon: string;
  accountLabelKey: string;
  accountPlaceholderKey: string;
}

export interface Transaction {
  id: string;
  cardId: string;
  serviceId: string;
  serviceNameKey: string;
  account: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
}

export interface AddCardInput {
  number: string;
  holder: string;
  expiry: string;
  type: CardType;
  balance: number;
}

export interface ProcessPaymentInput {
  cardId: string;
  serviceId: string;
  account: string;
  amount: number;
}

export type PaymentResult =
  | { success: true; transactionId: string }
  | { success: false; error: 'insufficientFunds' | 'invalidAmount' | 'cardNotFound' | 'serviceNotFound' };

export interface Loan {
  id: string;
  amount: number;
  currency: 'UZS' | 'USD';
  termMonths: number;
  interestRate: number;
  status: 'active' | 'paid' | 'defaulted';
}

export interface Deposit {
  id: string;
  amount: number;
  currency: 'UZS' | 'USD';
  rate: number; // annual interest rate percent
  maturityDate: string; // ISO string
}
