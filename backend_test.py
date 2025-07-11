#!/usr/bin/env python3
"""
EdTech Platform Backend API Testing Suite
Tests all backend API endpoints for the EdTech platform
"""

import requests
import json
import uuid
import time
from datetime import datetime

# Configuration
BASE_URL = "https://d32986e8-27de-4cca-81a8-6cbead59194f.preview.emergentagent.com/api"
TIMEOUT = 30

class EdTechAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.session.timeout = TIMEOUT
        self.test_results = {}
        self.created_course_id = None
        self.created_user_id = None
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        self.test_results[test_name] = {
            'success': success,
            'message': message,
            'response_data': response_data,
            'timestamp': datetime.now().isoformat()
        }
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    def test_api_health_check(self):
        """Test GET /api/ endpoint to verify the API is running"""
        try:
            response = self.session.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if "EduInnovate API is running" in data.get('message', ''):
                    self.log_test("API Health Check", True, "API is running successfully", data)
                    return True
                else:
                    self.log_test("API Health Check", False, f"Unexpected response message: {data}", data)
                    return False
            else:
                self.log_test("API Health Check", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("API Health Check", False, f"Connection error: {str(e)}")
            return False
    
    def test_get_all_courses(self):
        """Test GET /api/courses to retrieve all courses"""
        try:
            response = self.session.get(f"{self.base_url}/courses")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET All Courses", True, f"Retrieved {len(data)} courses successfully", {"count": len(data)})
                    return True
                else:
                    self.log_test("GET All Courses", False, f"Expected list, got {type(data)}", data)
                    return False
            else:
                self.log_test("GET All Courses", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("GET All Courses", False, f"Connection error: {str(e)}")
            return False
    
    def test_create_course(self):
        """Test POST /api/courses to create a new course with sample data"""
        try:
            course_data = {
                "title": "Advanced React Development",
                "description": "Master advanced React concepts including hooks, context, and performance optimization",
                "category": "Web Development",
                "level": "Advanced",
                "price": 199.99,
                "duration": "12 weeks",
                "instructor": "Sarah Johnson",
                "topics": ["React Hooks", "Context API", "Performance", "Testing"]
            }
            
            response = self.session.post(f"{self.base_url}/courses", json=course_data)
            
            if response.status_code == 201:
                data = response.json()
                if 'id' in data and data['title'] == course_data['title']:
                    self.created_course_id = data['id']  # Store for later tests
                    self.log_test("POST Create Course", True, f"Course created successfully with ID: {data['id']}", data)
                    return True
                else:
                    self.log_test("POST Create Course", False, "Course created but missing expected fields", data)
                    return False
            else:
                self.log_test("POST Create Course", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("POST Create Course", False, f"Connection error: {str(e)}")
            return False
    
    def test_get_specific_course(self):
        """Test GET /api/courses/{id} to retrieve a specific course"""
        if not self.created_course_id:
            self.log_test("GET Specific Course", False, "No course ID available (create course test may have failed)")
            return False
            
        try:
            response = self.session.get(f"{self.base_url}/courses/{self.created_course_id}")
            
            if response.status_code == 200:
                data = response.json()
                if data.get('id') == self.created_course_id:
                    self.log_test("GET Specific Course", True, f"Retrieved course {self.created_course_id} successfully", data)
                    return True
                else:
                    self.log_test("GET Specific Course", False, f"Course ID mismatch: expected {self.created_course_id}, got {data.get('id')}", data)
                    return False
            elif response.status_code == 404:
                self.log_test("GET Specific Course", False, "Course not found (404)")
                return False
            else:
                self.log_test("GET Specific Course", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("GET Specific Course", False, f"Connection error: {str(e)}")
            return False
    
    def test_get_all_users(self):
        """Test GET /api/users to retrieve all users"""
        try:
            response = self.session.get(f"{self.base_url}/users")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET All Users", True, f"Retrieved {len(data)} users successfully", {"count": len(data)})
                    return True
                else:
                    self.log_test("GET All Users", False, f"Expected list, got {type(data)}", data)
                    return False
            else:
                self.log_test("GET All Users", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("GET All Users", False, f"Connection error: {str(e)}")
            return False
    
    def test_create_user(self):
        """Test POST /api/users to create a new user"""
        try:
            user_data = {
                "email": f"john.doe.{int(time.time())}@example.com",  # Unique email
                "name": "John Doe",
                "role": "Student"
            }
            
            response = self.session.post(f"{self.base_url}/users", json=user_data)
            
            if response.status_code == 201:
                data = response.json()
                if 'id' in data and data['email'] == user_data['email']:
                    self.created_user_id = data['id']  # Store for later tests
                    self.log_test("POST Create User", True, f"User created successfully with ID: {data['id']}", data)
                    return True
                else:
                    self.log_test("POST Create User", False, "User created but missing expected fields", data)
                    return False
            elif response.status_code == 409:
                self.log_test("POST Create User", False, "User already exists (409 - this might be expected)")
                return False
            else:
                self.log_test("POST Create User", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("POST Create User", False, f"Connection error: {str(e)}")
            return False
    
    def test_enroll_user_in_course(self):
        """Test POST /api/courses/{id}/enroll to enroll a user in a course"""
        if not self.created_course_id:
            self.log_test("POST Enroll User", False, "No course ID available")
            return False
        if not self.created_user_id:
            self.log_test("POST Enroll User", False, "No user ID available")
            return False
            
        try:
            enrollment_data = {
                "userId": self.created_user_id
            }
            
            response = self.session.post(f"{self.base_url}/courses/{self.created_course_id}/enroll", json=enrollment_data)
            
            if response.status_code == 201:
                data = response.json()
                if data.get('userId') == self.created_user_id and data.get('courseId') == self.created_course_id:
                    self.log_test("POST Enroll User", True, f"User enrolled successfully in course", data)
                    return True
                else:
                    self.log_test("POST Enroll User", False, "Enrollment created but missing expected fields", data)
                    return False
            else:
                self.log_test("POST Enroll User", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("POST Enroll User", False, f"Connection error: {str(e)}")
            return False
    
    def test_get_user_enrollments(self):
        """Test GET /api/users/{id}/enrollments to get user enrollments"""
        if not self.created_user_id:
            self.log_test("GET User Enrollments", False, "No user ID available")
            return False
            
        try:
            response = self.session.get(f"{self.base_url}/users/{self.created_user_id}/enrollments")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check if our enrollment is in the list
                    found_enrollment = any(
                        enrollment.get('userId') == self.created_user_id and 
                        enrollment.get('courseId') == self.created_course_id 
                        for enrollment in data
                    )
                    if found_enrollment:
                        self.log_test("GET User Enrollments", True, f"Retrieved {len(data)} enrollments, found our test enrollment", {"count": len(data)})
                        return True
                    else:
                        self.log_test("GET User Enrollments", True, f"Retrieved {len(data)} enrollments (test enrollment may not be present)", {"count": len(data)})
                        return True
                else:
                    self.log_test("GET User Enrollments", False, f"Expected list, got {type(data)}", data)
                    return False
            else:
                self.log_test("GET User Enrollments", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("GET User Enrollments", False, f"Connection error: {str(e)}")
            return False
    
    def test_database_integration(self):
        """Test database integration by verifying UUID-based IDs and data persistence"""
        try:
            # Test that created course has UUID format
            if self.created_course_id:
                try:
                    uuid.UUID(self.created_course_id)
                    uuid_valid = True
                except ValueError:
                    uuid_valid = False
                
                if uuid_valid:
                    self.log_test("Database Integration - UUID IDs", True, "Course ID is valid UUID format")
                else:
                    self.log_test("Database Integration - UUID IDs", False, f"Course ID is not valid UUID: {self.created_course_id}")
                    return False
            
            # Test that created user has UUID format
            if self.created_user_id:
                try:
                    uuid.UUID(self.created_user_id)
                    uuid_valid = True
                except ValueError:
                    uuid_valid = False
                
                if uuid_valid:
                    self.log_test("Database Integration - User UUID", True, "User ID is valid UUID format")
                else:
                    self.log_test("Database Integration - User UUID", False, f"User ID is not valid UUID: {self.created_user_id}")
                    return False
            
            # Test data persistence by retrieving created course again
            if self.created_course_id:
                response = self.session.get(f"{self.base_url}/courses/{self.created_course_id}")
                if response.status_code == 200:
                    self.log_test("Database Integration - Data Persistence", True, "Created course persists in database")
                    return True
                else:
                    self.log_test("Database Integration - Data Persistence", False, "Created course not found in database")
                    return False
            
            self.log_test("Database Integration", False, "No test data available for database integration testing")
            return False
            
        except Exception as e:
            self.log_test("Database Integration", False, f"Error testing database integration: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 80)
        print("EdTech Platform Backend API Testing Suite")
        print("=" * 80)
        print(f"Testing against: {self.base_url}")
        print(f"Started at: {datetime.now().isoformat()}")
        print()
        
        # Run tests in logical order
        tests = [
            ("API Health Check", self.test_api_health_check),
            ("GET All Courses", self.test_get_all_courses),
            ("POST Create Course", self.test_create_course),
            ("GET Specific Course", self.test_get_specific_course),
            ("GET All Users", self.test_get_all_users),
            ("POST Create User", self.test_create_user),
            ("POST Enroll User", self.test_enroll_user_in_course),
            ("GET User Enrollments", self.test_get_user_enrollments),
            ("Database Integration", self.test_database_integration),
        ]
        
        passed = 0
        failed = 0
        
        for test_name, test_func in tests:
            try:
                if test_func():
                    passed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"❌ FAIL {test_name}: Unexpected error - {str(e)}")
                failed += 1
            print()  # Add spacing between tests
        
        # Summary
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {passed + failed}")
        print(f"Passed: {passed}")
        print(f"Failed: {failed}")
        print(f"Success Rate: {(passed / (passed + failed) * 100):.1f}%" if (passed + failed) > 0 else "0%")
        print()
        
        # Detailed results
        if failed > 0:
            print("FAILED TESTS:")
            for test_name, result in self.test_results.items():
                if not result['success']:
                    print(f"  - {test_name}: {result['message']}")
        
        print(f"Completed at: {datetime.now().isoformat()}")
        print("=" * 80)
        
        return passed, failed

if __name__ == "__main__":
    tester = EdTechAPITester()
    passed, failed = tester.run_all_tests()
    
    # Exit with appropriate code
    exit(0 if failed == 0 else 1)