import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import EmailProvider from 'next-auth/providers/email';
import clientPromise from './lib/mongodb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role to JWT token when user signs in
      if (user) {
        token.role = user.role || 'user'; // Default to 'user' if no role is set
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role and id to session from JWT token
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  providers: [
    EmailProvider({
      server: {
        host: 'smtp.resend.com',
        port: 465,
        auth: {
          user: 'resend',
          pass: process.env.RESEND_API_KEY,
        },
      },
      from: process.env.EMAIL_FROM,
      // Custom sendVerificationRequest function using Resend
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { from },
      }) {
        try {
          const { data, error } = await resend.emails.send({
            from,
            to: email,
            subject: 'Sign in to EduInnovate',
            html: `
              <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; color: #333; background-color: #f8fafc;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #1e3a8a; margin-bottom: 10px; font-size: 24px;">📚 EduInnovate</h1>
                    <h2 style="color: #4a5568; margin-bottom: 20px; font-size: 20px;">Welcome back to learning!</h2>
                  </div>
                  
                  <p style="margin-bottom: 20px; font-size: 16px; line-height: 1.6;">
                    Click the button below to securely sign in to your EduInnovate account and continue your learning journey.
                  </p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${url}" style="background: linear-gradient(to right, #1e3a8a, #2dd4bf); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                      🚀 Sign In to EduInnovate
                    </a>
                  </div>
                  
                  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    <p style="font-size: 14px; color: #718096; margin-bottom: 10px;">
                      <strong>Security Notice:</strong> This link will expire in 10 minutes for your security.
                    </p>
                    <p style="font-size: 14px; color: #718096; margin-bottom: 10px;">
                      If you didn't request this sign-in link, you can safely ignore this email.
                    </p>
                    <p style="font-size: 14px; color: #718096;">
                      Need help? Contact our support team at hello@eduinnovate.com
                    </p>
                  </div>
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                  <p style="font-size: 12px; color: #a0aec0;">
                    © 2025 EduInnovate. Empowering learners worldwide.
                  </p>
                </div>
              </body>
            `,
          });

          if (error) {
            throw new Error(`Error sending verification email: ${error.message}`);
          }
          
          console.log(`✅ Verification email sent to ${email}`);
        } catch (error) {
          console.error('❌ Error sending verification email', error);
          throw new Error(`Error sending verification email: ${error.message}`);
        }
      },
    }),
  ],
  events: {
    async createUser({ user }) {
      // Set default role for new users
      const db = (await clientPromise).db();
      await db.collection('users').updateOne(
        { _id: user.id },
        { $set: { role: 'user' } }
      );
    },
  },
});