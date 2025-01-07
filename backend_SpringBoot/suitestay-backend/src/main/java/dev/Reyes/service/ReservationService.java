package dev.Reyes.service;

import dev.Reyes.entity.Reservation;
import dev.Reyes.repository.ReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository){
        this.reservationRepository = reservationRepository;
    }

    public Iterable<Reservation> saveReservations(Iterable<Reservation> newReservations){
        return reservationRepository.saveAll(newReservations);
    }

    public List<Reservation> getAll(){
        return (List<Reservation>) reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByAccountId(Integer accountId){
        return (List<Reservation>) reservationRepository.findByAccountId(accountId);
    }

    public Reservation findReservationById(Integer reservation_id){
        return reservationRepository.findById(reservation_id).orElse(null);
    }

    public void deleteReservation(Integer reservation_id) {
        reservationRepository.deleteById(reservation_id);
    }
}
