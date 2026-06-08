package com.travel.controller;

import com.travel.dto.TrainBookingRequest;
import com.travel.entity.TrainBooking;
import com.travel.service.TrainBookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/train-bookings")
public class TrainBookingController {

    private final TrainBookingService trainBookingService;

    public TrainBookingController(TrainBookingService trainBookingService) {
        this.trainBookingService = trainBookingService;
    }

    @PostMapping
    public ResponseEntity<TrainBooking> bookTrain(@Valid @RequestBody TrainBookingRequest request,
                                                   Authentication auth) {
        Long userId = (Long) auth.getCredentials();
        TrainBooking booking = trainBookingService.bookTrain(request, userId);
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<TrainBooking>> getMyBookings(Authentication auth) {
        Long userId = (Long) auth.getCredentials();
        return ResponseEntity.ok(trainBookingService.getMyBookings(userId));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<TrainBooking> cancelBooking(@PathVariable Long id, Authentication auth) {
        Long userId = (Long) auth.getCredentials();
        TrainBooking booking = trainBookingService.cancelBooking(id, userId);
        return ResponseEntity.ok(booking);
    }
}
