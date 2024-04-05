package com.exafluence.scmxpert.Model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;
import java.util.Date;

@Document(collection="Shipment")
public class NewShipMent {
    public  NewShipMent(){}
    private String shipmentNumber;
    private int containerNumber;
    private String routeName;
    private String deviceId;
    private String poNumber;
    private String ndcNumber;
    private String serialNumberOfGoods;
    private String goodsType;
    private Date expectedDeliveryDate;
    private String deliveryNumber;
    private String batchId;
    private String shipmentDescription;

    public String getShipmentNumber() {
        return shipmentNumber;
    }

    public void setShipmentNumber(String shipmentNumber) {
        this.shipmentNumber = shipmentNumber;
    }

    public int getContainerNumber() {
        return containerNumber;
    }

    public void setContainerNumber(int containerNumber) {
        this.containerNumber = containerNumber;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getPoNumber() {
        return poNumber;
    }

    public void setPoNumber(String poNumber) {
        this.poNumber = poNumber;
    }

    public String getNdcNumber() {
        return ndcNumber;
    }

    public void setNdcNumber(String ndcNumber) {
        this.ndcNumber = ndcNumber;
    }

    public String getSerialNumberOfGoods() {
        return serialNumberOfGoods;
    }

    public void setSerialNumberOfGoods(String serialNumberOfGoods) {
        this.serialNumberOfGoods = serialNumberOfGoods;
    }

    public String getGoodsType() {
        return goodsType;
    }

    public void setGoodsType(String goodsType) {
        this.goodsType = goodsType;
    }

    public Date getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(Date expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
    }

    public String getDeliveryNumber() {
        return deliveryNumber;
    }

    public void setDeliveryNumber(String deliveryNumber) {
        this.deliveryNumber = deliveryNumber;
    }

    public String getBatchId() {
        return batchId;
    }

    public void setBatchId(String batchId) {
        this.batchId = batchId;
    }

    public String getShipmentDescription() {
        return shipmentDescription;
    }

    public void setShipmentDescription(String shipmentDescription) {
        this.shipmentDescription = shipmentDescription;
    }
}
