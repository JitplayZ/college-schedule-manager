import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, Calendar, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/section-a', label: 'Section A', icon: Users, theme: 'blue' },
    { path: '/section-b', label: 'Section B', icon: Users, theme: 'green' },
    { path: '/section-c', label: 'Section C', icon: Users, theme: 'orange' },
    { path: '/holidays', label: 'Holidays', icon: Calendar, theme: 'purple' },
  ];

  const getThemeClasses = (theme: string, isActive: boolean) => {
    const themes = {
      blue: isActive 
        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700' 
        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300',
      green: isActive 
        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700' 
        : 'hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300',
      orange: isActive 
        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-700' 
        : 'hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-700 dark:hover:text-orange-300',
      purple: isActive 
        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700' 
        : 'hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300',
    };
    return themes[theme as keyof typeof themes] || '';
  };

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border/50 fixed top-0 left-0 right-0 z-50 print:hidden shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group hover:scale-105 transform transition-all duration-200"
            >
              <div className="relative">
                <GraduationCap className="h-8 w-8 text-primary group-hover:rotate-3 transition-transform duration-200" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                College Schedule
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    flex items-center space-x-2 border border-transparent
                    hover:scale-105 active:scale-95 hover:shadow-sm
                    ${isActive ? 'border shadow-sm' : ''}
                    ${item.theme ? getThemeClasses(item.theme, isActive) : 
                      isActive ? 'bg-accent text-accent-foreground border-border' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="ml-4 pl-4 border-l border-border/50">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                      flex items-center space-x-3 border border-transparent
                      hover:scale-[1.02] active:scale-95 hover:shadow-sm
                      ${isActive ? 'border shadow-sm' : ''}
                      ${item.theme ? getThemeClasses(item.theme, isActive) : 
                        isActive ? 'bg-accent text-accent-foreground border-border' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
