package th.ac.ku.warehouse.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import th.ac.ku.warehouse.model.History;
import th.ac.ku.warehouse.model.HistoryItem;
import th.ac.ku.warehouse.model.Product;

import java.util.Arrays;
import java.util.List;

@Service
public class HistoryService {

    private RestTemplate restTemplate;

    public HistoryService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<History> getHistory() {
        String url = "http://localhost:3001/api/history/";

        ResponseEntity<History[]> response =
                restTemplate.getForEntity(url, History[].class);

        History[] histories = response.getBody();
        return Arrays.asList(histories);
    }


    public List<History> getHistoryById (int id) {
        String url = "http://localhost:3001/api/history/"+id;
        ResponseEntity<History[]> response =
                restTemplate.getForEntity(url, History[].class);

        History[] histories = response.getBody();
        return Arrays.asList(histories);
    }

    public List<HistoryItem> getHistoryItem(int id) {
        String url = "http://localhost:3001/api/history/getitem/"+id;

        ResponseEntity<HistoryItem[]> response =
                restTemplate.getForEntity(url, HistoryItem[].class);

        HistoryItem[] histories = response.getBody();
        return Arrays.asList(histories);
    }

    public List<History> getPendingHistory() {
        String url = "http://localhost:3001/api/history/pending";

        ResponseEntity<History[]> response =
                restTemplate.getForEntity(url, History[].class);

        History[] histories = response.getBody();
        return Arrays.asList(histories);
    }


}
