import type { BankCard, PaymentCategory, PaymentService, Transaction, User } from '../types';

export const initialUser: User = { name: 'Алишер К.' };

export const initialCards: BankCard[] = [
  {
    id: 'card-1',
    number: '9860123456789012',
    maskedNumber: '**** **** **** 9012',
    holder: 'ALISHER K.',
    expiry: '09/28',
    type: 'humo',
    balance: 2_500_000,
    isDefault: true,
  },
  {
    id: 'card-2',
    number: '4276880012345678',
    maskedNumber: '**** **** **** 5678',
    holder: 'ALISHER K.',
    expiry: '12/27',
    type: 'visa',
    balance: 1_200_000,
    isDefault: false,
  },
];

export const paymentCategories: PaymentCategory[] = [
  { id: 'mobile', nameKey: 'categories.mobile', icon: '📱' },
  { id: 'internet', nameKey: 'categories.internet', icon: '🌐' },
  { id: 'utilities', nameKey: 'categories.utilities', icon: '🏠' },
  { id: 'tv', nameKey: 'categories.tv', icon: '📺' },
  { id: 'education', nameKey: 'categories.education', icon: '🎓' },
  { id: 'taxes', nameKey: 'categories.taxes', icon: '📋' },
];

export const paymentServices: PaymentService[] = [
  { id: 'beeline', categoryId: 'mobile', nameKey: 'services.beeline', icon: '🐝', accountLabelKey: 'payments.phoneNumber', accountPlaceholderKey: 'payments.phonePlaceholder' },
  { id: 'ucell', categoryId: 'mobile', nameKey: 'services.ucell', icon: '📶', accountLabelKey: 'payments.phoneNumber', accountPlaceholderKey: 'payments.phonePlaceholder' },
  { id: 'mobiuz', categoryId: 'mobile', nameKey: 'services.mobiuz', icon: '📡', accountLabelKey: 'payments.phoneNumber', accountPlaceholderKey: 'payments.phonePlaceholder' },
  { id: 'uzmobile', categoryId: 'mobile', nameKey: 'services.uzmobile', icon: '📲', accountLabelKey: 'payments.phoneNumber', accountPlaceholderKey: 'payments.phonePlaceholder' },
  { id: 'perfectum', categoryId: 'mobile', nameKey: 'services.perfectum', icon: '✨', accountLabelKey: 'payments.phoneNumber', accountPlaceholderKey: 'payments.phonePlaceholder' },
  { id: 'beeline-internet', categoryId: 'internet', nameKey: 'services.beelineInternet', icon: '🌍', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'uztelecom', categoryId: 'internet', nameKey: 'services.uztelecom', icon: '🔗', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'electricity', categoryId: 'utilities', nameKey: 'services.electricity', icon: '⚡', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'gas', categoryId: 'utilities', nameKey: 'services.gas', icon: '🔥', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'water', categoryId: 'utilities', nameKey: 'services.water', icon: '💧', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'mahsustrans', categoryId: 'utilities', nameKey: 'services.mahsustrans', icon: '🚌', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'itv', categoryId: 'tv', nameKey: 'services.itv', icon: '📺', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'allplay', categoryId: 'tv', nameKey: 'services.allplay', icon: '🎬', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'university', categoryId: 'education', nameKey: 'services.university', icon: '🏛️', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'school', categoryId: 'education', nameKey: 'services.school', icon: '🏫', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'gibdd', categoryId: 'taxes', nameKey: 'services.gibdd', icon: '🚗', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'taxes', categoryId: 'taxes', nameKey: 'services.taxes', icon: '💼', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
];

export const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    cardId: 'card-1',
    serviceId: 'beeline',
    serviceNameKey: 'services.beeline',
    account: '+998 90 123 45 67',
    amount: 50_000,
    status: 'success',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'tx-2',
    cardId: 'card-2',
    serviceId: 'electricity',
    serviceNameKey: 'services.electricity',
    account: '1234567890',
    amount: 180_000,
    status: 'success',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'tx-3',
    cardId: 'card-1',
    serviceId: 'itv',
    serviceNameKey: 'services.itv',
    account: '9876543210',
    amount: 75_000,
    status: 'success',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
];

// Additional payment categories
export const additionalCategories = [
  { id: 'transfers', nameKey: 'categories.transfers', icon: '🔁' },
  { id: 'bills', nameKey: 'categories.bills', icon: '📄' },
  { id: 'exchange', nameKey: 'categories.exchange', icon: '💱' },
];

// Additional payment services
export const additionalServices = [
  { id: 'p2p', categoryId: 'transfers', nameKey: 'services.p2p', icon: '🤝', accountLabelKey: 'payments.phoneNumber', accountPlaceholderKey: 'payments.phonePlaceholder' },
  { id: 'cardToCard', categoryId: 'transfers', nameKey: 'services.cardToCard', icon: '💳↔️', accountLabelKey: 'payments.cardNumber', accountPlaceholderKey: 'payments.cardPlaceholder' },
  { id: 'intlTransfer', categoryId: 'transfers', nameKey: 'services.intlTransfer', icon: '🌍💸', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'billPayments', categoryId: 'bills', nameKey: 'services.billPayments', icon: '🧾', accountLabelKey: 'payments.accountNumber', accountPlaceholderKey: 'payments.accountPlaceholder' },
  { id: 'currencyExchange', categoryId: 'exchange', nameKey: 'services.currencyExchange', icon: '💱', accountLabelKey: 'payments.amount', accountPlaceholderKey: 'payments.amountPlaceholder' },
];

// Mock loans
export const mockLoans = [
  { id: 'loan-1', amount: 5_000_000, currency: 'UZS' as const, termMonths: 12, interestRate: 12, status: 'active' },
  { id: 'loan-2', amount: 2_000, currency: 'USD' as const, termMonths: 6, interestRate: 8, status: 'paid' },
];

// Mock deposits
export const mockDeposits = [
  { id: 'deposit-1', amount: 10_000_000, currency: 'UZS' as const, rate: 5, maturityDate: new Date(Date.now() + 30*24*60*60*1000).toISOString() },
  { id: 'deposit-2', amount: 1_000, currency: 'USD' as const, rate: 2, maturityDate: new Date(Date.now() + 90*24*60*60*1000).toISOString() },
];
