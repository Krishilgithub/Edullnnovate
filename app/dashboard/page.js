import { auth } from '../../auth';
import { requireAuth } from '../../lib/auth-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Users, Trophy, Star, ArrowRight, Play, CheckCircle } from 'lucide-react';
import Navbar from '../../components/navbar';
import Link from 'next/link';

export default async function UserDashboard() {
  // Server-side auth check
  const session = await requireAuth(auth);
  const isAdmin = session.user.role === 'admin';
  
  // Mock user data - in real app, fetch from database
  const userData = {
    name: session.user.name || session.user.email.split('@')[0],
    email: session.user.email,
    role: session.user.role,
    joinDate: new Date('2024-01-15'),
    totalCourses: 3,
    completedCourses: 1,
    totalLearningTime: 45,
    currentStreak: 12,
    enrolledCourses: [
      {
        id: 1,
        title: "Web Development Bootcamp",
        progress: 75,
        totalLessons: 48,
        completedLessons: 36,
        instructor: "Sarah Johnson",
        nextLesson: "Advanced React Hooks",
        estimatedTime: "45 min",
        thumbnail: "https://images.pexels.com/photos/159746/notebook-pen-pencil-education-159746.jpeg"
      },
      {
        id: 2,
        title: "Data Science Fundamentals",
        progress: 30,
        totalLessons: 64,
        completedLessons: 19,
        instructor: "Dr. Michael Chen",
        nextLesson: "Python Data Structures",
        estimatedTime: "35 min",
        thumbnail: "https://images.pexels.com/photos/8325952/pexels-photo-8325952.jpeg"
      },
      {
        id: 3,
        title: "Graphic Design Mastery",
        progress: 100,
        totalLessons: 32,
        completedLessons: 32,
        instructor: "Emma Rodriguez",
        nextLesson: "Course Complete!",
        estimatedTime: "0 min",
        thumbnail: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634"
      }
    ],
    achievements: [
      { id: 1, title: "First Course Complete", icon: "🎉", date: "2024-12-01" },
      { id: 2, title: "Learning Streak", icon: "🔥", date: "2024-12-15" },
      { id: 3, title: "Quick Learner", icon: "⚡", date: "2024-12-20" }
    ],
    recommendedCourses: [
      {
        id: 4,
        title: "AI for Everyone",
        description: "Understand artificial intelligence applications",
        level: "Advanced",
        rating: 4.9,
        price: 199,
        thumbnail: "https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {userData.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Continue your learning journey
              </p>
            </div>
            {isAdmin && (
              <Link href="/admin">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.completedCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Learning Time</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.totalLearningTime}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.currentStreak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  My Courses
                </CardTitle>
                <CardDescription>
                  Continue where you left off
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.enrolledCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">by {course.instructor}</p>
                      <div className="flex items-center mt-2">
                        <Progress value={course.progress} className="flex-1 mr-3" />
                        <span className="text-sm font-medium text-gray-600">
                          {course.progress}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {course.completedLessons}/{course.totalLessons} lessons completed
                      </p>
                    </div>
                    <div className="text-right">
                      {course.progress === 100 ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                      ) : (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Play className="h-3 w-3 mr-1" />
                          Continue
                        </Button>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {course.nextLesson}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userData.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-600">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-purple-600" />
                  Recommended
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userData.recommendedCourses.map((course) => (
                  <div key={course.id} className="space-y-3">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">${course.price}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Enroll Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/#courses">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Courses
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/#contact">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Get Help
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}