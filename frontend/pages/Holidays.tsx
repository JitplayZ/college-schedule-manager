import React, { useState, useMemo } from 'react';
import { Calendar, Filter, Plus, Edit, Trash2, Clock, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialHolidays } from '../data/holidayData';

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'academic' | 'national';
  description?: string;
}

export default function Holidays() {
  const [holidays, setHolidays] = useLocalStorage<Holiday[]>('holidays', initialHolidays);
  const [filter, setFilter] = useState<'all' | 'academic' | 'national'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: 'academic' as 'academic' | 'national',
    description: ''
  });
  const { toast } = useToast();

  const filteredHolidays = useMemo(() => {
    return holidays
      .filter(holiday => {
        if (filter !== 'all' && holiday.type !== filter) return false;
        if (searchTerm && !holiday.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [holidays, filter, searchTerm]);

  const upcomingHolidays = useMemo(() => {
    const now = new Date();
    return holidays
      .filter(holiday => new Date(holiday.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  }, [holidays]);

  const stats = [
    {
      title: 'Total Holidays',
      value: holidays.length,
      icon: Calendar,
      change: '+2 this month'
    },
    {
      title: 'Academic',
      value: holidays.filter(h => h.type === 'academic').length,
      icon: Sparkles,
      change: 'School events'
    },
    {
      title: 'National',
      value: holidays.filter(h => h.type === 'national').length,
      icon: TrendingUp,
      change: 'Federal holidays'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingHoliday) {
      setHolidays(holidays.map(holiday => 
        holiday.id === editingHoliday.id 
          ? { ...holiday, ...formData }
          : holiday
      ));
      toast({
        title: "Success",
        description: "Holiday updated successfully"
      });
    } else {
      const newHoliday: Holiday = {
        id: Date.now().toString(),
        ...formData
      };
      setHolidays([...holidays, newHoliday]);
      toast({
        title: "Success",
        description: "Holiday added successfully"
      });
    }

    setIsDialogOpen(false);
    setEditingHoliday(null);
    setFormData({ name: '', date: '', type: 'academic', description: '' });
  };

  const handleEdit = (holiday: Holiday) => {
    setEditingHoliday(holiday);
    setFormData({
      name: holiday.name,
      date: holiday.date,
      type: holiday.type,
      description: holiday.description || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setHolidays(holidays.filter(holiday => holiday.id !== id));
    toast({
      title: "Success",
      description: "Holiday deleted successfully"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRelativeDate = (dateString: string) => {
    const now = new Date();
    const holidayDate = new Date(dateString);
    const diffTime = holidayDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays <= 7) return `In ${diffDays} days`;
    if (diffDays <= 30) return `In ${Math.ceil(diffDays / 7)} weeks`;
    return `In ${Math.ceil(diffDays / 30)} months`;
  };

  const getTypeConfig = (type: string) => {
    return type === 'academic' 
      ? { 
          bg: 'bg-purple-100 dark:bg-purple-900/30', 
          text: 'text-purple-800 dark:text-purple-200',
          border: 'border-purple-200 dark:border-purple-800'
        }
      : { 
          bg: 'bg-blue-100 dark:bg-blue-900/30', 
          text: 'text-blue-800 dark:text-blue-200',
          border: 'border-blue-200 dark:border-blue-800'
        };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 mb-6 sm:mb-8 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700" />
          <CardHeader className="pb-4 sm:pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-3">
                  <Sparkles className="h-4 w-4" />
                  Holiday Management
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Holiday Calendar</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Academic and national holidays for the academic year
                </CardDescription>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-3 sm:p-4 flex-shrink-0">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {stats.map((stat, index) => (
                <div 
                  key={stat.title} 
                  className={`bg-purple-50/50 dark:bg-purple-900/10 rounded-lg p-3 sm:p-4 hover:scale-105 transform transition-all duration-200 animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-${index * 100}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search holidays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="hover:border-accent focus:border-primary transition-colors duration-200"
                />
              </div>
              <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                <SelectTrigger className="w-full sm:w-48 hover:border-accent focus:border-primary transition-colors duration-200">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Holidays</SelectItem>
                  <SelectItem value="academic">Academic Only</SelectItem>
                  <SelectItem value="national">National Only</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 hover:opacity-90 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Holiday
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                      {editingHoliday ? 'Edit Holiday' : 'Add New Holiday'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Holiday Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 hover:border-accent focus:border-primary transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="date" className="text-sm font-medium">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="mt-1 hover:border-accent focus:border-primary transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="type" className="text-sm font-medium">Type</Label>
                      <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger className="mt-1 hover:border-accent focus:border-primary transition-colors duration-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="national">National</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="mt-1 hover:border-accent focus:border-primary transition-colors duration-200"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button 
                        type="submit" 
                        className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 hover:opacity-90 hover:scale-105 transform transition-all duration-200"
                      >
                        {editingHoliday ? 'Update' : 'Add'} Holiday
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsDialogOpen(false);
                          setEditingHoliday(null);
                          setFormData({ name: '', date: '', type: 'academic', description: '' });
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Upcoming Holidays */}
          <div className="lg:col-span-1">
            <Card className="h-fit shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Upcoming Holidays
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {upcomingHolidays.length > 0 ? (
                  upcomingHolidays.map((holiday, index) => {
                    const typeConfig = getTypeConfig(holiday.type);
                    return (
                      <div 
                        key={holiday.id} 
                        className={`border-l-4 border-purple-500 pl-3 sm:pl-4 py-2 hover:bg-accent/20 rounded-r-lg transition-all duration-200 cursor-pointer animate-in fade-in-50 slide-in-from-left-3 duration-500 delay-${index * 100}`}
                        onClick={() => handleEdit(holiday)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors duration-200 truncate">
                              {holiday.name}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">{formatDate(holiday.date)}</p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2">
                              <Badge variant="secondary" className={`${typeConfig.bg} ${typeConfig.text} text-xs`}>
                                {holiday.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {getRelativeDate(holiday.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground text-sm">No upcoming holidays</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Holiday List */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  All Holidays ({filteredHolidays.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {filteredHolidays.length > 0 ? (
                  filteredHolidays.map((holiday, index) => {
                    const typeConfig = getTypeConfig(holiday.type);
                    return (
                      <Card 
                        key={holiday.id} 
                        className={`border-l-4 ${typeConfig.border} hover:shadow-md hover:scale-[1.02] transform transition-all duration-200 cursor-pointer animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-${index * 50}`}
                        onClick={() => handleEdit(holiday)}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 truncate">
                                  {holiday.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className={`${typeConfig.bg} ${typeConfig.text} text-xs`}>
                                    {holiday.type}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {getRelativeDate(holiday.date)}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2 flex items-center">
                                <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                                <span className="truncate">{formatDate(holiday.date)}</span>
                              </p>
                              {holiday.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2">{holiday.description}</p>
                              )}
                            </div>
                            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(holiday);
                                }}
                                className="hover:bg-accent hover:scale-110 transform transition-all duration-200 h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(holiday.id);
                                }}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:scale-110 transform transition-all duration-200 h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <Card className="border-dashed border-2 hover:border-accent transition-colors duration-300">
                    <CardContent className="text-center py-8 sm:py-12">
                      <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <CardTitle className="text-lg sm:text-xl font-semibold text-muted-foreground mb-2">
                        No holidays found
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mb-4 px-4">
                        No holidays found matching your criteria
                      </CardDescription>
                      <Button 
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 hover:opacity-90 hover:scale-105 transform transition-all duration-200"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Holiday
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
