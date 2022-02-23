package th.ac.ku.warehouse;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.web.server.LocalServerPort;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginTest {
    @LocalServerPort
    private Integer port;

    private static WebDriver driver;
    private static WebDriverWait wait;

    @FindBy(id = "exampleInputEmail1")
    private WebElement idField;

    @FindBy(id = "exampleInputPassword1")
    private WebElement pinField;

    @FindBy(id = "loginBtn")
    private WebElement submitButton;

    @BeforeAll
    public static void beforeAll() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, 1000);
    }

    @BeforeEach
    public void beforeEach() {
        driver.get("http://localhost:" + "8080" + "/admin/login");

        PageFactory.initElements(driver, this);
    }

    @AfterEach
    public void afterEach() throws InterruptedException {
        Thread.sleep(3000);
    }

    @AfterAll
    public static void afterAll() {
        driver.quit();
    }

    @Test
    void testLoginCorrectIdPin() {
        idField.sendKeys("admin");
        pinField.sendKeys("warehouse");
        submitButton.click();

        WebElement resultHeader = wait.until(webDriver ->
                webDriver.findElement(By.tagName("h2")));
        assertEquals("เข้าสู่ระบบสำเร็จ", resultHeader.getText());
    }

    @Test
    void testLoginIncorrectIdPin() {
        idField.sendKeys("admin");
        pinField.sendKeys("za");
        submitButton.click();

        WebElement resultHeader = wait.until(webDriver ->
                webDriver.findElement(By.id("errA")));
        assertEquals("username หรือ password ไม่ถูกต้อง", resultHeader.getText());
    }
}
