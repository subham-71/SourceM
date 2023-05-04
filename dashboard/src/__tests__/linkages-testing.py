# import all required frameworks
import unittest
import selenium
import time
from selenium import webdriver
from selenium.webdriver.common.by import By

class LinkagesTest(unittest.TestCase):
    # initialization of webdriver
    def setUp(self):
        self.driver= webdriver.Chrome()

    def test_linkage_login(self):
        driver = self.driver
        driver.get("https://sourcem.netlify.app")
        time.sleep(2)

        # Click the login button
        login = driver.find_element(By.XPATH, "//button[text()='Login']")
        login.click()
        assert driver.current_url == "https://sourcem.netlify.app/login"
        time.sleep(2)

    def test_linkage_signup(self):
        driver = self.driver
        driver.get("https://sourcem.netlify.app")
        time.sleep(2)

        # Click the signup button
        signup = driver.find_element(By.XPATH, "//button[text()='Signup']")
        signup.click()
        assert driver.current_url == "https://sourcem.netlify.app/signup"
        time.sleep(2)

        login_link = driver.find_element(By.XPATH, "//a[text()='Login']")
        login_link.click()
        assert driver.current_url == "https://sourcem.netlify.app/login#"
        time.sleep(2)

    def test_linkage_forgot_password(self):
        driver = self.driver
        driver.get("https://sourcem.netlify.app/signup")
        time.sleep(2)

        login_link = driver.find_element(By.XPATH, "//a[text()='Login']")
        login_link.click()
        forgot_password_link = driver.find_element(By.XPATH, "//a[text()='Forgot Password?']")
        forgot_password_link.click()
        assert driver.current_url == "https://sourcem.netlify.app/forgot-password#"

        back_signup_link = driver.find_element(By.XPATH, "//a[text()='Create an account']")
        back_signup_link.click()
        assert driver.current_url == "https://sourcem.netlify.app/signup#"

    def test_linkage_dashboard(self):
        driver = self.driver
        driver.get("https://sourcem.netlify.app/login")
        time.sleep(2)

        username = driver.find_element(By.XPATH, "//input[@type='email']")
        username.send_keys("parth3@gmail.com")
        password = driver.find_element(By.XPATH, "//input[@type='password']")
        password.send_keys("parth123")
        time.sleep(2)

        # Click the login button
        login = driver.find_element(By.XPATH, "//button[1]")
        login.click()
        time.sleep(20)

        assert driver.current_url == "https://sourcem.netlify.app/dashboard"
        

        # Click the button 
        application_link = driver.find_element(By.XPATH, "//tbody/tr[1]/td[4]/button[1]")
        application_link.click()
        assert driver.current_url == "https://sourcem.netlify.app/application"

        # Click the button
        dashboard_link = driver.find_element(By.XPATH, "//a[text()='Dashboard']")
        dashboard_link.click()
        assert driver.current_url == "https://sourcem.netlify.app/dashboard"

    def test_linkage_application(self):
        driver = self.driver
        driver.get("https://sourcem.netlify.app/login")
        time.sleep(2)

        username = driver.find_element(By.XPATH, "//input[@type='email']")
        username.send_keys("parth3@gmail.com")
        password = driver.find_element(By.XPATH, "//input[@type='password']")
        password.send_keys("parth123")
        time.sleep(2)

        # Click the login button
        login = driver.find_element(By.XPATH, "//button[1]")
        login.click()
        time.sleep(20)

        assert driver.current_url == "https://sourcem.netlify.app/dashboard"
        

        # Click the button 
        application_link = driver.find_element(By.XPATH, "//tbody/tr[1]/td[4]/button[1]")
        application_link.click()
        time.sleep(2)
        assert driver.current_url == "https://sourcem.netlify.app/application"

        # Click the button
        control_flow = driver.find_element(By.XPATH, "//a[text()='Control-flow']")
        control_flow.click()
        time.sleep(2)
        # Check if there is a div with id "control-flow"
        assert driver.find_element(By.XPATH, "//div[@id='control-flow']")

        # Click the button
        data_flow = driver.find_element(By.XPATH, "//a[text()='Exec-time']")
        data_flow.click()
        time.sleep(2)
        # Check if there is a div with id "exec-time"
        assert driver.find_element(By.XPATH, "//div[@id='execution-time']")

        # Click the button
        data_flow = driver.find_element(By.XPATH, "//a[text()='Functions']")
        data_flow.click()
        time.sleep(2)
        # Check if there is a div with id "functions"
        assert driver.find_element(By.XPATH, "//div[@id='function']")

        # Click the button
        data_flow = driver.find_element(By.XPATH, "//a[text()='Exception']")
        data_flow.click()
        time.sleep(2)
        # Check if there is a div with id "exception"
        assert driver.find_element(By.XPATH, "//div[@id='exceptions']")

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()