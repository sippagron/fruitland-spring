package th.ac.ku.warehouse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import th.ac.ku.warehouse.model.Product;
import th.ac.ku.warehouse.service.ProductService;

@Controller
@RequestMapping("/update")
public class UpdateController {
    private ProductService productService;

    public UpdateController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public String getImportPage(Model model) {
        model.addAttribute("products", productService.getProducts());
        return "update";
    }

    @RequestMapping("/get/{id}")
    @ResponseBody
    public Product getProduct(@PathVariable int id, Model model) {
        return productService.getProduct(id).get(0);
    }

    @PostMapping("/create/{id}")
    @ResponseBody
    public String updateProductQuantity(@PathVariable int id, @RequestBody Product product, Model model){
        Product oldProduct = productService.getProduct(id).get(0);
        oldProduct.updateQuantity(product.getQuantity());
        productService.updateProduct(oldProduct);
        return oldProduct.getQuantity()+"";
    }
}
