import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Sparkles, Check } from 'lucide-react';
import { UserProfile, ViewMode } from '../../types';

interface AuthPageProps {
  onLoginSuccess: (user?: Partial<UserProfile>) => void;
  onNavigate: (view: ViewMode) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('elena.r@example.com');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('Elena Rostova');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      email,
      name: isRegister ? fullName : 'Elena Rostova',
      firstName: isRegister ? fullName.split(' ')[0] : 'Elena',
      lastName: isRegister ? fullName.split(' ')[1] || '' : 'Rostova',
    });
  };

  const handleGoogleLogin = () => {
    onLoginSuccess({
      email: 'elena.rostova@gmail.com',
      name: 'Elena Rostova',
      firstName: 'Elena',
      lastName: 'Rostova',
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-stretch bg-white">
      {/* Left Column: Botanical Artwork Image (Screenshot 7) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#171b17] overflow-hidden items-end p-12">
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85"
          alt="Dew on botanical leaf"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 space-y-3 text-white max-w-md">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#9db49b]">
            Botanical Clarity
          </span>
          <h2 className="font-serif text-3xl font-light leading-snug">
            "Return to pure. Experience skincare designed to restore harmony to your natural state."
          </h2>
          <p className="text-xs text-[#a0aba0]">— The Lumina Botanical Standard</p>
        </div>
      </div>

      {/* Right Column: Sign In / Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 max-w-xl mx-auto">
        {/* Top return link */}
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs text-[#516050] font-medium hover:underline mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Store</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="font-serif text-2xl font-bold tracking-widest text-[#1c1b1b]">
              LUMINA
            </span>
            <h1 className="font-serif text-3xl text-[#1c1b1b] font-normal">
              {isRegister ? 'Begin Your Ritual' : 'Welcome Back'}
            </h1>
            <p className="text-xs text-[#747872]">
              {isRegister
                ? 'Create an account to track your orders and calibrate your skin profile.'
                : 'Enter your credentials to access your sanctuary orders and wishlist.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isRegister && (
              <div className="space-y-1">
                <label className="font-medium text-[#444842]">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Elena Rostova"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-medium text-[#444842]">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl px-3.5 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="font-medium text-[#444842]">Password</label>
                {!isRegister && (
                  <span className="text-[11px] text-[#516050] hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#fcf9f8] border border-[#c4c8c0] rounded-xl pl-3.5 pr-10 py-2.5 text-[#1c1b1b] focus:outline-none focus:border-[#516050]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#516050] text-white hover:bg-[#435042] rounded-xl text-xs font-semibold uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 group"
            >
              <span>{isRegister ? 'Create Sanctuary Account' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Social Sign In */}
          <div className="space-y-3 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#ece8e5] w-full" />
              <span className="bg-white px-3 text-[11px] text-[#747872] uppercase tracking-wider absolute">
                Or Continue With
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 px-4 border border-[#c4c8c0] rounded-xl text-xs font-medium text-[#1c1b1b] hover:bg-[#fcf9f8] transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Toggle between register and login */}
          <div className="text-center text-xs text-[#747872] pt-2">
            {isRegister ? (
              <p>
                Already have a sanctuary account?{' '}
                <button
                  onClick={() => setIsRegister(false)}
                  className="font-semibold text-[#516050] hover:underline"
                >
                  Sign in here
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsRegister(true)}
                  className="font-semibold text-[#516050] hover:underline"
                >
                  Create one now
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-8 text-[11px] text-[#747872] text-center">
          By signing in, you agree to Lumina Skin's Botanical Terms of Service and Privacy Sanctuary.
        </div>
      </div>
    </div>
  );
};
