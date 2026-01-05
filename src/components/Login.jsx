import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                console.log('Sign up request sent');
                alert('Sign up request sent');
            }, 2000);
        } else {
            handleLogin();
        }
    };

    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/userpage');
        }, 2000);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[6px] z-100 animate-in fade-in duration-500">
            <div className="relative w-full max-w-[440px] bg-[#1a1a1a]/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] overflow-hidden animate-in slide-in-from-bottom-8 duration-700">

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 text-white/30 hover:bg-white/10 hover:text-white transition-all duration-300 z-10 border border-white/5 active:scale-90"
                >
                    <i className="bi bi-x-lg text-sm"></i>
                </button>

                <div className="p-10 sm:p-14 flex flex-col items-center">

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Innovation Hub</h2>
                        <p className="text-white/40 font-medium text-sm">Elevate your creative potential.</p>
                    </div>

                    <form action="" className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {isSignUp && (
                                <div className="relative group">
                                    <i className="bi bi-person-fill absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#08a045] transition-colors duration-300"></i>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder='Name'
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-white/10 outline-none focus:ring-2 focus:ring-[#08a045]/20 focus:border-[#08a045]/40 transition-all duration-300 font-inter"
                                    />
                                </div>
                            )}
                            <div className="relative group">
                                <i className="bi bi-envelope absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#08a045] transition-colors duration-300"></i>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder='Email Address'
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-white/10 outline-none focus:ring-2 focus:ring-[#08a045]/20 focus:border-[#08a045]/40 transition-all duration-300 font-inter"
                                />
                            </div>

                            <div className="relative group">
                                {isSignUp ? (
                                    <>
                                        <i className="bi bi-chat-fill absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#08a045] transition-colors duration-300"></i>
                                        <input
                                            type="text"
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder='Enter Message'
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-white placeholder:text-white/10 outline-none focus:ring-2 focus:ring-[#08a045]/20 focus:border-[#08a045]/40 transition-all duration-300 font-inter"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-lock absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#08a045] transition-colors duration-300"></i>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder='Secure Password'
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-white placeholder:text-white/10 outline-none focus:ring-2 focus:ring-[#08a045]/20 focus:border-[#08a045]/40 transition-all duration-300 font-inter"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                                        >
                                            <i className={`bi bi-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-[13px] px-1">
                            <label className="flex items-center gap-0.5 text-white/30 cursor-pointer transition-colors group">
                                <p>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</p>
                                <span className="text-[#08a045] hover:text-[#08a045]/80 transition-colors font-semibold tracking-tight"
                                    onClick={() => setIsSignUp(!isSignUp)}
                                >Sign Up</span>
                            </label>
                            {isSignUp ? null : (<span className="text-[#08a045] hover:text-[#08a045]/80 transition-colors font-semibold tracking-tight">Forgot?</span>)}
                        </div>

                        <button
                            disabled={isLoading}
                            className='group relative w-full bg-[#08a045] hover:bg-[#08a045]/90 text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#08a045]/20 active:scale-[0.98] transition-all duration-300 mt-2 overflow-hidden'
                        >
                            <div className={`flex items-center justify-center gap-2 transition-transform duration-300 ${isLoading ? '-translate-y-20' : ''}`}>
                                <span className="text-sm uppercase tracking-widest">{isSignUp ? 'Send Request' : 'Authenticate'}</span>
                                <i className="bi bi-arrow-right text-lg"></i>
                            </div>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in">
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;
