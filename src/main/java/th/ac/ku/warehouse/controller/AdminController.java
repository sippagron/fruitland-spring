package th.ac.ku.warehouse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import th.ac.ku.warehouse.service.HistoryService;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private HistoryService historyService;

    public AdminController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping
    public String getAdminPage(Model model) {
        model.addAttribute("pending",historyService.getPendingHistory());
        return "admin";
    }

    @GetMapping("/login")
    public String getLoginPage() {
        return "login";
    }
}
