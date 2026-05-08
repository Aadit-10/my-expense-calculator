import React from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import type { Expense } from '../services/api';

interface ExpenseListProps {
  expenses: Expense[];
  onAdd: () => void;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onAdd, onEdit, onDelete }) => {
  return (
    <div className="expense-list-container">
      <div className="list-header">
        <h2>All Expenses</h2>
        <button className="btn-primary" onClick={onAdd}>
          <Plus size={16} />
          Add Expense
        </button>
      </div>

      <div className="table-responsive">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map(expense => (
                <tr key={expense._id}>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="font-medium">{expense.title}</td>
                  <td>
                    <span className="category-badge">{expense.category}</span>
                  </td>
                  <td className="font-semibold">{formatCurrency(expense.amount)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon text-indigo" 
                        onClick={() => onEdit(expense)}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="btn-icon text-danger" 
                        onClick={() => onDelete(expense._id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="empty-table">
                  No expenses found. Click "Add Expense" to start tracking!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
