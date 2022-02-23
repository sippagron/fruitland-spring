package th.ac.ku.warehouse.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.Nullable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class History {
    @Nullable
    private int id;
    private String type,note,status;
    @Nullable
    private String createDate;

    public History(int id, String type, String note, String status, String createDate) {
        this.id = id;
        this.type = type;
        this.note = note;
        this.status = status;
        this.createDate = createDate;
    }

    public int getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getNote() {
        return note;
    }

    public String getCreateDate() {
        return createDate;
    }

    public String getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return "History{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", note='" + note + '\'' +
                ", createDate='" + createDate + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
