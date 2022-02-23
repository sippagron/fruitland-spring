package th.ac.ku.warehouse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import th.ac.ku.warehouse.model.Product;
import th.ac.ku.warehouse.service.ProductService;

@Controller
@RequestMapping("/")
public class HomeController {
    private ProductService productService;

    public HomeController (ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public String getLandingPage(Model model) {
        return "landing";
    }

    @GetMapping("/home")
    public String getHomePage(Model model) {
        model.addAttribute("products", productService.getProducts());
        return "home";
    }

}
