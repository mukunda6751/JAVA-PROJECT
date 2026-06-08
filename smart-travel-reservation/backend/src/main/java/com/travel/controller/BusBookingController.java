package com.travel.controller;

import com.travel.dto.BusBookingRequest;
import com.travel.entity.BusBooking;
import com.travel.service.BusBookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bus-bookings")
public class BusBookingController {

    private final BusBookingService busBookingService;

    public BusBookingController(BusBookingService busBookingService) {
        this.busBookingService = busBookingService;
    }

    @PostMapping
    public ResponseEntity<BusBooking> bookBus(@Valid @RequestBody BusBookingRequest request,
                                               Authentication auth) {
        Long userId = (Long) auth.getCredentials();
        BusBooking booking = busBookingService.bookBus(request, userId);
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<BusBooking>> getMyBookings(Authentication auth) {
        Long userId = (Long) auth.getCredentials();
        return ResponseEntity.ok(busBookingService.getMyBookings(userId));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<BusBooking> cancelBooking(@PathVariable Long id, Authentication auth) {
        Long userId = (Long) auth.getCredentials();
        BusBooking booking = busBookingService.cancelBooking(id, userId);
        return ResponseEntity.ok(booking);
    }
}
