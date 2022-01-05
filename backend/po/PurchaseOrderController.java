package com.info5059.casestudy.po;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderDAO purchaseOrderDAO;

    @PostMapping("/api/pos")
    public ResponseEntity<Long> addOne(@RequestBody PurchaseOrder clientrep) { // use RequestBody here
        Long purchaseorderId = purchaseOrderDAO.create(clientrep);
        return new ResponseEntity<Long>(purchaseorderId, HttpStatus.OK);
    }
    @GetMapping("/api/pos/{id}")
    public ResponseEntity<List<PurchaseOrder>> findByVendor(@PathVariable long id) {
        List<PurchaseOrder> employeeReports = purchaseOrderDAO.findByVendor(id);
        return new ResponseEntity<List<PurchaseOrder>>(employeeReports, HttpStatus.OK);
    }
}
