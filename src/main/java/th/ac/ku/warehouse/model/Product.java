package th.ac.ku.warehouse.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.Nullable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Product {
    private String name,note,createDate;
    @Nullable
    private int id,safetyStock,quantity;
    private double price;

    public Product(String name, String note, String createDate, int id, int safetyStock, int quantity, double price) {
        this.name = name;
        this.note = note;
        this.createDate = createDate;
        this.id = id;
        this.safetyStock = safetyStock;
        this.quantity = quantity;
        this.price = price;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void updateQuantity(int quantity){
        this.quantity = this.quantity + quantity;
    }

    public String getName() {
        return name;
    }

    public String getNote() {
        return note;
    }

    public String getCreateDate() {
        return createDate;
    }

    public int getId() {
        return id;
    }

    public int getSafetyStock() {
        return safetyStock;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", note='" + note + '\'' +
                ", createDate='" + createDate + '\'' +
                ", id=" + id +
                ", safetyStock=" + safetyStock +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}
