"use client";

import Navigation from "@/components/ui/navigation";

import { SignInCard } from "@/features/auth/components/sign-in-card";

const SignInPage = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        {/* Background Pattern */}
        <div className="bg-grid-slate-100 absolute inset-0 -z-10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        {/* Main Content */}
        <div className="relative z-10 flex min-h-screen items-center justify-center p-3 sm:p-4 lg:p-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
              {/* Left Side - Header Content */}
              <div className="space-y-4 text-left">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-200/50 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 shadow-lg sm:h-16 sm:w-16">
                  <span className="text-2xl sm:text-3xl">✨</span>
                </div>
                <div className="space-y-3">
                  <h1 className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-4xl leading-tight font-bold text-transparent sm:text-5xl lg:text-6xl">
                    Welcome Back
                  </h1>
                  <p className="max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl">
                    Sign in to your account and continue building amazing
                    partnerships in the creator economy.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium">
                      Access your dashboard
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium">
                      Manage partnerships
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium">
                      Track performance
                    </span>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/50 bg-white/60 px-4 py-2 text-sm text-slate-500 backdrop-blur-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                    Secure • Fast • Reliable
                  </div>
                </div>
              </div>

              {/* Right Side - Sign In Form */}
              <div className="flex justify-center lg:justify-end">
                <SignInCard />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-16 left-8 -z-10 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/20 blur-3xl" />
        <div className="absolute right-8 bottom-16 -z-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-3xl" />
      </div>
    </>
  );
};

export default SignInPage;
