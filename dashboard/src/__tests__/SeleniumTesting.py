import selenium
import time
from selenium import webdriver
from selenium.webdriver.common.by import By

def check_landing_page():
    driver = webdriver.Chrome()
    driver.get("https://sourcem.netlify.app/")
    assert driver.title == "SourceM"

    time.sleep(10)

    # Check there are two <a> tags with the text "Signup" and "Login"
    signup = driver.find_element(By.XPATH, "//a[1]")
    login = driver.find_element(By.XPATH, "//a[2]")
    assert signup.text == "Signup"
    assert login.text == "Login"
    
def check_login():
    driver = webdriver.Chrome()
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

check_login()
