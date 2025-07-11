'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Mail, CheckCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function VerifyRequest() {
  const handleResend = () => {
    // Redirect back to sign in page
    window.location.href = '/auth/signin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">EduInnovate</span>
          </div>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription>
              We've sent a magic link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-700">
                  A secure sign-in link has been sent to your email address.
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">
                  What's next?
                </p>
                <ol className="text-sm text-gray-600 space-y-1">
                  <li>1. Open your email inbox</li>
                  <li>2. Look for an email from EduInnovate</li>
                  <li>3. Click the "Sign In" button in the email</li>
                  <li>4. You'll be automatically signed in</li>
                </ol>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> The link will expire in 10 minutes for security.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleResend}
                variant="outline"
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Resend magic link
              </Button>
              
              <Link href="/" className="block">
                <Button variant="ghost" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Can't find the email? Check your spam folder or{' '}
                <button
                  onClick={handleResend}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  try again
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}