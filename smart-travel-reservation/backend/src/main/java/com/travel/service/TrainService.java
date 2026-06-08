package com.travel.service;

import com.travel.dto.TrainDTO;
import com.travel.entity.Train;
import com.travel.enums.TrainClass;
import com.travel.enums.Status;
import com.travel.exception.ResourceNotFoundException;
import com.travel.repository.TrainRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class TrainService {

    private final TrainRepository trainRepository;

    public TrainService(TrainRepository trainRepository) {
        this.trainRepository = trainRepository;
    }

    public List<Train> searchTrains(String source, String destination, String date) {
        if (date != null && !date.isEmpty()) {
            LocalDate searchDate = LocalDate.parse(date);
            LocalDateTime startOfDay = searchDate.atStartOfDay();
            LocalDateTime endOfDay = searchDate.plusDays(1).atStartOfDay();
            return trainRepository.searchTrains(source.trim(), destination.trim(), startOfDay, endOfDay);
        }
        return trainRepository.searchTrainsWithoutDate(source.trim(), destination.trim());
    }

    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    public Train getTrainById(Long id) {
        return trainRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Train not found with id: " + id));
    }

    public Train addTrain(TrainDTO dto) {
        Train train = Train.builder()
                .trainNumber(dto.getTrainNumber())
                .name(dto.getName())
                .source(dto.getSource())
                .destination(dto.getDestination())
                .departureTime(parseDateTime(dto.getDepartureTime()))
                .arrivalTime(parseDateTime(dto.getArrivalTime()))
                .totalSeats(dto.getTotalSeats())
                .availableSeats(dto.getAvailableSeats())
                .pricePerSeat(dto.getPricePerSeat())
                .trainClass(TrainClass.valueOf(dto.getTrainClass()))
                .status(dto.getStatus() != null ? Status.valueOf(dto.getStatus()) : Status.ACTIVE)
                .build();
        return trainRepository.save(train);
    }

    public Train updateTrain(Long id, TrainDTO dto) {
        Train train = getTrainById(id);
        train.setTrainNumber(dto.getTrainNumber());
        train.setName(dto.getName());
        train.setSource(dto.getSource());
        train.setDestination(dto.getDestination());
        train.setDepartureTime(parseDateTime(dto.getDepartureTime()));
        train.setArrivalTime(parseDateTime(dto.getArrivalTime()));
        train.setTotalSeats(dto.getTotalSeats());
        train.setAvailableSeats(dto.getAvailableSeats());
        train.setPricePerSeat(dto.getPricePerSeat());
        train.setTrainClass(TrainClass.valueOf(dto.getTrainClass()));
        if (dto.getStatus() != null) {
            train.setStatus(Status.valueOf(dto.getStatus()));
        }
        return trainRepository.save(train);
    }

    public void deleteTrain(Long id) {
        Train train = getTrainById(id);
        trainRepository.delete(train);
    }

    private LocalDateTime parseDateTime(String dateTime) {
        try {
            return LocalDateTime.parse(dateTime, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        } catch (Exception e) {
            try {
                return LocalDateTime.parse(dateTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            } catch (Exception e2) {
                return LocalDateTime.parse(dateTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
            }
        }
    }
}
