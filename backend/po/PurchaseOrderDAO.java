package com.info5059.casestudy.po;

import com.info5059.casestudy.product.Product;
import com.info5059.casestudy.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.persistence.EntityManager;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.PersistenceContext;
import javax.persistence.EntityNotFoundException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Component
public class PurchaseOrderDAO {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private ProductRepository prod;

    @Transactional
    public Long create(PurchaseOrder porep) {
        PurchaseOrder realPurchaseOrder = new PurchaseOrder();
        realPurchaseOrder.setVendorid(porep.getVendorid());
        realPurchaseOrder.setAmount(porep.getAmount());
        Instant nowUtc = Instant.now();
        ZoneId easternZone = ZoneId.of("US/Eastern");
        ZonedDateTime nowEastern = ZonedDateTime.ofInstant(nowUtc, easternZone);
        realPurchaseOrder.setDatecreated(nowEastern);
        entityManager.persist(realPurchaseOrder);

        for (PurchaseOrderLineitem item : porep.getItems()) {
            PurchaseOrderLineitem realItem = new PurchaseOrderLineitem();
            realItem.setPoid(realPurchaseOrder.getId());
            realItem.setProductid(item.getProductid());
            realItem.setQty(item.getQty());
            realItem.setPrice(item.getPrice());
            Product product = entityManager.find(Product.class, item.getProductid());
            entityManager.persist(realItem);
            product.setQoo(item.getQty());
            prod.saveAndFlush(product);
        }
        return realPurchaseOrder.getId();
    }

    public PurchaseOrder findOne(Long id) {
        PurchaseOrder purchaseOrder = entityManager.find(PurchaseOrder.class, id);
        if (purchaseOrder == null) {
            throw new EntityNotFoundException("Can't find report for ID " + id);
        }
        return purchaseOrder;
    }

    @SuppressWarnings("unchecked")
    public List<PurchaseOrder> findByVendor(Long poId) {
        return entityManager.createQuery("select r from PurchaseOrder r where r.vendorid = :id")
                .setParameter("id", poId).getResultList();
    }

}
