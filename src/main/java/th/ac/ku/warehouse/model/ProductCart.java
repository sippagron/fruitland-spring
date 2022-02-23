package th.ac.ku.warehouse.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.Nullable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductCart extends Product{
    private int productId;

    public ProductCart(String name, String note, String createDate, int id, int safetyStock, int quantity, double price, int productId) {
        super(name, note, createDate, id, safetyStock, quantity, price);
        this.productId = productId;
    }

    public int getProductId() {
        return productId;
    }

    @Override
    public String toString() {
        return "ProductCart{" +
                "productId=" + productId +
                '}';
    }
}
