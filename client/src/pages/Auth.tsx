import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../context/AuthContext'
import { Loader2, Mail, Lock, User as UserIcon, ArrowLeft, Shield, Bell, TrendingUp } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) {
          toast({
            title: 'Sign In Failed',
            description: error,
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully signed in.',
          })
          navigate('/dashboard')
        }
      } else {
        const { error } = await signUp(email, password, fullName)
        if (error) {
          toast({
            title: 'Sign Up Failed',
            description: error,
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Account Created!',
            description: 'Please check your email to verify your account.',
          })
          setMode('signin')
        }
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1426] via-[#0F1837] to-[#1A1B3A] flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3861FB] rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#16C784] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-[#EA3943] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <Link to="/" className="inline-flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-[#3861FB] to-[#4F46E5] p-3 rounded-xl">
              <img 
                src="/cryptoAlarmLogo.png" 
                alt="CryptoAlarm Logo" 
                width={32} 
                height={32} 
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">CryptoAlarm</h1>
              <p className="text-gray-400">Professional Crypto Monitoring</p>
            </div>
          </Link>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Never Miss a<br />
              <span className="text-[#3861FB]">Crypto Move</span>
            </h2>
            
            <p className="text-lg text-gray-300">
              Get instant voice call alerts when your crypto price targets are reached. Professional monitoring with real-time notifications.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-[#3861FB]/20 p-2 rounded-lg">
                  <Bell className="h-5 w-5 text-[#3861FB]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Smart Alerts</h3>
                  <p className="text-gray-400 text-sm">Set price targets for 11+ cryptocurrencies</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#16C784]/20 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-[#16C784]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Real-time Monitoring</h3>
                  <p className="text-gray-400 text-sm">Live price updates every 2 seconds</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#EA3943]/20 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-[#EA3943]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Secure & Reliable</h3>
                  <p className="text-gray-400 text-sm">24/7 monitoring with voice notifications</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-lg">
          <CardHeader className="space-y-1">
            <Link to="/" className="lg:hidden flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400">Back to home</span>
            </Link>
            
            <CardTitle className="text-2xl font-bold text-white">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {mode === 'signin' 
                ? 'Sign in to access your crypto alerts' 
                : 'Start monitoring your crypto portfolio today'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-200">
                    Full Name
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      required={mode === 'signup'}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    required
                    minLength={6}
                  />
                </div>
                {mode === 'signup' && (
                  <p className="text-xs text-gray-400">Must be at least 6 characters</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#3861FB] hover:bg-[#2851FB] text-white h-11"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  mode === 'signin' ? 'Sign In' : 'Sign Up'
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900/50 text-gray-400">or</span>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-[#3861FB] hover:text-[#2851FB] font-medium text-sm"
                >
                  {mode === 'signin' 
                    ? "Don't have an account? Sign up" 
                    : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Auth
