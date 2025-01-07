package dev.Reyes.controller;

import dev.Reyes.entity.Account;
import dev.Reyes.entity.Checkout;
import dev.Reyes.entity.Reservation;
import dev.Reyes.entity.Room;

import dev.Reyes.service.AccountService;
import dev.Reyes.service.CheckoutService;
import dev.Reyes.service.ReservationService;
import dev.Reyes.service.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@CrossOrigin
@RestController
public class SuiteStayController {

    @Autowired
    AccountService accountService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ReservationService reservationService;

    @Autowired
    RoomService roomService;

    @Autowired
    CheckoutService checkoutService;

    @Autowired
    public SuiteStayController(AccountService accountService,
                               PasswordEncoder passwordEncoder,
                               ReservationService reservationService,
                               RoomService roomService,
                               CheckoutService checkoutService){
        this.accountService = accountService;
        this.passwordEncoder = passwordEncoder;
        this.reservationService = reservationService;
        this.roomService = roomService;
        this.checkoutService = checkoutService;
    }

    @PostMapping("/suitestay/register")
    public @ResponseBody ResponseEntity<Account> registerUser(@RequestBody Account user){
        Account newAccount = accountService.registerUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(newAccount);
    }

    @GetMapping("/register")
    public @ResponseBody ResponseEntity<Boolean> checkEmail(@RequestParam String email){
        Account existingUser = this.accountService.findByEmail(email);
        return ResponseEntity.ok(existingUser != null);
    }

    @PostMapping("/suitestay/home/login")
    public @ResponseBody ResponseEntity<Account> login(@RequestBody Account credentials){
       Account existingUser = this.accountService.findByEmail(credentials.getEmail());

       if(existingUser != null && passwordEncoder.matches(credentials.getPassword(), existingUser.getPassword())){
           return ResponseEntity.status(HttpStatus.OK).body(existingUser);
       }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @GetMapping("/suitestay/available-rooms")
    public @ResponseBody ResponseEntity<Iterable<Room>> getAllRooms(){
        Iterable<Room> rooms = roomService.getAllRooms();
        return ResponseEntity.status(HttpStatus.OK).body(rooms);
    }

    @PostMapping("/suitestay/booking-payment")
    public @ResponseBody ResponseEntity<Iterable<Reservation>>finalizeBooking(@RequestBody Iterable<Reservation> reservations){
        Iterable<Reservation> savedReservations = reservationService.saveReservations(reservations);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReservations);
    }

    @PostMapping("/suitestay/booking-payment/billing-info")
    public @ResponseBody ResponseEntity<Checkout>savePaymentInfo(@RequestBody Checkout paymentInfo){
        Checkout newBilling = checkoutService.savePaymentInfo(paymentInfo);
        return ResponseEntity.status(HttpStatus.CREATED).body(newBilling);
    }

    @GetMapping("/suitestay/user/{accountId}/reservations")
    public @ResponseBody ResponseEntity<List<Reservation>>getReservationsByUserId(@PathVariable Integer accountId){
        List<Reservation> userReservations = reservationService.getReservationsByAccountId(accountId);
        if (userReservations.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(userReservations);  // 204 No Content
        }
        return ResponseEntity.status(HttpStatus.OK).body(userReservations);
    }

    @DeleteMapping("/suitestay/cancel-reservation/{reservation_id}")
    public @ResponseBody ResponseEntity<Reservation>deleteReservation(@PathVariable Integer reservation_id){
        Reservation reservation = reservationService.findReservationById(reservation_id);
        if(reservation == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        reservationService.deleteReservation(reservation_id);
        return ResponseEntity.status(HttpStatus.OK).body(reservation);
    }

}
