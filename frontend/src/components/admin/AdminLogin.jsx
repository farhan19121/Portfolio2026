import React, { useState } from 'react';
import { Lock, User, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin({ onBack, onSuccess }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#fffcfc]">
      <div className="w-full max-w-md notebook-card p-8 space-y-6 bg-[#ffffff]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-mono-plex text-[#717a94] hover:text-[#01011b] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </button>
          <span className="text-[10px] font-mono-plex uppercase bg-[#ecedf2] text-[#473982] px-2 py-0.5 rounded-[3px] border border-[#dbd7da]">
            Secure Admin Gateway
          </span>
        </div>

        <div className="text-center space-y-1.5">
          <div className="w-10 h-10 rounded-[4px] bg-[#ecedf2] border border-[#dbd7da] text-[#473982] mx-auto flex items-center justify-center shadow-sm">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-formula font-bold text-[#01011b] tracking-tight">Admin Portal Login</h2>
          <p className="text-xs text-[#717a94] font-plex">
            Sign in to create, customize, and manage dynamic portfolio projects.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-[3px] bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <label className="text-xs font-mono-plex font-medium text-[#43394c]">Admin Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#717a94] absolute left-3 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono-plex font-medium text-[#43394c]">Admin Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#717a94] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-[3px] bg-[#fffcfc] border border-[#dbd7da] text-[#01011b] placeholder-[#89828d] focus:outline-none focus:border-[#473982] focus:ring-2 focus:ring-[#473982]/15 text-xs transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-outlined w-full py-2.5 text-xs font-semibold"
          >
            {loading ? 'Authenticating with Django...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
