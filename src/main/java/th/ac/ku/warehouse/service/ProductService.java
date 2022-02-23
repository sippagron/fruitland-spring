package th.ac.ku.warehouse.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import th.ac.ku.warehouse.model.Product;
import th.ac.ku.warehouse.model.ProductCart;

import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {
    private RestTemplate restTemplate;

    public ProductService(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    public List<Product> getProducts() {
        String url = "http://localhost:3001/api/products/";

        ResponseEntity<Product[]> response =
                restTemplate.getForEntity(url, Product[].class);

        Product[] products = response.getBody();
        return Arrays.asList(products);
    }

    public List<ProductCart> getProductCart() {
        String url = "http://localhost:3001/api/cart/";

        ResponseEntity<ProductCart[]> response =
                restTemplate.getForEntity(url, ProductCart[].class);

        ProductCart[] products = response.getBody();
        return Arrays.asList(products);
    }

    public List<Product> getProduct(int id){
        String url = "http://localhost:3001/api/products/"+id;

        ResponseEntity<Product[]> response =
                restTemplate.getForEntity(url, Product[].class);

        Product[] products = response.getBody();
        return Arrays.asList(products);
    }

    public List<ProductCart> getProductCartById(int id){
        String url = "http://localhost:3001/api/cart/"+id;

        ResponseEntity<ProductCart[]> response =
                restTemplate.getForEntity(url, ProductCart[].class);

        ProductCart[] products = response.getBody();
        return Arrays.asList(products);
    }

    public void addProduct(Product product) {
        String url = "http://localhost:3001/api/products/add";

        restTemplate.postForObject(url, product, Product.class);
    }

    public void updateProduct(Product product) {
        String url = "http://localhost:3001/api/products/" +
                product.getId();

        restTemplate.put(url,product);
    }

    public void removeCartItem(int id){
        String url = "http://localhost:3001/api/cart/"+id;
        restTemplate.delete(url);
    }
}
