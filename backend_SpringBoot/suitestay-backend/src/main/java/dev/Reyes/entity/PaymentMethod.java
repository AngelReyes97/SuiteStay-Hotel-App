package dev.Reyes.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class PaymentMethod {
    private String paymentMethod;
    private String cardName;
    private String cardNumber;
    private String expiration;
    private String cvv;

    public PaymentMethod() {}
}
