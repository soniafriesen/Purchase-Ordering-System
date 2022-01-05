package com.info5059.casestudy.report;

import com.info5059.casestudy.po.PurchaseOrder;
import com.info5059.casestudy.po.PurchaseOrderDAO;
import com.info5059.casestudy.po.PurchaseOrderLineitem;
import com.info5059.casestudy.product.ProductRepository;
import com.info5059.casestudy.vendor.VendorRepository;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import org.springframework.web.servlet.view.document.AbstractPdfView;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Optional;
import com.info5059.casestudy.vendor.Vendor;
import com.info5059.casestudy.product.Product;
import com.itextpdf.layout.borders.Border;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

public abstract class ReportPDFGenerator extends AbstractPdfView {
        public static ByteArrayInputStream generatePurchaseOrder(String po, PurchaseOrderDAO poDAO,
                        VendorRepository vendorRepository, ProductRepository productRepository) throws IOException {
                URL imageUrl = ReportPDFGenerator.class.getResource("/static/assets/images/sflogo3.png");
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                PdfWriter writer = new PdfWriter(baos);
                PdfDocument pdf = new PdfDocument(writer);              
                Document document = new Document(pdf);
                PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
                Image img = new Image(ImageDataFactory.create(imageUrl)).scaleAbsolute(120, 120).setFixedPosition(80,
                                710);
                document.add(img);
                document.add(new Paragraph("\n\n"));
                Locale locale = new Locale("en", "US");
                NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);
                try {
                        PurchaseOrder purchaseOrder = poDAO.findOne(Long.parseLong(po));
                        document.add(new Paragraph(String.format("Purchase Order")).setFont(font).setFontSize(24)
                                        .setMarginRight(45).setTextAlignment(TextAlignment.RIGHT).setBold());
                        document.add(new Paragraph("#:" + po).setFont(font).setFontSize(16).setBold().setMarginRight(90)
                                        .setMarginTop(-10).setTextAlignment(TextAlignment.RIGHT));
                        document.add(new Paragraph("\n\n"));

                        Optional<Vendor> opt = vendorRepository.findById(purchaseOrder.getVendorid());

                        if (opt.isPresent()) {
                                Vendor vendor = opt.get();
                                Table table = new Table(3);
                                table.setWidth(new UnitValue(UnitValue.PERCENT, 45));
                                Cell cell = new Cell(5, 2)
                                                .add(new Paragraph("Vendor:").setFont(font).setFontSize(12).setBold())
                                                .setBorder(Border.NO_BORDER).setTextAlignment(TextAlignment.CENTER)
                                                .setBackgroundColor(ColorConstants.WHITE);
                                table.addCell(cell);
                                cell = new Cell()
                                                .add(new Paragraph(vendor.getName()).setFont(font).setFontSize(12)
                                                                .setBold())
                                                .setTextAlignment(TextAlignment.LEFT).setBorder(Border.NO_BORDER)
                                                .setBackgroundColor(ColorConstants.LIGHT_GRAY);
                                table.addCell(cell);
                                cell = new Cell()
                                                .add(new Paragraph(vendor.getAddress1()).setFont(font).setFontSize(12)
                                                                .setBold())
                                                .setTextAlignment(TextAlignment.LEFT).setBorder(Border.NO_BORDER)
                                                .setBackgroundColor(ColorConstants.LIGHT_GRAY);
                                table.addCell(cell);
                                cell = new Cell()
                                                .add(new Paragraph(vendor.getCity()).setFont(font).setFontSize(12)
                                                                .setBold())
                                                .setTextAlignment(TextAlignment.LEFT).setBorder(Border.NO_BORDER)
                                                .setBackgroundColor(ColorConstants.LIGHT_GRAY);
                                table.addCell(cell);
                                cell = new Cell()
                                                .add(new Paragraph(vendor.getProvince()).setFont(font).setFontSize(12)
                                                                .setBold())
                                                .setTextAlignment(TextAlignment.LEFT).setBorder(Border.NO_BORDER)
                                                .setBackgroundColor(ColorConstants.LIGHT_GRAY);
                                table.addCell(cell);
                                cell = new Cell()
                                                .add(new Paragraph(vendor.getEmail()).setFont(font).setFontSize(12)
                                                                .setBold())
                                                .setTextAlignment(TextAlignment.LEFT).setBorder(Border.NO_BORDER)
                                                .setBackgroundColor(ColorConstants.LIGHT_GRAY);
                                table.addCell(cell);
                                document.add(table);

                                document.add(new Paragraph("\n\n"));

                                Table productOrderTable = new Table(5);
                                productOrderTable.setWidth(new UnitValue(UnitValue.PERCENT, 100));

                                cell = new Cell().add(
                                                new Paragraph("Product Code").setFont(font).setFontSize(12).setBold())
                                                .setTextAlignment(TextAlignment.CENTER);
                                productOrderTable.addCell(cell);
                                cell = new Cell().add(
                                                new Paragraph("Description").setFont(font).setFontSize(12).setBold())
                                                .setTextAlignment(TextAlignment.CENTER);
                                productOrderTable.addCell(cell);
                                cell = new Cell().add(new Paragraph("Qty Sold").setFont(font).setFontSize(12).setBold())
                                                .setTextAlignment(TextAlignment.CENTER);
                                productOrderTable.addCell(cell);
                                cell = new Cell().add(new Paragraph("Price").setFont(font).setFontSize(12).setBold())
                                                .setTextAlignment(TextAlignment.CENTER);
                                productOrderTable.addCell(cell);
                                cell = new Cell().add(
                                                new Paragraph("Ext. Price").setFont(font).setFontSize(12).setBold())
                                                .setTextAlignment(TextAlignment.CENTER);
                                productOrderTable.addCell(cell);

                                BigDecimal ext = new BigDecimal(0.0);
                                BigDecimal normalprice = new BigDecimal(0.0);
                                BigDecimal sub = new BigDecimal(0.0);
                                BigDecimal tax = new BigDecimal(0.0);
                                BigDecimal tot = new BigDecimal(0.0);

                                for (PurchaseOrderLineitem line : purchaseOrder.getItems()) {
                                        Optional<Product> prodOpt = productRepository.findById(line.getProductid());
                                        if (prodOpt.isPresent()) {
                                                Product product = prodOpt.get();
                                                cell = new Cell()
                                                                .add(new Paragraph(product.getId()).setFont(font)
                                                                                .setFontSize(12))
                                                                .setTextAlignment(TextAlignment.CENTER);
                                                productOrderTable.addCell(cell);
                                                cell = new Cell()
                                                                .add(new Paragraph(product.getName()).setFont(font)
                                                                                .setFontSize(12))
                                                                .setTextAlignment(TextAlignment.CENTER);
                                                productOrderTable.addCell(cell);
                                                cell = new Cell()
                                                                .add(new Paragraph(String.valueOf(line.getQty()))
                                                                                .setFont(font).setFontSize(12))
                                                                .setTextAlignment(TextAlignment.RIGHT);
                                                productOrderTable.addCell(cell);
                                                normalprice = line.getPrice();
                                                cell = new Cell()
                                                                .add(new Paragraph(formatter.format(normalprice))
                                                                                .setFont(font).setFontSize(12))
                                                                .setTextAlignment(TextAlignment.RIGHT);
                                                productOrderTable.addCell(cell);
                                                ext = line.getPrice().multiply(BigDecimal.valueOf(line.getQty()),
                                                                new MathContext(8, RoundingMode.UP));
                                                cell = new Cell()
                                                                .add(new Paragraph(formatter.format(ext)).setFont(font)
                                                                                .setFontSize(12))
                                                                .setTextAlignment(TextAlignment.RIGHT);
                                                productOrderTable.addCell(cell);
                                                sub = sub.add(ext, new MathContext(8, RoundingMode.UP));
                                        }
                                }

                                cell = new Cell(1, 4).add(new Paragraph("Sub Total:")).setBorder(Border.NO_BORDER)
                                                .setTextAlignment(TextAlignment.RIGHT);
                                productOrderTable.addCell(cell);
                                cell = new Cell().add(new Paragraph(formatter.format(sub)))
                                                .setTextAlignment(TextAlignment.RIGHT);
                                productOrderTable.addCell(cell);
                                cell = new Cell(1, 4).add(new Paragraph("Tax:")).setBorder(Border.NO_BORDER)
                                                .setTextAlignment(TextAlignment.RIGHT);
                                productOrderTable.addCell(cell);
                                tax = sub.multiply(BigDecimal.valueOf(0.13), new MathContext(8, RoundingMode.UP));
                                cell = new Cell().add(new Paragraph(formatter.format(tax)))
                                                .setTextAlignment(TextAlignment.RIGHT);
                                productOrderTable.addCell(cell);
                                cell = new Cell(1, 4).add(new Paragraph("PO Total:")).setBorder(Border.NO_BORDER)
                                                .setTextAlignment(TextAlignment.RIGHT);
                                productOrderTable.addCell(cell);
                                tot = sub.add(tax, new MathContext(8, RoundingMode.UP));
                                cell = new Cell().add(new Paragraph(formatter.format(tot)))
                                                .setTextAlignment(TextAlignment.RIGHT)
                                                .setBackgroundColor(ColorConstants.YELLOW);
                                productOrderTable.addCell(cell);
                                document.add(productOrderTable);
                        }
                        document.add(new Paragraph("\n\n"));
                        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                        String formatDateTime = format.format(purchaseOrder.getDatecreated());
                        document.add(new Paragraph(String.valueOf(formatDateTime))
                                        .setTextAlignment(TextAlignment.CENTER));
                        document.close();

                } catch (Exception ex) {
                        Logger.getLogger(ReportPDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
                }
                return new ByteArrayInputStream(baos.toByteArray());
        }
}