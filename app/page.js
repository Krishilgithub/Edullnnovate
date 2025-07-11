'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { BookOpen, Users, Clock, Star, Search, Filter, ChevronRight, Play, CheckCircle, Mail, Phone, MapPin, Send, ArrowUp, Loader2 } from 'lucide-react'

export default function App() {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [loadingStates, setLoadingStates] = useState({})
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [contactSubmitted, setContactSubmitted] = useState(false)

  // Sample course data
  const sampleCourses = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      description: "Master modern web development with React, Node.js, and MongoDB. Build real-world projects.",
      category: "Tech",
      level: "Beginner",
      price: 99,
      duration: "8 weeks",
      thumbnail: "https://images.pexels.com/photos/159746/notebook-pen-pencil-education-159746.jpeg",
      instructor: "Sarah Johnson",
      enrollments: 1250,
      rating: 4.8,
      topics: ["React", "Node.js", "MongoDB", "JavaScript", "HTML/CSS"]
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Learn Python, statistics, and machine learning to analyze data and make predictions.",
      category: "Data",
      level: "Intermediate",
      price: 149,
      duration: "10 weeks",
      thumbnail: "https://images.pexels.com/photos/8325952/pexels-photo-8325952.jpeg",
      instructor: "Dr. Michael Chen",
      enrollments: 890,
      rating: 4.9,
      topics: ["Python", "Pandas", "Machine Learning", "Statistics", "Data Visualization"]
    },
    {
      id: 3,
      title: "Graphic Design Mastery",
      description: "Create stunning designs using Adobe Creative Suite and design principles.",
      category: "Design",
      level: "Beginner",
      price: 79,
      duration: "6 weeks",
      thumbnail: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634",
      instructor: "Emma Rodriguez",
      enrollments: 645,
      rating: 4.7,
      topics: ["Adobe Photoshop", "Adobe Illustrator", "Design Theory", "Branding", "Typography"]
    },
    {
      id: 4,
      title: "AI for Everyone",
      description: "Understand artificial intelligence and its applications in business and technology.",
      category: "Tech",
      level: "Advanced",
      price: 199,
      duration: "12 weeks",
      thumbnail: "https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg",
      instructor: "Prof. David Kim",
      enrollments: 423,
      rating: 4.9,
      topics: ["Machine Learning", "Deep Learning", "Neural Networks", "AI Ethics", "Python"]
    }
  ]

  // Handle button clicks with loading states
  const handleButtonClick = async (buttonId, action) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }))
    
    // Simulate API call or action
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (action) {
      action()
    }
    
    setLoadingStates(prev => ({ ...prev, [buttonId]: false }))
  }

  // Handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Monitor scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle contact form
  const handleContactSubmit = async (e) => {
    e.preventDefault()
    await handleButtonClick('contact-submit', () => {
      setContactSubmitted(true)
      setContactForm({ name: '', email: '', message: '' })
      setTimeout(() => setContactSubmitted(false), 3000)
    })
  }

  // Initialize courses
  useEffect(() => {
    setCourses(sampleCourses)
    setFilteredCourses(sampleCourses)
  }, [])

  // Filter courses
  useEffect(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
      
      return matchesSearch && matchesCategory && matchesLevel
    })
    setFilteredCourses(filtered)
  }, [searchTerm, selectedCategory, selectedLevel, courses])

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Software Developer",
      content: "The Web Development course transformed my career. I landed my dream job within 3 months!",
      rating: 5,
      avatar: "AT"
    },
    {
      name: "Maria Garcia",
      role: "Data Analyst",
      content: "Excellent instructors and hands-on projects. The Data Science course exceeded my expectations.",
      rating: 5,
      avatar: "MG"
    },
    {
      name: "John Smith",
      role: "UX Designer",
      content: "Perfect blend of theory and practice. The design course helped me build an amazing portfolio.",
      rating: 5,
      avatar: "JS"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">EduInnovate</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('courses')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Courses
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden sm:inline-flex">Sign In</Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => handleButtonClick('get-started', () => scrollToSection('courses'))}
                disabled={loadingStates['get-started']}
              >
                {loadingStates['get-started'] ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Get Started'
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-4 bg-teal-500 hover:bg-teal-600">🚀 New courses added weekly</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Empower Your Future with Learning Innovation
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Transform your career with our comprehensive online courses. Expert instructors, flexible learning, and personalized education paths.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                  onClick={() => handleButtonClick('start-learning', () => scrollToSection('courses'))}
                  disabled={loadingStates['start-learning']}
                >
                  {loadingStates['start-learning'] ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Start Learning Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={() => handleButtonClick('watch-demo', () => alert('Demo video coming soon!'))}
                  disabled={loadingStates['watch-demo']}
                >
                  {loadingStates['watch-demo'] ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Watch Demo
                    </>
                  )}
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-8">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-teal-300" />
                  <span className="text-sm">50K+ Students</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-400" />
                  <span className="text-sm">4.8 Rating</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-up delay-300">
              <img 
                src="https://images.unsplash.com/photo-1530825894095-9c184b068fcb" 
                alt="Modern learning with VR technology" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-xl animate-bounce">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-900">Course Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Course Catalog
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive collection of courses designed by industry experts
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 animate-fade-in-up delay-200">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Tech">Technology</SelectItem>
                    <SelectItem value="Data">Data Science</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-blue-600">
                    {course.level}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{course.category}</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.enrollments}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>By {course.instructor}</span>
                    <span className="text-lg font-bold text-blue-600">${course.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.topics.slice(0, 3).map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {course.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.topics.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleButtonClick(`enroll-${course.id}`, () => alert(`Enrolling in ${course.title}!`))}
                    disabled={loadingStates[`enroll-${course.id}`]}
                  >
                    {loadingStates[`enroll-${course.id}`] ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enrolling...
                      </>
                    ) : (
                      'Enroll Now'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful learners who transformed their careers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 animate-fade-in-up hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.content}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduInnovate?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of experience",
                color: "bg-blue-600"
              },
              {
                icon: Clock,
                title: "Flexible Learning",
                description: "Study at your own pace with lifetime access to course materials",
                color: "bg-teal-500"
              },
              {
                icon: Users,
                title: "Community Support",
                description: "Join a vibrant community of learners and get help when needed",
                color: "bg-yellow-500"
              },
              {
                icon: CheckCircle,
                title: "Certificates",
                description: "Earn recognized certificates upon course completion",
                color: "bg-purple-600"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center animate-fade-in-up hover:transform hover:scale-105 transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`${feature.color} rounded-full p-4 w-16 h-16 mx-auto mb-4`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contactSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">Thank you for your message. We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        required
                        rows={4}
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loadingStates['contact-submit']}
                    >
                      {loadingStates['contact-submit'] ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="animate-fade-in-up delay-200">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">hello@eduinnovate.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">123 Learning Street<br />San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Office Hours</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                    <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">EduInnovate</span>
              </div>
              <p className="text-gray-400">
                Empowering learners worldwide with quality education and innovative teaching methods.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Science</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI & Machine Learning</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EduInnovate. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 rounded-full p-3 shadow-lg animate-bounce"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  )
}