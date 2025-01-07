package dev.Reyes.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@Entity
@Table(name="billing_info")
public class Checkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Embedded
    private BillingInfo billingInfo;  // Embedding BillingInfo class

    @Embedded
    private PaymentMethod paymentMethod;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_account_id", referencedColumnName = "account_id", nullable = false)
    private Account user;

    public Checkout() {}

    @Override
    public String toString() {
        return "Checkout{" +
                "id=" + id +
                ", billingInfo=" + billingInfo +
                ", paymentMethod=" + paymentMethod +
                ", user=" + user +
                '}';
    }
}