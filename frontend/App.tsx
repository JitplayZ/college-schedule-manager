import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from './components/ThemeProvider';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import SectionA from './pages/SectionA';
import SectionB from './pages/SectionB';
import SectionC from './pages/SectionC';
import Holidays from './pages/Holidays';
import './styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppInner() {
  return (
    <Router>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/section-a" element={<SectionA />} />
            <Route path="/section-b" element={<SectionB />} />
            <Route path="/section-c" element={<SectionC />} />
            <Route path="/holidays" element={<Holidays />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppInner />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
