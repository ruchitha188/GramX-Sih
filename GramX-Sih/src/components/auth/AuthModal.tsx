import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Mail, Lock, X, AlertCircle, UserCheck } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [signupStep, setSignupStep] = useState(1); // 1: Email, 2: OTP, 3: Details
    const [otpCode, setOtpCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const resetState = () => {
        setIsLogin(true);
        setSignupStep(1);
        setEmail('');
        setOtpCode('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setError('');
        setMessage('');
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (authError) throw authError;
            handleClose();
        } catch (err: any) {
            setError(err.message || 'An error occurred during sign in.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignupStep1 = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const { error: authError } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    shouldCreateUser: true
                }
            });
            if (authError) throw authError;
            setMessage('A verification code has been sent to your email.');
            setSignupStep(2);
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignupStep2 = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const { error: authError } = await supabase.auth.verifyOtp({
                email,
                token: otpCode,
                type: 'email'
            });
            if (authError) throw authError;
            setMessage('Email Verified! Please set your name and password.');
            setSignupStep(3);
        } catch (err: any) {
            setError(err.message || 'Invalid verification code.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignupStep3 = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { error: authError } = await supabase.auth.updateUser({
                password: password,
                data: { full_name: name }
            });
            if (authError) throw authError;
            handleClose(); // Success!
        } catch (err: any) {
            setError(err.message || 'Failed to update user details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="text-slate-50 w-full max-w-md bg-black border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-5 border-b border-white/[0.08] bg-black">
                    <h3 className="font-bold text-slate-200 text-lg">
                        {isLogin ? 'Sign in to GramX' : signupStep === 1 ? 'Create an Account' : signupStep === 2 ? 'Enter Verification Code' : 'Secure your Account'}
                    </h3>
                    <button onClick={handleClose} className="p-1 text-slate-400 hover:text-slate-400 rounded-lg hover:bg-slate-200">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-sm">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}
                    {message && (
                        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-zinc-300 text-sm font-medium">
                            {message}
                        </div>
                    )}

                    {isLogin ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="text-slate-50 w-full pl-9 pr-4 py-2 bg-black border border-white/[0.08] rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="name@company.com"
                                    />
                                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="text-slate-50 w-full pl-9 pr-4 py-2 bg-black border border-white/[0.08] rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="••••••••"
                                    />
                                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="text-slate-50 w-full py-2.5 bg-zinc-200 hover:bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-blue-800 disabled:bg-zinc-300 text-white font-semibold rounded-lg text-sm shadow-md transition-colors mt-2"
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                    ) : signupStep === 1 ? (
                        <form onSubmit={handleSignupStep1} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="text-slate-50 w-full pl-9 pr-4 py-2 bg-black border border-white/[0.08] rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="name@company.com"
                                    />
                                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="text-slate-50 w-full py-2.5 bg-zinc-200 hover:bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-blue-800 disabled:bg-zinc-300 text-white font-semibold rounded-lg text-sm shadow-md transition-colors mt-2"
                            >
                                {loading ? 'Sending OTP...' : 'Send Verification Code'}
                            </button>
                        </form>
                    ) : signupStep === 2 ? (
                        <form onSubmit={handleSignupStep2} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">6-Digit Code</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    value={otpCode}
                                    onChange={e => setOtpCode(e.target.value)}
                                    className="text-slate-50 w-full text-center tracking-[0.5em] font-mono text-xl py-3 bg-black border border-white/[0.08] rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    placeholder="••••••"
                                />
                                <p className="text-[10px] text-zinc-500 text-center mt-2">
                                    We sent a code to {email}. Please check your spam folder.
                                </p>
                            </div>
                            <button
                                type="submit"
                                disabled={loading || otpCode.length < 6}
                                className="text-slate-50 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold rounded-lg text-sm shadow-md transition-colors mt-2"
                            >
                                {loading ? 'Verifying...' : 'Verify Code'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignupStep3} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="text-slate-50 w-full pl-9 pr-4 py-2 bg-black border border-white/[0.08] rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="John Doe"
                                    />
                                    <div className="absolute left-3 top-2.5 text-slate-400">
                                        <UserCheck className="w-4 h-4 opacity-0" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Create Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="text-slate-50 w-full pl-9 pr-4 py-2 bg-black border border-white/[0.08] rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="••••••••"
                                    />
                                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        className="text-slate-50 w-full pl-9 pr-4 py-2 bg-black border border-white/[0.08] rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="••••••••"
                                    />
                                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="text-slate-50 w-full py-2.5 bg-zinc-200 hover:bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-blue-800 disabled:bg-zinc-300 text-white font-semibold rounded-lg text-sm shadow-md transition-colors mt-2"
                            >
                                {loading ? 'Saving...' : 'Complete Account Setup'}
                            </button>
                        </form>
                    )}

                    <div className="mt-5 text-center text-xs text-slate-400">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => { resetState(); setIsLogin(!isLogin); }}
                            className="font-bold text-slate-300 hover:underline"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
