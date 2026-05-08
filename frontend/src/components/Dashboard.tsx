import React from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { DollarSign, TrendingUp, Tag, Calendar } from 'lucide-react';
import type { ExpenseSummary, Expense } from '../services/api';

interface DashboardProps {
  summary: ExpenseSummary | null;
  expenses: Expense[];
  loading: boolean;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip-label">{label}</p>
        <p className="chart-tooltip-value">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC<DashboardProps> = ({ summary, expenses, loading }) => {
  const recentExpenses = expenses.slice(0, 5);
  const topCategory = summary?.categorySummary?.[0];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const pieData = summary?.categorySummary?.map(c => ({ name: c._id, value: c.total })) || [];
  const barData = summary?.monthlySummary?.map(m => ({ 
    month: `${m._id.month}/${m._id.year}`, 
    total: m.total 
  })) || [];

  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon"><DollarSign size={22} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Spent</span>
            <span className="stat-value">{formatCurrency(summary?.totalSpent || 0)}</span>
          </div>
        </div>

        <div className="stat-card stat-purple">
          <div className="stat-icon"><Tag size={22} /></div>
          <div className="stat-info">
            <span className="stat-label">Categories</span>
            <span className="stat-value">{summary?.categorySummary?.length || 0}</span>
          </div>
        </div>

        <div className="stat-card stat-pink">
          <div className="stat-icon"><TrendingUp size={22} /></div>
          <div className="stat-info">
            <span className="stat-label">Top Category</span>
            <span className="stat-value" style={{ fontSize: '1.1rem' }}>{topCategory?._id || 'N/A'}</span>
          </div>
        </div>

        <div className="stat-card stat-amber">
          <div className="stat-icon"><Calendar size={22} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Records</span>
            <span className="stat-value">{expenses.length}</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        {/* Pie Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Spending by Category</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => formatCurrency(val)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">No data yet. Add your first expense!</div>
          )}
        </div>

        {/* Bar Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Monthly Trends</h3>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `₹${v}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">No monthly data yet.</div>
          )}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="chart-card">
        <h3 className="chart-title">Recent Expenses</h3>
        {recentExpenses.length > 0 ? (
          <ul className="recent-list">
            {recentExpenses.map(exp => (
              <li key={exp._id} className="recent-item">
                <div className="recent-left">
                  <span className="recent-category-badge">{exp.category}</span>
                  <span className="recent-title">{exp.title}</span>
                </div>
                <div className="recent-right">
                  <span className="recent-amount">{formatCurrency(exp.amount)}</span>
                  <span className="recent-date">{new Date(exp.date).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-chart">No expenses found. Start by adding one!</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
