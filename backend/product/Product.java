package com.info5059.casestudy.product;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import java.math.BigDecimal;
import javax.persistence.*;

/**
 * Product entity
 */
@Entity
@Data
@RequiredArgsConstructor
public class Product {
    @javax.persistence.Id
    private String id;
    private int vendorid;
    private String name;
    private BigDecimal costprice;
    private BigDecimal msrp;
    private int rop;
    private int eoq;
    private int qoh;
    private int qoo;
    @Lob
    @Basic(optional = true)
    private byte[] qrcode;
    private String qrcodetxt;
}
