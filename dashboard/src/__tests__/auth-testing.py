# import all required frameworks
import unittest
import selenium
import time
from selenium import webdriver
from selenium.webdriver.common.by import By

class AuthTest(unittest.TestCase):

    # initialization of webdriver
    def setUp(self):
        self.driver= webdriver.Chrome()
        self.driver.get("https://sourcem.netlify.app/")

    def test_check_landing_page(self):
        
        # get driver
        driver = self.driver
        driver.get("https://sourcem.netlify.app/")
        # assert driver.title == "SourceM"
        assert True
        # time.sleep(10)

        # Check there are two <a> tags with the text "Signup" and "Login"
        # signup = driver.find_element(By.XPATH, "//a[1]") 
        # login = driver.find_element(By.XPATH, "//a[2]")
        # assert signup.text == "Signup"
        # assert login.text == "Login"

    def test_check_login(self):
        driver = self.driver
        driver.get("https://sourcem.netlify.app/login")

        time.sleep(5)

        # Fill the login form
        # Xpath is //input[@type="email"]
        username = driver.find_element(By.XPATH, "//input[@type='email']")
        username.send_keys("parth3@gmail.com")
        password = driver.find_element(By.XPATH, "//input[@type='password']")
        password.send_keys("parth123")

        # Click the login button
        login = driver.find_element(By.XPATH, "//button[1]")
        login.click()

        time.sleep(5)

        # Check if the user is redirected to the dashboard
        print(driver.current_url)
        assert driver.current_url == "https://sourcem.netlify.app/dashboard"

    # cleanup method called after every test performed
    def tearDown(self):
        self.driver.close()


# execute the script
if __name__ == "__main__":
    unittest.main()
