import { useState } from 'react'
import {
  FaArrowRight,
  FaBagShopping,
  FaCheck,
  FaCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldHalved,
  FaStar,
  FaTruckFast,
  FaUser,
} from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link, useLocation, useNavigate } from 'react-router'
import { authApi, useAuth } from '../contexts/AuthContext'
import { saveCartItemForUser } from '../contexts/CartContext'
import { signInWithGoogle } from '../lib/firebase'

const fieldClass = 'mt-2 h-12 w-full rounded-xl border border-white/70 bg-white/80 px-4 text-gray-900 shadow-sm outline-none backdrop-blur transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100'

const passwordRules = password => {
  const byteLength = new TextEncoder().encode(password).length
  const hasUpperAndLower = /[a-z]/.test(password) && /[A-Z]/.test(password)
  const hasNumberOrSymbol = /[\d\W_]/.test(password)
  const score = (password.length >= 12 ? 1 : 0)
    + (hasUpperAndLower ? 1 : 0)
    + (/\d/.test(password) ? 1 : 0)
    + (/[^\da-z]/i.test(password) ? 1 : 0)

  return {
    byteLength,
    hasUpperAndLower,
    hasNumberOrSymbol,
    score,
    meetsBackendRules: password.length >= 12 && byteLength <= 72,
    strength: byteLength > 72
      ? 'Too long'
      : score >= 4
        ? 'Strong'
        : score >= 3
          ? 'Getting stronger'
          : password
            ? 'Needs more strength'
            : 'Start typing',
  }
}

const AuthPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [mode, setMode] = useState(() => location.pathname === '/register' ? 'register' : 'login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [googleBusy, setGoogleBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const { setSession } = useAuth()
  const loginState = location.state || {}
  const passwordStatus = passwordRules(password)
  const passwordCriteria = [
    ['At least 12 characters', password.length >= 12],
    ['No more than 72 bytes', passwordStatus.byteLength <= 72],
    ['Upper & lowercase letters', passwordStatus.hasUpperAndLower],
    ['A number or symbol', passwordStatus.hasNumberOrSymbol],
  ]

  const finishSignIn = session => {
    setSession(session)
    if (loginState.pendingCartItem) {
      saveCartItemForUser(session.user.id, loginState.pendingCartItem)
    }
    navigate(loginState.from || '/dashboard', { replace: true })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setBusy(true)
    setError('')
    setNotice('')
    try {
      if (mode === 'register') {
        await authApi.signup({ name, email, password })
        setMode('verify')
        setNotice('Account created. Enter the six-digit verification code sent to your email.')
      } else if (mode === 'verify') {
        const session = await authApi.verifyEmail({ email, code })
        finishSignIn(session)
      } else {
        const session = await authApi.login({ email, password })
        finishSignIn(session)
      }
    } catch (requestError) {
      setError(requestError.message)
      if (requestError.code === 'EMAIL_NOT_VERIFIED') {
        setMode('verify')
        setNotice('Verify your email address to finish signing in.')
      }
    } finally {
      setBusy(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleBusy(true)
    setError('')
    setNotice('')
    try {
      const idToken = await signInWithGoogle()
      const session = await authApi.google(idToken)
      finishSignIn(session)
    } catch (requestError) {
      if (requestError.code !== 'auth/popup-closed-by-user' && requestError.code !== 'auth/cancelled-popup-request') {
        const firebaseErrors = {
          'auth/configuration-not-found': 'Firebase Authentication is not configured for this project. In Firebase Console, open Authentication, select Get started, enable Google under Sign-in method, and save.',
          'auth/operation-not-allowed': 'Google sign-in is disabled for this Firebase project. Enable Google under Firebase Console → Authentication → Sign-in method.',
          'auth/unauthorized-domain': 'This website is not authorized for Firebase sign-in. Add its host under Firebase Console → Authentication → Settings → Authorized domains.',
          'auth/api-key-not-valid': 'The Firebase API key is invalid for this web app. Copy the Web API key from the Firebase project used by this app.',
        }
        setError(firebaseErrors[requestError.code] || requestError.message || 'Google sign-in could not be completed.')
      }
    } finally {
      setGoogleBusy(false)
    }
  }

  const switchMode = nextMode => {
    setMode(nextMode)
    setError('')
    setNotice('')
  }

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#eaf7ff] px-4 py-12 sm:px-6 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-28 h-120 w-120 rounded-full bg-cyan-300/60 blur-[100px]" />
        <div className="absolute -bottom-40 -right-24 h-136 w-136 rounded-full bg-blue-400/45 blur-[110px]" />
        <div className="absolute left-[43%] top-[12%] h-56 w-56 rounded-full bg-violet-300/35 blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(14,116,144,0.12)_1px,transparent_0)] bg-size-[26px_26px] opacity-40" />
      </div>

      <section className="grid w-full max-w-6xl overflow-hidden rounded-4xl border border-white/70 bg-white/55 shadow-[0_35px_100px_-35px_rgba(14,116,144,0.4)] backdrop-blur-2xl md:min-h-162.5 md:grid-cols-[1fr_1fr]">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-[#082f49]/95 via-[#075985]/90 to-[#1d4ed8]/90 p-10 text-white md:flex lg:p-14">
          <div aria-hidden="true" className="absolute -right-24 -top-20 h-80 w-80 rounded-full border border-white/10 bg-cyan-200/10 blur-sm" />
          <div aria-hidden="true" className="absolute -bottom-40 -left-24 h-104 w-104 rounded-full border border-white/10 bg-blue-300/10" />
          <div aria-hidden="true" className="absolute right-10 top-1/3 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />

          <Link to="/" className="relative z-10 inline-flex items-center gap-3 text-2xl font-black tracking-tight">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur"><FaBagShopping className="text-cyan-100" /></span>
            <span>Avenza<span className="text-cyan-200"> Shop</span></span>
          </Link>

          <div className="relative z-10 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur">
              <FaStar className="text-amber-300" /> Your feel-good finds
            </div>
            <h1 className="mt-6 max-w-lg text-4xl font-black leading-[1.08] tracking-tight lg:text-5xl">
              Good things are just around the corner.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-cyan-50/80">
              Sign in to pick up where you left off, keep your cart close, and enjoy a smoother way to shop.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-lg">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/15 text-cyan-100"><FaShieldHalved /></span>
                <span><strong className="block text-sm">Safe checkout</strong><small className="text-xs text-cyan-100/70">Protected payments</small></span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-lg">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/15 text-cyan-100"><FaTruckFast /></span>
                <span><strong className="block text-sm">Easy shopping</strong><small className="text-xs text-cyan-100/70">Your picks, saved</small></span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-5 text-xs text-cyan-100/70">
            <span>Thoughtful finds. Smoother days.</span>
            <span className="flex gap-1 text-amber-300"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
          </div>
        </div>

        <div className="relative p-6 sm:p-10 md:p-10 lg:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-6 h-48 w-48 rounded-full bg-cyan-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-black text-cyan-900 md:hidden"><FaBagShopping /> Avenza Shop</Link>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-700">
            {mode === 'register' ? 'Create your account' : mode === 'verify' ? 'Email verification' : 'Welcome back'}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {mode === 'register' ? 'Join Avenza' : mode === 'verify' ? 'Check your inbox' : 'Sign in'}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {mode === 'verify'
              ? `We sent a verification code to ${email}.`
              : mode === 'register'
                ? 'Create an account to save your cart and access your dashboard.'
                : 'Sign in to access your cart and account dashboard.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {mode === 'register' && (
              <label className="block text-sm font-bold text-slate-700">
                Full name
                <span className="relative block"><FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" /><input className={`${fieldClass} px-7`} value={name} onChange={event => setName(event.target.value)} autoComplete="name" required maxLength={100} placeholder="Your name" /></span>
              </label>
            )}
            {mode !== 'verify' && (
              <>
                <label className="block text-sm font-bold text-slate-700">
                  Email address
                  <span className="relative block"><FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" /><input className={`${fieldClass} px-7`} type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" required maxLength={254} placeholder="you@example.com" /></span>
                </label>
                <div>
                  <label htmlFor="auth-password" className="block text-sm font-bold text-slate-700">Password</label>
                  <span className="relative block">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
                    <input id="auth-password" className={`${fieldClass} px-7`} type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} required minLength={mode === 'register' ? 12 : 1} maxLength={72} placeholder={mode === 'register' ? 'Create a secure password' : 'Enter your password'} />
                    <button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </span>
                  {password && (
                    <div className="mt-3 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-slate-700">Password strength</span>
                        <span className={`text-xs font-extrabold ${passwordStatus.strength === 'Strong' ? 'text-emerald-700' : passwordStatus.strength === 'Too long' ? 'text-rose-600' : 'text-cyan-800'}`} aria-live="polite">
                          {passwordStatus.strength}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-1.5" aria-hidden="true">
                        {[1, 2, 3, 4].map(level => (
                          <span key={level} className={`h-1.5 flex-1 rounded-full transition-colors ${passwordStatus.score >= level && passwordStatus.byteLength <= 72 ? passwordStatus.score >= 4 ? 'bg-emerald-500' : 'bg-cyan-500' : 'bg-slate-200'}`} />
                        ))}
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
                        {passwordCriteria.map(([label, passed], index) => {
                          const required = index < 2
                          return (
                            <span key={label} className={`flex items-center gap-2 text-[11px] font-medium ${passed ? 'text-emerald-700' : required ? 'text-slate-500' : 'text-slate-400'}`}>
                              {passed ? <FaCheck className="shrink-0 text-[10px]" /> : <FaCircle className="shrink-0 text-[5px]" />}
                              {label}
                            </span>
                          )
                        })}
                      </div>
                      <p className="mt-2 text-[10px] leading-4 text-slate-400">
                        {mode === 'register'
                          ? 'The first two checks match our account password limits; extra character types make it stronger.'
                          : 'Password tips update as you type. Your existing password is checked securely when you sign in.'}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
            {mode === 'verify' && (
              <label className="block text-sm font-bold text-slate-700">
                Six-digit verification code
                <input className={`${fieldClass} text-center text-lg font-bold tracking-[0.5em]`} value={code} onChange={event => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" required />
              </label>
            )}
            {error && <p className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">{error}</p>}
            {notice && <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">{notice}</p>}
            <button type="submit" disabled={busy || googleBusy || (mode === 'register' && !passwordStatus.meetsBackendRules)} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-cyan-700 via-sky-700 to-blue-700 font-bold text-white shadow-lg shadow-cyan-800/25 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-55">
              {busy ? 'Please wait...' : mode === 'register' ? 'Create account' : mode === 'verify' ? 'Verify and sign in' : 'Sign in'}
              {!busy && <FaArrowRight />}
            </button>
          </form>

          {mode !== 'verify' && (
            <>
              <div className="my-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                <span>or continue with</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={busy || googleBusy}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white/80 font-bold text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-md disabled:cursor-wait disabled:opacity-60"
              >
                <FcGoogle className="text-xl" />
                {googleBusy ? 'Connecting to Google...' : `Continue with Google`}
              </button>
            </>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            {mode === 'verify' ? (
              <button type="button" onClick={() => switchMode('login')} className="font-bold text-cyan-800 hover:text-blue-800">Back to sign in</button>
            ) : mode === 'register' ? (
              <>Already have an account? <button type="button" onClick={() => switchMode('login')} className="font-bold text-cyan-800 hover:text-blue-800">Sign in</button></>
            ) : (
              <>New to Avenza? <button type="button" onClick={() => switchMode('register')} className="font-bold text-cyan-800 hover:text-blue-800">Create account</button></>
            )}
          </div>
          <Link to="/" className="mt-6 block text-center text-xs font-semibold text-gray-400 transition hover:text-cyan-700">Continue shopping</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AuthPage
