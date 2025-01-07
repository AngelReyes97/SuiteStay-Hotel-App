package dev.Reyes.service;
import dev.Reyes.entity.Checkout;

import dev.Reyes.repository.CheckoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutService {
    CheckoutRepository checkoutRepository;

    @Autowired
    public CheckoutService(CheckoutRepository checkoutRepository){
        this.checkoutRepository = checkoutRepository;
    }

    public Checkout savePaymentInfo(Checkout paymentInfo){
        return checkoutRepository.save(paymentInfo);
    }
}
