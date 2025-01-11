package dev.Reyes.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name="reservations")
public class Reservation{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="reservation_id")
    private Integer reservation_id;

    @Column(name="city")
    private String city;

    @Column(name="state")
    private String state;

    @Column(name="check_In")
    private LocalDate checkIn;

    @Column(name="checkOut")
    private LocalDate checkOut;

    @Column(name="guest")
    private Integer numberOfGuest;

    @Column(name="price")
    private BigDecimal price;

    @Column(name="totalNights")
    private Integer totalNights;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="fk_account_id", referencedColumnName = "account_id", nullable = false)
    private Account user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="fk_room_id", referencedColumnName = "room_Id", nullable = false)
    private Room room;

    public Reservation(String city, String state, LocalDate checkIn,
                       LocalDate checkOut, Integer guestNum, BigDecimal price, Integer totalNights){
        this.city = city;
        this.state = state;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.numberOfGuest = guestNum;
        this.price = price;
        this.totalNights = totalNights;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "reservation_id=" + reservation_id +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", checkIn=" + checkIn +
                ", checkOut=" + checkOut +
                ", numberOfGuest=" + numberOfGuest +
                ", price=" + price +
                ", totalNights=" + totalNights +
                ", user=" + user +
                ", room=" + room +
                '}';
    }
}
