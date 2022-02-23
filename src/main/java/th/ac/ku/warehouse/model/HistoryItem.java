package th.ac.ku.warehouse.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.Nullable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class HistoryItem {
    @Nullable
    private int id,historyId,quantity,productId;
    private String name;
    private double price;

    public HistoryItem(int id, int historyId, int quantity, int productId, String name, double price) {
        this.id = id;
        this.historyId = historyId;
        this.quantity = quantity;
        this.productId = productId;
        this.name = name;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public int getHistoryId() {
        return historyId;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getProductId() {
        return productId;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
}
