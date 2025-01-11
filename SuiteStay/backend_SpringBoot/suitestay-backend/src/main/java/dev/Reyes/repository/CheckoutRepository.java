package dev.Reyes.repository;

import dev.Reyes.entity.Checkout;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckoutRepository extends CrudRepository<Checkout, Integer>{
}
