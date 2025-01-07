package dev.Reyes.service;

import dev.Reyes.entity.Room;
import dev.Reyes.repository.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    public Iterable<Room> getAllRooms() {
        return roomRepository.findAll();
    }
}
