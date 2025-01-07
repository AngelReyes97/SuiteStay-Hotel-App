package dev.Reyes.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name="rooms")
public class Room{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="room_Id")
    private Integer room_Id;

    @Column(name="room_Type", unique = true)
    private String room_Type;

    @Column(name="room_Dimension")
    private String room_Dimension;

    @Column(name="bed_Type")
    private String bed_Type;

    @Column(name="max_Guest")
    private String max_Guest;

    @Column(name="room_Price")
    private BigDecimal room_Price;

    @Column(name="room_image")
    private String room_image;

    public Room() {}

    public Room(String room_Type, String room_Dimension, String bed_Type, String max_Guest, BigDecimal room_Price, String room_image) {
        this.room_Type = room_Type;
        this.room_Dimension = room_Dimension;
        this.bed_Type = bed_Type;
        this.max_Guest = max_Guest;
        this.room_Price = room_Price;
        this.room_image = room_image;
    }

    @Override
    public String toString() {
        return "Room{" +
                "room_Id=" + room_Id +
                ", room_Type='" + room_Type + '\'' +
                ", room_Dimension='" + room_Dimension + '\'' +
                ", bed_Type='" + bed_Type + '\'' +
                ", max_Guest='" + max_Guest + '\'' +
                ", room_Price=" + room_Price +
                ", room_image='" + room_image + '\'' +
                '}';
    }
}
