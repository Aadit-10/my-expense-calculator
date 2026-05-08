import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import * as api from './services/api';
import type { Expense, ExpenseSummary } from './services/api';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'expenses'>('dashboard');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [expensesData, summaryData] = await Promise.all([
        api.getExpenses(),
        api.getSummary()
      ]);
      setExpenses(expensesData);
      setSummary(summaryData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddExpense = () => {
    setEditingExpense(null);
    setIsFormOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const handleDeleteExpense = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    
    try {
      await api.deleteExpense(id);
      toast.success('Expense deleted successfully');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense');
    }
  };

  const handleSaveExpense = async (expenseData: any) => {
    try {
      if (editingExpense) {
        await api.updateExpense(editingExpense._id, expenseData);
        toast.success('Expense updated successfully');
      } else {
        await api.createExpense(expenseData);
        toast.success('Expense added successfully');
      }
      setIsFormOpen(false);
      fetchData(); // Refresh data
    } catch (error: any) {
      console.error('Error saving expense:', error);
      toast.error(error.response?.data?.message || 'Failed to save expense');
    }
  };

  return (
    <div className="app-container">
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="main-content">
        <header className="page-header">
          <div className="header-title">
            <h1>{activeView === 'dashboard' ? 'Dashboard Overview' : 'Expense Management'}</h1>
            <p className="subtitle">
              {activeView === 'dashboard' 
                ? 'Track your spending habits and trends' 
                : 'Manage and categorize all your financial transactions'}
            </p>
          </div>
        </header>

        {activeView === 'dashboard' ? (
          <Dashboard summary={summary} expenses={expenses} loading={loading} />
        ) : (
          <ExpenseList 
            expenses={expenses} 
            onAdd={handleAddExpense} 
            onEdit={handleEditExpense} 
            onDelete={handleDeleteExpense} 
          />
        )}
      </main>

      {isFormOpen && (
        <ExpenseForm 
          expense={editingExpense} 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSaveExpense} 
        />
      )}
    </div>
  );
}

export default App;
