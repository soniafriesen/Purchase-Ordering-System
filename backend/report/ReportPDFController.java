package com.info5059.casestudy.report;

import com.info5059.casestudy.po.PurchaseOrderDAO;
import com.info5059.casestudy.product.ProductRepository;
import com.info5059.casestudy.vendor.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController

public class ReportPDFController {
        @Autowired
        private VendorRepository vendorRepository;
        @Autowired
        private ProductRepository productRepository;
        @Autowired
        private PurchaseOrderDAO purchaseOrderDAO;

        @RequestMapping(value = "/POPDF", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
        public ResponseEntity<InputStreamResource> streamPDF(HttpServletRequest request) throws IOException {
                String po = request.getParameter("po");
                // get formatted pdf as a stream
                ByteArrayInputStream bis = ReportPDFGenerator.generatePurchaseOrder(po, purchaseOrderDAO,
                                vendorRepository, productRepository);
                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Disposition", "inline; filename=poreport.pdf");
                // dump stream to browser
                return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
                                .body(new InputStreamResource(bis));
        }
}