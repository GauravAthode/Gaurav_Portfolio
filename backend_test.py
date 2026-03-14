import requests
import sys
import json
from datetime import datetime

class PortfolioAPITester:
    def __init__(self, base_url="https://gaurav-fullstack-dev.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_keys=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                print(f"❌ Unsupported method: {method}")
                return False, {}

            print(f"Status Code: {response.status_code}")
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check response content
                try:
                    response_data = response.json()
                    print(f"Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Not a dict'}")
                    
                    # Validate expected keys if provided
                    if expected_keys and isinstance(response_data, dict):
                        missing_keys = [key for key in expected_keys if key not in response_data]
                        if missing_keys:
                            print(f"⚠️  Missing expected keys: {missing_keys}")
                        else:
                            print(f"✅ All expected keys present: {expected_keys}")
                    
                    self.results.append({
                        "test": name,
                        "status": "PASS",
                        "response_keys": list(response_data.keys()) if isinstance(response_data, dict) else None
                    })
                    return True, response_data
                except json.JSONDecodeError:
                    print("⚠️  Response is not JSON")
                    self.results.append({
                        "test": name,
                        "status": "PASS",
                        "response": "Non-JSON response"
                    })
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error response: {error_data}")
                except:
                    print(f"Error response: {response.text[:200]}")
                
                self.results.append({
                    "test": name,
                    "status": "FAIL",
                    "expected_status": expected_status,
                    "actual_status": response.status_code
                })
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            self.results.append({
                "test": name,
                "status": "FAIL",
                "error": "Timeout"
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.results.append({
                "test": name,
                "status": "FAIL",
                "error": str(e)
            })
            return False, {}

    def test_health_endpoint(self):
        """Test health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200,
            expected_keys=["status", "timestamp", "service"]
        )

    def test_github_repos_endpoint(self):
        """Test GitHub repos endpoint"""
        return self.run_test(
            "GitHub Repositories",
            "GET",
            "api/github/repos",
            200,
            expected_keys=["repos"]
        )

    def test_github_stats_endpoint(self):
        """Test GitHub stats endpoint"""
        return self.run_test(
            "GitHub Stats",
            "GET",
            "api/github/stats",
            200,
            expected_keys=["username", "public_repos", "followers", "total_stars", "top_languages"]
        )

    def test_contact_endpoint(self):
        """Test contact form endpoint"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Message",
            "message": "This is a test message from the API test suite."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data,
            expected_keys=["success", "message"]
        )
        
        if success and response:
            if response.get("success"):
                print("✅ Contact form response indicates success")
            else:
                print("⚠️  Contact form response indicates failure")
        
        return success, response

    def test_contact_validation(self):
        """Test contact form validation"""
        invalid_data = {
            "name": "A",  # Too short
            "email": "invalid-email",  # Invalid email
            "subject": "Hi",  # Too short
            "message": "Short"  # Too short
        }
        
        return self.run_test(
            "Contact Form Validation",
            "POST",
            "api/contact",
            422,  # Expecting validation error
            data=invalid_data
        )

    def test_admin_messages_endpoint(self):
        """Test admin messages endpoint"""
        return self.run_test(
            "Admin Messages",
            "GET",
            "api/messages",
            200,
            expected_keys=["messages"]
        )

def main():
    print("🚀 Starting Portfolio API Tests")
    print("=" * 50)
    
    tester = PortfolioAPITester()
    
    # Run all tests
    print("\n📋 Running API Tests...")
    
    # Basic endpoints
    tester.test_health_endpoint()
    
    # GitHub integration
    tester.test_github_repos_endpoint()
    tester.test_github_stats_endpoint()
    
    # Contact form
    tester.test_contact_endpoint()
    tester.test_contact_validation()
    
    # Admin endpoint
    tester.test_admin_messages_endpoint()
    
    # Print final results
    print(f"\n📊 Final Results:")
    print("=" * 50)
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Tests failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Print detailed results
    print(f"\n📋 Detailed Results:")
    for result in tester.results:
        status_icon = "✅" if result["status"] == "PASS" else "❌"
        print(f"{status_icon} {result['test']}: {result['status']}")
    
    # Save results to file
    results_file = f"/app/test_reports/backend_test_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(results_file, 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": f"{(tester.tests_passed/tester.tests_run)*100:.1f}%"
            },
            "results": tester.results
        }, f, indent=2)
    
    print(f"\n💾 Results saved to: {results_file}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())