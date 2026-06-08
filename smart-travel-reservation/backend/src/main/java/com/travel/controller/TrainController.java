package com.travel.controller;

import com.travel.dto.TrainDTO;
import com.travel.entity.Train;
import com.travel.service.AdminLogService;
import com.travel.service.TrainService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trains")
public class TrainController {

    private final TrainService trainService;
    private final AdminLogService adminLogService;

    public TrainController(TrainService trainService, AdminLogService adminLogService) {
        this.trainService = trainService;
        this.adminLogService = adminLogService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Train>> searchTrains(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam(required = false) String date) {
        List<Train> trains = trainService.searchTrains(source, destination, date);
        return ResponseEntity.ok(trains);
    }

    @GetMapping
    public ResponseEntity<List<Train>> getAllTrains() {
        return ResponseEntity.ok(trainService.getAllTrains());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Train> getTrainById(@PathVariable Long id) {
        return ResponseEntity.ok(trainService.getTrainById(id));
    }

    @PostMapping
    public ResponseEntity<Train> addTrain(@Valid @RequestBody TrainDTO trainDTO, Authentication auth) {
        Train train = trainService.addTrain(trainDTO);
        Long adminId = (Long) auth.getCredentials();
        adminLogService.logAction(adminId, "TRAIN", train.getId(), "ADD",
                "Added train: " + train.getName() + " (" + train.getTrainNumber() + ")");
        return new ResponseEntity<>(train, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Train> updateTrain(@PathVariable Long id,
                                              @Valid @RequestBody TrainDTO trainDTO,
                                              Authentication auth) {
        Train train = trainService.updateTrain(id, trainDTO);
        Long adminId = (Long) auth.getCredentials();
        adminLogService.logAction(adminId, "TRAIN", train.getId(), "UPDATE",
                "Updated train: " + train.getName() + " (" + train.getTrainNumber() + ")");
        return ResponseEntity.ok(train);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrain(@PathVariable Long id, Authentication auth) {
        Train train = trainService.getTrainById(id);
        Long adminId = (Long) auth.getCredentials();
        adminLogService.logAction(adminId, "TRAIN", id, "DELETE",
                "Deleted train: " + train.getName() + " (" + train.getTrainNumber() + ")");
        trainService.deleteTrain(id);
        return ResponseEntity.noContent().build();
    }
}
