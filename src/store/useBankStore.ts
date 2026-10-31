import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  initialCards,
  initialTransactions,
  initialUser,
  paymentCategories,
  paymentServices,
  additionalCategories,
  additionalServices,
  mockLoans,
  mockDeposits,
} from '../data/mockData';
import type {
  AddCardInput,
  BankCard,
  Deposit,
  Loan,
  PaymentCategory,
  PaymentResult,
  PaymentService,
  ProcessPaymentInput,
  Transaction,
  User,
} from '../types';
import { generateId, maskCardNumber } from '../utils/cardUtils';

interface BankState {
  user: User;
  cards: BankCard[];
  transactions: Transaction[];
  categories: PaymentCategory[];
  services: PaymentService[];
  loans: Loan[];
  deposits: Deposit[];
  totalBalance: () => number;
  addCard: (input: AddCardInput) => void;
  removeCard: (id: string) => void;
  setDefaultCard: (id: string) => void;
  getCard: (id: string) => BankCard | undefined;
  getService: (id: string) => PaymentService | undefined;
  getCategory: (id: string) => PaymentCategory | undefined;
  getServicesByCategory: (categoryId: string) => PaymentService[];
  processPayment: (input: ProcessPaymentInput) => PaymentResult;
  getRecentTransactions: (limit?: number) => Transaction[];
}

export const useBankStore = create<BankState>()(
  persist(
    (set, get) => ({
      user: initialUser,
      cards: initialCards,
      transactions: initialTransactions,
      categories: [...paymentCategories, ...additionalCategories],
      services: [...paymentServices, ...additionalServices],

      totalBalance: () => get().cards.reduce((sum, card) => sum + card.balance, 0),
      loans: mockLoans,
      deposits: mockDeposits,

      addCard: (input) => {
        const digits = input.number.replace(/\D/g, '');
        const newCard: BankCard = {
          id: generateId('card'),
          number: digits,
          maskedNumber: maskCardNumber(digits),
          holder: input.holder.toUpperCase(),
          expiry: input.expiry,
          type: input.type,
          balance: input.balance,
          isDefault: get().cards.length === 0,
        };
        set((state) => ({ cards: [...state.cards, newCard] }));
      },

      removeCard: (id) => {
        set((state) => {
          const filtered = state.cards.filter((c) => c.id !== id);
          if (filtered.length > 0 && !filtered.some((c) => c.isDefault)) {
            filtered[0].isDefault = true;
          }
          return { cards: filtered };
        });
      },

      setDefaultCard: (id) => {
        set((state) => ({
          cards: state.cards.map((c) => ({ ...c, isDefault: c.id === id })),
        }));
      },

      getCard: (id) => get().cards.find((c) => c.id === id),
      getService: (id) => get().services.find((s) => s.id === id),
      getCategory: (id) => get().categories.find((c) => c.id === id),

      getServicesByCategory: (categoryId) =>
        get().services.filter((s) => s.categoryId === categoryId),

      processPayment: (input) => {
        const { cardId, serviceId, account, amount } = input;

        if (!amount || amount <= 0) {
          return { success: false, error: 'invalidAmount' };
        }

        const card = get().getCard(cardId);
        if (!card) return { success: false, error: 'cardNotFound' };

        const service = get().getService(serviceId);
        if (!service) return { success: false, error: 'serviceNotFound' };

        if (card.balance < amount) {
          return { success: false, error: 'insufficientFunds' };
        }

        const transactionId = generateId('tx');

        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === cardId ? { ...c, balance: c.balance - amount } : c,
          ),
          transactions: [
            {
              id: transactionId,
              cardId,
              serviceId,
              serviceNameKey: service.nameKey,
              account,
              amount,
              status: 'success',
              createdAt: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        }));

        return { success: true, transactionId };
      },

      getRecentTransactions: (limit = 5) => get().transactions.slice(0, limit),
      getLoans: () => get().loans,
      getDeposits: () => get().deposits,
    }),
    { name: 'bank-app-storage' },
  ),
);
