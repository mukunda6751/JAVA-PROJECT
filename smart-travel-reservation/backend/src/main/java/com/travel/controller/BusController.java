package com.travel.controller;

import com.travel.dto.BusDTO;
import com.travel.entity.Bus;
import com.travel.service.AdminLogService;
import com.travel.service.BusService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buses")
public class BusController {

    private final BusService busService;
    private final AdminLogService adminLogService;

    public BusController(BusService busService, AdminLogService adminLogService) {
        this.busService = busService;
        this.adminLogService = adminLogService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Bus>> searchBuses(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam(required = false) String date) {
        List<Bus> buses = busService.searchBuses(source, destination, date);
        return ResponseEntity.ok(buses);
    }

    @GetMapping
    public ResponseEntity<List<Bus>> getAllBuses() {
        return ResponseEntity.ok(busService.getAllBuses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bus> getBusById(@PathVariable Long id) {
        return ResponseEntity.ok(busService.getBusById(id));
    }

    @PostMapping
    public ResponseEntity<Bus> addBus(@Valid @RequestBody BusDTO busDTO, Authentication auth) {
        Bus bus = busService.addBus(busDTO);
        Long adminId = (Long) auth.getCredentials();
        adminLogService.logAction(adminId, "BUS", bus.getId(), "ADD",
                "Added bus: " + bus.getName() + " (" + bus.getBusNumber() + ")");
        return new ResponseEntity<>(bus, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bus> updateBus(@PathVariable Long id,
                                         @Valid @RequestBody BusDTO busDTO,
                                         Authentication auth) {
        Bus bus = busService.updateBus(id, busDTO);
        Long adminId = (Long) auth.getCredentials();
        adminLogService.logAction(adminId, "BUS", bus.getId(), "UPDATE",
                "Updated bus: " + bus.getName() + " (" + bus.getBusNumber() + ")");
        return ResponseEntity.ok(bus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBus(@PathVariable Long id, Authentication auth) {
        Bus bus = busService.getBusById(id);
        Long adminId = (Long) auth.getCredentials();
        adminLogService.logAction(adminId, "BUS", id, "DELETE",
                "Deleted bus: " + bus.getName() + " (" + bus.getBusNumber() + ")");
        busService.deleteBus(id);
        return ResponseEntity.noContent().build();
    }
}
