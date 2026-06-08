package com.travel.controller;

import com.travel.dto.DashboardSummary;
import com.travel.entity.AdminLog;
import com.travel.entity.BusBooking;
import com.travel.entity.TrainBooking;
import com.travel.repository.BusRepository;
import com.travel.repository.TrainRepository;
import com.travel.service.AdminLogService;
import com.travel.service.BusBookingService;
import com.travel.service.TrainBookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final BusRepository busRepository;
    private final TrainRepository trainRepository;
    private final BusBookingService busBookingService;
    private final TrainBookingService trainBookingService;
    private final AdminLogService adminLogService;

    public AdminController(BusRepository busRepository, TrainRepository trainRepository, BusBookingService busBookingService, TrainBookingService trainBookingService, AdminLogService adminLogService) {
        this.busRepository = busRepository;
        this.trainRepository = trainRepository;
        this.busBookingService = busBookingService;
        this.trainBookingService = trainBookingService;
        this.adminLogService = adminLogService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummary> getDashboard() {
        DashboardSummary summary = DashboardSummary.builder()
                .totalBuses(busRepository.count())
                .totalTrains(trainRepository.count())
                .totalBusBookings(busBookingService.countAll())
                .totalTrainBookings(trainBookingService.countAll())
                .build();
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/bus-bookings")
    public ResponseEntity<List<BusBooking>> getAllBusBookings() {
        return ResponseEntity.ok(busBookingService.getAllBookings());
    }

    @GetMapping("/train-bookings")
    public ResponseEntity<List<TrainBooking>> getAllTrainBookings() {
        return ResponseEntity.ok(trainBookingService.getAllBookings());
    }

    @GetMapping("/logs")
    public ResponseEntity<List<AdminLog>> getActivityLogs() {
        return ResponseEntity.ok(adminLogService.getAllLogs());
    }
}
