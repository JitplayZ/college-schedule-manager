import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit, Trash2, Calendar, Clock, MapPin, User, Filter, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Course {
  id: string;
  name: string;
  instructor: string;
  room: string;
  time: string;
  days: string[];
  credits: number;
}

interface SchedulePageProps {
  title: string;
  data: Course[];
  theme: 'blue' | 'green' | 'orange';
  sectionId: string;
}

export default function SchedulePage({ title, data, theme, sectionId }: SchedulePageProps) {
  const [courses, setCourses] = useLocalStorage<Course[]>(`${sectionId}-courses`, data);
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDay, setFilterDay] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    room: '',
    time: '',
    days: [] as string[],
    credits: 3
  });
  const { toast } = useToast();

  const themeConfig = {
    blue: {
      gradient: 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-800 dark:text-blue-200',
      border: 'border-blue-200 dark:border-blue-800',
      accent: 'text-blue-600 dark:text-blue-400',
      cardBg: 'bg-blue-50/50 dark:bg-blue-900/10'
    },
    green: {
      gradient: 'from-green-500 to-green-600 dark:from-green-600 dark:to-green-700',
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-800 dark:text-green-200',
      border: 'border-green-200 dark:border-green-800',
      accent: 'text-green-600 dark:text-green-400',
      cardBg: 'bg-green-50/50 dark:bg-green-900/10'
    },
    orange: {
      gradient: 'from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      text: 'text-orange-800 dark:text-orange-200',
      border: 'border-orange-200 dark:border-orange-800',
      accent: 'text-orange-600 dark:text-orange-400',
      cardBg: 'bg-orange-50/50 dark:bg-orange-900/10'
    }
  };

  const config = themeConfig[theme];

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      if (searchTerm && !course.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !course.instructor.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (filterDay !== 'all' && !course.days.includes(filterDay)) {
        return false;
      }
      return true;
    });
  }, [courses, searchTerm, filterDay]);

  const dayOptions = [
    { value: 'all', label: 'All Days' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' }
  ];

  const stats = [
    {
      title: 'Total Courses',
      value: filteredCourses.length,
      icon: BarChart3,
      change: '+12%'
    },
    {
      title: 'Total Credits',
      value: filteredCourses.reduce((sum, course) => sum + course.credits, 0),
      icon: Clock,
      change: '+8%'
    },
    {
      title: 'Weekly Hours',
      value: filteredCourses.reduce((sum, course) => sum + (course.days.length * course.credits), 0),
      icon: Calendar,
      change: '+15%'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.instructor || !formData.room || !formData.time || formData.days.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingCourse) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id 
          ? { ...course, ...formData }
          : course
      ));
      toast({
        title: "Success",
        description: "Course updated successfully"
      });
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        ...formData
      };
      setCourses([...courses, newCourse]);
      toast({
        title: "Success",
        description: "Course added successfully"
      });
    }

    setIsDialogOpen(false);
    setEditingCourse(null);
    setFormData({ name: '', instructor: '', room: '', time: '', days: [], credits: 3 });
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      instructor: course.instructor,
      room: course.room,
      time: course.time,
      days: course.days,
      credits: course.credits
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
    toast({
      title: "Success",
      description: "Course deleted successfully"
    });
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const renderWeeklyView = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {days.map((day, index) => (
          <Card 
            key={day} 
            className={`hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-${index * 100}`}
          >
            <CardHeader className={`${config.bg} ${config.text} py-3`}>
              <CardTitle className="text-center text-sm font-semibold">{day}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
              {filteredCourses
                .filter(course => course.days.includes(day))
                .sort((a, b) => a.time.localeCompare(b.time))
                .map(course => (
                  <div 
                    key={`${course.id}-${day}`} 
                    className={`p-3 rounded-lg ${config.cardBg} ${config.border} border hover:shadow-md hover:scale-105 transform transition-all duration-200 cursor-pointer group`}
                    onClick={() => handleEdit(course)}
                  >
                    <h4 className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                      {course.name}
                    </h4>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.time}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {course.instructor}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {course.room}
                      </p>
                    </div>
                  </div>
                ))}
              {filteredCourses.filter(course => course.days.includes(day)).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No classes</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderTableView = () => {
    return (
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`bg-gradient-to-r ${config.gradient} text-white`}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Days</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Room</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Credits</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredCourses.map((course, index) => (
                <tr 
                  key={course.id} 
                  className={`${index % 2 === 0 ? 'bg-card' : 'bg-muted/20'} hover:bg-accent/50 transition-colors duration-200`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">{course.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      {course.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {course.days.map(day => (
                        <Badge key={day} variant="secondary" className={`${config.bg} ${config.text}`}>
                          {day.substring(0, 3)}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      {course.instructor}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      {course.room}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline">{course.credits}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(course)}
                        className="hover:bg-accent hover:scale-110 transform transition-all duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(course.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:scale-110 transform transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
            <div className={`h-1 bg-gradient-to-r ${config.gradient}`} />
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <CardTitle className="text-3xl font-bold text-foreground mb-2">{title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage your class schedule and course information
                  </CardDescription>
                </div>
                <div className={`${config.bg} rounded-full p-4`}>
                  <Calendar className={`h-8 w-8 ${config.accent}`} />
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search courses or instructors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 hover:border-accent focus:border-primary transition-colors duration-200"
                    />
                  </div>
                </div>
                
                <Select value={view} onValueChange={(value: any) => setView(value)}>
                  <SelectTrigger className="hover:border-accent focus:border-primary transition-colors duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily View</SelectItem>
                    <SelectItem value="weekly">Weekly View</SelectItem>
                    <SelectItem value="monthly">Table View</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterDay} onValueChange={setFilterDay}>
                  <SelectTrigger className="hover:border-accent focus:border-primary transition-colors duration-200">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dayOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 mr-4">
                  {stats.map((stat, index) => (
                    <div 
                      key={stat.title} 
                      className={`${config.cardBg} rounded-lg p-4 hover:scale-105 transform transition-all duration-200 animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-${index * 100}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-5 w-5 ${config.accent}`} />
                      </div>
                    </div>
                  ))}
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className={`bg-gradient-to-r ${config.gradient} hover:opacity-90 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl`}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Course
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">
                        {editingCourse ? 'Edit Course' : 'Add New Course'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium">Course Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1 hover:border-accent focus:border-primary transition-colors duration-200"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="instructor" className="text-sm font-medium">Instructor *</Label>
                          <Input
                            id="instructor"
                            value={formData.instructor}
                            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                            className="mt-1 hover:border-accent focus:border-primary transition-colors duration-200"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="room" className="text-sm font-medium">Room *</Label>
                          <Input
                            id="room"
                            value={formData.room}
                            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                            className="mt-1 hover:border-accent focus:border-primary transition-colors duration-200"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="time" className="text-sm font-medium">Time *</Label>
                          <Input
                            id="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            placeholder="e.g., 9:00 AM - 10:30 AM"
                            className="mt-1 hover:border-accent focus:border-primary transition-colors duration-200"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="credits" className="text-sm font-medium">Credits</Label>
                          <Input
                            id="credits"
                            type="number"
                            min="1"
                            max="6"
                            value={formData.credits}
                            onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                            className="mt-1 hover:border-accent focus:border-primary transition-colors duration-200"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Days *</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                            <Button
                              key={day}
                              type="button"
                              variant={formData.days.includes(day) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleDay(day)}
                              className={`hover:scale-105 transform transition-all duration-200 ${
                                formData.days.includes(day) ? `bg-gradient-to-r ${config.gradient}` : ''
                              }`}
                            >
                              {day}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button 
                          type="submit" 
                          className={`flex-1 bg-gradient-to-r ${config.gradient} hover:opacity-90 hover:scale-105 transform transition-all duration-200`}
                        >
                          {editingCourse ? 'Update' : 'Add'} Course
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setIsDialogOpen(false);
                            setEditingCourse(null);
                            setFormData({ name: '', instructor: '', room: '', time: '', days: [], credits: 3 });
                          }}
                          className="hover:scale-105 transform transition-all duration-200"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Schedule Display */}
        <div className="print:shadow-none">
          {view === 'weekly' ? renderWeeklyView() : renderTableView()}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="text-center py-16 mt-8 border-dashed border-2 hover:border-accent transition-colors duration-300">
            <CardContent>
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <CardTitle className="text-xl font-semibold text-muted-foreground mb-2">No courses found</CardTitle>
              <CardDescription className="text-muted-foreground mb-4">
                Start by adding your first course to the schedule
              </CardDescription>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className={`bg-gradient-to-r ${config.gradient} hover:opacity-90 hover:scale-105 transform transition-all duration-200`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Course
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
