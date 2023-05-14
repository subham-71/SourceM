# import all required frameworks
import unittest
import selenium
import time
from selenium import webdriver
from selenium.webdriver.common.by import By

BASE_URL = "143.244.130.133:3000"

class SecurityTest(unittest.TestCase):

    # initialization of webdriver
    def setUp(self):
        self.driver= webdriver.Chrome()

    def test_cross_site_scripting_login(self):
        driver = self.driver
        driver.get(f"{BASE_URL}/login")

        time.sleep(2)

        username = driver.find_element(By.XPATH, "//input[@type='email']")
        username.send_keys("<script>alert('XSS')</script>")

        password = driver.find_element(By.XPATH, "//input[@type='password']")
        password.send_keys("<script>alert('XSS')</script>")

        login = driver.find_element(By.XPATH, "//button[1]")
        login.click()

        time.sleep(2)

        # Check the alert box
        alert = driver.switch_to.alert
        text = alert.text
        alert.accept()
        assert text != "XSS"

    def test_sql_injection_login(self):
        driver = self.driver
        driver.get(f"{BASE_URL}/login")

        time.sleep(2)

        username = driver.find_element(By.XPATH, "//input[@type='email']")
        username.send_keys("' OR 1=1 --")

        password = driver.find_element(By.XPATH, "//input[@type='password']")
        password.send_keys("' OR 1=1 --")

        login = driver.find_element(By.XPATH, "//button[1]")
        login.click()

        time.sleep(2)
        
        alert = driver.switch_to.alert
        text = alert.text
        alert.accept()

        if driver.current_url == f"{BASE_URL}/dashboard":
            assert False
        else:
            assert True

    # Clean up after each test
    def tearDown(self):
        self.driver.close()

# Run the test
if __name__ == "__main__":
    unittest.main()
