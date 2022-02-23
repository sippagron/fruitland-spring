package th.ac.ku.warehouse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import th.ac.ku.warehouse.model.Product;
import th.ac.ku.warehouse.service.HistoryService;

@Controller
@RequestMapping("/history")
public class HistoryController {
    HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping
    public String getHistoryPage(Model model) {
        model.addAttribute("historyList", historyService.getHistory());

        return "history";
    }

    @GetMapping("/{id}")
    public String getHistoryItemPage(@PathVariable int id,Model model) {
        try{
            model.addAttribute("history", historyService.getHistoryById(id).get(0));
            model.addAttribute("historyItem", historyService.getHistoryItem(id));
        }catch (Exception e){
            return "error";
        }

        return "historyitem";
    }
}
