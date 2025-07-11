import { auth } from '../../auth';
import { requireAuth } from '../../lib/auth-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  BarChart3,
  UserCheck,
  Crown
} from 'lucide-react';
import Navbar from '../../components/navbar';

export default async function AdminDashboard() {
  // Server-side auth check with admin role requirement
  const session = await requireAuth(auth, { requiredRole: 'admin' });
  
  // Mock admin data - in real app, fetch from database
  const adminData = {
    totalUsers: 1250,
    totalCourses: 24,
    totalEnrollments: 3890,
    revenue: 45250,
    recentUsers: [
      { id: 1, name: "John Doe", email: "john@example.com", role: "user", joinDate: "2024-12-01" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", joinDate: "2024-12-02" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "admin", joinDate: "2024-12-03" }
    ],
    recentCourses: [
      { id: 1, title: "Web Development Bootcamp", enrollments: 250, status: "active" },
      { id: 2, title: "Data Science Fundamentals", enrollments: 180, status: "active" },
      { id: 3, title: "AI for Everyone", enrollments: 95, status: "draft" }
    ],
    stats: {
      userGrowth: 15,
      courseCompletions: 89,
      activeUsers: 456
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Shield className="h-8 w-8 mr-3 text-purple-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your EdTech platform
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-purple-100 text-purple-800">
                <Crown className="h-3 w-3 mr-1" />
                Super Admin
              </Badge>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{adminData.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{adminData.stats.userGrowth}% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{adminData.totalCourses}</p>
                  <p className="text-xs text-blue-600">4 new this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                  <p className="text-2xl font-bold text-gray-900">{adminData.totalEnrollments.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{adminData.stats.courseCompletions}% completion rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{adminData.stats.activeUsers}</p>
                  <p className="text-xs text-blue-600">Last 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                      Course Management
                    </CardTitle>
                    <CardDescription>
                      Manage your courses and content
                    </CardDescription>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    New Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.enrollments} enrollments</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Course Creation */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Course Creation</CardTitle>
                <CardDescription>
                  Create a new course quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Title
                      </label>
                      <Input placeholder="Enter course title" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="data">Data Science</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea placeholder="Enter course description" rows={3} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($)
                      </label>
                      <Input type="number" placeholder="99" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <Input placeholder="8 weeks" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Create Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Recent Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {adminData.recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                        {user.role === 'admin' && (
                          <Shield className="h-3 w-3 text-purple-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Manage All Users
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-purple-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Admin
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Platform Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Export Reports
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email Service</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Storage</span>
                    <Badge className="bg-yellow-100 text-yellow-800">75% Used</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API</span>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}