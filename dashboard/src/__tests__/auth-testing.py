# import all required frameworks
import unittest
import selenium
import time
from selenium import webdriver
from selenium.webdriver.common.by import By

BASE_URL = "143.244.130.133:3000"

class AuthTest(unittest.TestCase):

    # initialization of webdriver
    def setUp(self):
        self.driver= webdriver.Chrome()

    def test_check_landing_page(self):
        
        # get driver
        driver = self.driver
        driver.get(f"{BASE_URL}/")
        time.sleep(5)
        assert driver.title == "SourceM"

    def test_check_login(self):
        driver = self.driver
        driver.get(f"{BASE_URL}/login")

        time.sleep(5)

        # Fill the login form

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
        assert driver.current_url == f"{BASE_URL}/dashboard"

    def test_check_invalid_login(self):
        driver = self.driver
        driver.get(f"{BASE_URL}/login")

        time.sleep(5)

        # Fill the login form
        username = driver.find_element(By.XPATH, "//input[@type='email']")
        username.send_keys("invalid@gmail.com")
        password = driver.find_element(By.XPATH, "//input[@type='password']")
        password.send_keys("invalid")

        # Click the login button
        login = driver.find_element(By.XPATH, "//button[1]")
        login.click()

        time.sleep(5)

        # selenium.common.exceptions.UnexpectedAlertPresentException: Alert Text: Failed to Log in
        # Message: unexpected alert open: {Alert text : Failed to Log in}

        # Catch the exception
        try:
            alert = driver.switch_to.alert
            alert.accept()
        except:
            pass

        # Check if the user is still on the login page
        assert driver.current_url == f"{BASE_URL}/login"

    def test_without_login(self):
        driver = self.driver
        driver.get(f"{BASE_URL}/dashboard")

        time.sleep(5)

        # Check if the user is redirected to the login page
        assert driver.current_url == f"{BASE_URL}/login"

    def test_check_logout(self):
        driver = self.driver
        driver.get(f"{BASE_URL}/login")

        time.sleep(5)

        # Fill the login form
        username = driver.find_element(By.XPATH, "//input[@type='email']")
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
        assert driver.current_url == f"{BASE_URL}/dashboard"

        # Click the logout button
        logout = driver.find_element(By.XPATH, "//button[@type='button']")
        logout.click()

        time.sleep(5)

        # Check if the user is redirected to the landing page
        print(driver.current_url)
        assert driver.current_url == f"{BASE_URL}/"

    # cleanup method called after every test performed
    def tearDown(self):
        self.driver.close()


# execute the script
if __name__ == "__main__":
    unittest.main()
