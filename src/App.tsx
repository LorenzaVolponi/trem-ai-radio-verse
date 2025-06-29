import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider as LocalAuthProvider } from "@/contexts/AuthContext";
import { AuthProvider as SupabaseAuthProvider } from "@/components/auth/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import React, { Suspense, lazy } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import SupabaseWarning from './components/SupabaseWarning';

const Index = lazy(() => import('./pages/Index'));
const Auth = lazy(() => import('./pages/Auth'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <LocalAuthProvider>
          <TooltipProvider>
            <SupabaseWarning />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </LocalAuthProvider>
      </SupabaseAuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
