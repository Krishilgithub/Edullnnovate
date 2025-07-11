import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

// Custom hook to protect routes and check roles
export function useAuth({ requiredRole } = {}) {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  
  const userRole = session?.user?.role || null;
  const hasRequiredRole = !requiredRole || userRole === requiredRole;
  
  return {
    session,
    isLoading,
    isAuthenticated,
    userRole,
    hasRequiredRole,
  };
}

// Server-side auth check middleware
export async function requireAuth(auth, options = {}) {
  const { requiredRole } = options;
  const session = await auth();
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  if (requiredRole && session.user.role !== requiredRole) {
    redirect('/unauthorized');
  }
  
  return session;
}