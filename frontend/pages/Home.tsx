import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Clock, BookOpen, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const sections = [
    {
      id: 'section-a',
      title: 'Section A',
      description: 'Computer Science and Mathematics courses',
      courses: 5,
      theme: 'blue',
      path: '/section-a',
      gradient: 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
      bgAccent: 'bg-blue-50 dark:bg-blue-900/20',
      textAccent: 'text-blue-700 dark:text-blue-300'
    },
    {
      id: 'section-b',
      title: 'Section B',
      description: 'Business and Economics courses',
      courses: 5,
      theme: 'green',
      path: '/section-b',
      gradient: 'from-green-500 to-green-600 dark:from-green-600 dark:to-green-700',
      bgAccent: 'bg-green-50 dark:bg-green-900/20',
      textAccent: 'text-green-700 dark:text-green-300'
    },
    {
      id: 'section-c',
      title: 'Section C',
      description: 'Liberal Arts and Social Sciences courses',
      courses: 5,
      theme: 'orange',
      path: '/section-c',
      gradient: 'from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700',
      bgAccent: 'bg-orange-50 dark:bg-orange-900/20',
      textAccent: 'text-orange-700 dark:text-orange-300'
    }
  ];

  const stats = [
    {
      title: 'Sections',
      value: '3',
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Total Courses',
      value: '15',
      icon: BookOpen,
      color: 'green',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Weekly Hours',
      value: '40+',
      icon: Clock,
      color: 'orange',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      title: 'Holidays',
      value: '10',
      icon: Calendar,
      color: 'purple',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 sm:mb-6 animate-in fade-in-50 slide-in-from-bottom-3 duration-700">
              <Sparkles className="h-4 w-4" />
              Modern Schedule Management
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-100">
              College Schedule{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Manager
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-200">
              Organize and manage your college class schedules, track holidays, and stay on top of your academic calendar with our comprehensive scheduling system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-300">
              <Link
                to="/section-a"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/holidays"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground font-medium hover:bg-accent hover:scale-105 transform transition-all duration-200"
              >
                View Calendar
                <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={stat.title}
              className={`group hover:shadow-lg hover:scale-105 transform transition-all duration-300 border-0 shadow-md hover:shadow-xl animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-${index * 100}`}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="text-center sm:text-left">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:scale-110 transform transition-transform duration-200">
                      {stat.value}
                    </h3>
                  </div>
                  <div className={`${stat.bgColor} rounded-full p-2 sm:p-3 group-hover:scale-110 transform transition-all duration-200`}>
                    <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`} />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center justify-center sm:justify-start text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                  <span>Active</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Cards */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Class Sections</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Explore your academic journey across different disciplines and subjects
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sections.map((section, index) => (
              <Link
                key={section.id}
                to={section.path}
                className="group block animate-in fade-in-50 slide-in-from-bottom-5 duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Card className="h-full hover:shadow-xl hover:scale-105 transform transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${section.gradient}`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                        {section.title}
                      </CardTitle>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transform transition-all duration-200" />
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={`${section.bgAccent} ${section.textAccent} hover:scale-105 transform transition-transform duration-200`}>
                        {section.courses} courses
                      </Badge>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                        <Users className="h-4 w-4" />
                        <span className="hidden sm:inline">View Schedule</span>
                        <span className="sm:hidden">View</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Holiday Calendar Feature */}
        <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
          <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700" />
          
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                  <Calendar className="h-4 w-4" />
                  Holiday Management
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  Holiday Calendar
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  View academic and national holidays, plan your schedule around important dates, and never miss a break. Stay organized with our comprehensive holiday tracking system.
                </p>
                
                <Link
                  to="/holidays"
                  className="inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800 transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">View Holiday Calendar</span>
                  <span className="sm:hidden">View Calendar</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
              
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <Calendar className="h-24 w-24 sm:h-32 sm:w-32 text-purple-200 dark:text-purple-800" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-full blur-2xl" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
