import React, { useState } from 'react'
import StandardNavbar from '../components/StandardNavbar'
import AlertManager from '../components/AlertManager'
import { useAuth } from '../context/AuthContext'
import AuthModal from '../components/AuthModal'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Bell, Lock, Shield, Zap } from 'lucide-react'

const AlertsPage: React.FC = () => {
  const { isAuthenticated, loading } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <StandardNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  // Show auth required message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <StandardNavbar />

        <main className="pt-16 px-4 pb-16">
          <Card className="max-w-2xl mx-auto bg-gray-900/50 border-gray-700">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Bell className="h-20 w-20 text-blue-500" />
                  <Lock className="h-8 w-8 text-yellow-500 absolute -bottom-1 -right-1 bg-gray-900 rounded-full p-1" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Sign In Required
              </CardTitle>
              <p className="text-gray-400 text-lg">
                Create an account or sign in to manage your crypto price alerts
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features */}
              <div className="grid gap-4 py-4">
                <div className="flex items-start space-x-3">
                  <Bell className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Real-Time Price Alerts</h3>
                    <p className="text-gray-400 text-sm">
                      Get instant notifications when your target prices are reached
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Zap className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Voice Call Notifications</h3>
                    <p className="text-gray-400 text-sm">
                      Receive voice calls for critical price movements
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Secure & Private</h3>
                    <p className="text-gray-400 text-sm">
                      Your data is encrypted and protected with industry-standard security
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
                  size="lg"
                >
                  Sign In / Create Account
                </Button>
              </div>

              <p className="text-center text-sm text-gray-500">
                Free to use • No credit card required
              </p>
            </CardContent>
          </Card>
        </main>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    )
  }

  // User is authenticated - show alerts manager
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <StandardNavbar />
      <main className="pt-16 px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <AlertManager />
        </div>
      </main>
    </div>
  )
}

export default AlertsPage