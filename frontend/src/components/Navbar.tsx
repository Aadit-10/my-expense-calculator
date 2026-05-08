import React from 'react';
import { TrendingUp, DollarSign, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeView: 'dashboard' | 'expenses';
  onViewChange: (view: 'dashboard' | 'expenses') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, onViewChange }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">
          <DollarSign size={20} />
        </div>
        <span className="brand-name">ExpenseFlow</span>
      </div>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <button
          id="nav-dashboard"
          className={`nav-link ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => { onViewChange('dashboard'); setMenuOpen(false); }}
        >
          <TrendingUp size={16} />
          Dashboard
        </button>
        <button
          id="nav-expenses"
          className={`nav-link ${activeView === 'expenses' ? 'active' : ''}`}
          onClick={() => { onViewChange('expenses'); setMenuOpen(false); }}
        >
          <DollarSign size={16} />
          Expenses
        </button>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </nav>
  );
};

export default Navbar;
