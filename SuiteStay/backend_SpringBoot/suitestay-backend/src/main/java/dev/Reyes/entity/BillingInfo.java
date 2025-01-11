package dev.Reyes.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class BillingInfo {
    private String firstName;
    private String lastName;
    private String address;
    private String country;
    private String state;
    private String zipCode;

    public BillingInfo() {}
}
