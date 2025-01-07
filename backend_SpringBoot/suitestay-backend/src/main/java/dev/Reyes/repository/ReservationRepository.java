package dev.Reyes.repository;

import dev.Reyes.entity.Reservation;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Integer>{
    @Query("FROM Reservation p WHERE p.user.account_id = :accountId ORDER BY p.id DESC")
    List<Reservation> findByAccountId(@Param("accountId") Integer accountId);
}
