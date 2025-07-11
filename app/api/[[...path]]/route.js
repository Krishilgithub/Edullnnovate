import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

// MongoDB connection
let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    // Root endpoint
    if (route === '/' && method === 'GET') {
      return handleCORS(NextResponse.json({ message: "EduInnovate API is running" }))
    }

    // Courses endpoints
    if (route === '/courses' && method === 'GET') {
      const courses = await db.collection('courses')
        .find({})
        .limit(100)
        .toArray()

      // Remove MongoDB's _id field from response
      const cleanedCourses = courses.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedCourses))
    }

    if (route === '/courses' && method === 'POST') {
      const body = await request.json()
      
      // Validate required fields
      if (!body.title || !body.description || !body.category || !body.level || !body.price) {
        return handleCORS(NextResponse.json(
          { error: "Missing required fields: title, description, category, level, price" }, 
          { status: 400 }
        ))
      }

      const course = {
        id: uuidv4(),
        title: body.title,
        description: body.description,
        category: body.category,
        level: body.level,
        price: parseFloat(body.price),
        duration: body.duration || "8 weeks",
        thumbnail: body.thumbnail || "",
        instructor: body.instructor || "TBD",
        enrollments: 0,
        rating: 0,
        topics: body.topics || [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection('courses').insertOne(course)
      
      // Return course without _id
      const { _id, ...courseResponse } = course
      return handleCORS(NextResponse.json(courseResponse, { status: 201 }))
    }

    // Single course endpoint
    if (route.startsWith('/courses/') && method === 'GET') {
      const courseId = route.split('/courses/')[1]
      const course = await db.collection('courses').findOne({ id: courseId })
      
      if (!course) {
        return handleCORS(NextResponse.json(
          { error: "Course not found" }, 
          { status: 404 }
        ))
      }

      // Remove MongoDB's _id field from response
      const { _id, ...courseResponse } = course
      return handleCORS(NextResponse.json(courseResponse))
    }

    // Users endpoints
    if (route === '/users' && method === 'GET') {
      const users = await db.collection('users')
        .find({})
        .limit(100)
        .toArray()

      // Remove MongoDB's _id field and sensitive info from response
      const cleanedUsers = users.map(({ _id, password, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedUsers))
    }

    if (route === '/users' && method === 'POST') {
      const body = await request.json()
      
      // Validate required fields
      if (!body.email || !body.name) {
        return handleCORS(NextResponse.json(
          { error: "Missing required fields: email, name" }, 
          { status: 400 }
        ))
      }

      // Check if user already exists
      const existingUser = await db.collection('users').findOne({ email: body.email })
      if (existingUser) {
        return handleCORS(NextResponse.json(
          { error: "User with this email already exists" }, 
          { status: 409 }
        ))
      }

      const user = {
        id: uuidv4(),
        email: body.email,
        name: body.name,
        role: body.role || "User",
        enrolledCourses: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection('users').insertOne(user)
      
      // Return user without _id
      const { _id, ...userResponse } = user
      return handleCORS(NextResponse.json(userResponse, { status: 201 }))
    }

    // Course enrollment endpoint
    if (route.startsWith('/courses/') && route.endsWith('/enroll') && method === 'POST') {
      const courseId = route.split('/courses/')[1].split('/enroll')[0]
      const body = await request.json()
      
      if (!body.userId) {
        return handleCORS(NextResponse.json(
          { error: "Missing required field: userId" }, 
          { status: 400 }
        ))
      }

      // Check if course exists
      const course = await db.collection('courses').findOne({ id: courseId })
      if (!course) {
        return handleCORS(NextResponse.json(
          { error: "Course not found" }, 
          { status: 404 }
        ))
      }

      // Check if user exists
      const user = await db.collection('users').findOne({ id: body.userId })
      if (!user) {
        return handleCORS(NextResponse.json(
          { error: "User not found" }, 
          { status: 404 }
        ))
      }

      // Create enrollment record
      const enrollment = {
        id: uuidv4(),
        userId: body.userId,
        courseId: courseId,
        enrolledAt: new Date(),
        progress: 0,
        completed: false
      }

      await db.collection('enrollments').insertOne(enrollment)
      
      // Update course enrollment count
      await db.collection('courses').updateOne(
        { id: courseId },
        { $inc: { enrollments: 1 } }
      )

      // Return enrollment without _id
      const { _id, ...enrollmentResponse } = enrollment
      return handleCORS(NextResponse.json(enrollmentResponse, { status: 201 }))
    }

    // User enrollments endpoint
    if (route.startsWith('/users/') && route.endsWith('/enrollments') && method === 'GET') {
      const userId = route.split('/users/')[1].split('/enrollments')[0]
      
      const enrollments = await db.collection('enrollments')
        .find({ userId: userId })
        .toArray()

      // Get course details for each enrollment
      const enrichedEnrollments = await Promise.all(
        enrollments.map(async (enrollment) => {
          const course = await db.collection('courses').findOne({ id: enrollment.courseId })
          return {
            ...enrollment,
            course: course ? { _id: undefined, ...course } : null
          }
        })
      )

      // Remove MongoDB's _id field from response
      const cleanedEnrollments = enrichedEnrollments.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedEnrollments))
    }

    // Status endpoints (keeping original functionality)
    if (route === '/status' && method === 'POST') {
      const body = await request.json()
      
      if (!body.client_name) {
        return handleCORS(NextResponse.json(
          { error: "client_name is required" }, 
          { status: 400 }
        ))
      }

      const statusObj = {
        id: uuidv4(),
        client_name: body.client_name,
        timestamp: new Date()
      }

      await db.collection('status_checks').insertOne(statusObj)
      
      // Return status without _id
      const { _id, ...statusResponse } = statusObj
      return handleCORS(NextResponse.json(statusResponse))
    }

    if (route === '/status' && method === 'GET') {
      const statusChecks = await db.collection('status_checks')
        .find({})
        .limit(1000)
        .toArray()

      // Remove MongoDB's _id field from response
      const cleanedStatusChecks = statusChecks.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedStatusChecks))
    }

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` }, 
      { status: 404 }
    ))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute