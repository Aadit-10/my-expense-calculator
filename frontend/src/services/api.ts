import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  createdAt: string;
}

export interface ExpenseSummary {
  totalSpent: number;
  categorySummary: {
    _id: string;
    total: number;
  }[];
  monthlySummary: {
    _id: {
      year: number;
      month: number;
    };
    total: number;
  }[];
}

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await api.get('/expenses');
  return response.data.data;
};

export const getExpense = async (id: string): Promise<Expense> => {
  const response = await api.get(`/expenses/${id}`);
  return response.data.data;
};

export const createExpense = async (expense: Omit<Expense, '_id' | 'createdAt'>): Promise<Expense> => {
  const response = await api.post('/expenses', expense);
  return response.data.data;
};

export const updateExpense = async (id: string, expense: Partial<Expense>): Promise<Expense> => {
  const response = await api.put(`/expenses/${id}`, expense);
  return response.data.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  await api.delete(`/expenses/${id}`);
};

export const getSummary = async (): Promise<ExpenseSummary> => {
  const response = await api.get('/summary');
  return response.data.data;
};

export default api;
