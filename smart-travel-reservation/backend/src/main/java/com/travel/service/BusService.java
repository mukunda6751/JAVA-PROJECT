package com.travel.service;

import com.travel.dto.BusDTO;
import com.travel.entity.Bus;
import com.travel.enums.BusType;
import com.travel.enums.Status;
import com.travel.exception.ResourceNotFoundException;
import com.travel.repository.BusRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class BusService {

    private final BusRepository busRepository;

    public BusService(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    public List<Bus> searchBuses(String source, String destination, String date) {
        if (date != null && !date.isEmpty()) {
            LocalDate searchDate = LocalDate.parse(date);
            LocalDateTime startOfDay = searchDate.atStartOfDay();
            LocalDateTime endOfDay = searchDate.plusDays(1).atStartOfDay();
            return busRepository.searchBuses(source.trim(), destination.trim(), startOfDay, endOfDay);
        }
        return busRepository.searchBusesWithoutDate(source.trim(), destination.trim());
    }

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    public Bus getBusById(Long id) {
        return busRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found with id: " + id));
    }

    public Bus addBus(BusDTO dto) {
        Bus bus = Bus.builder()
                .busNumber(dto.getBusNumber())
                .name(dto.getName())
                .source(dto.getSource())
                .destination(dto.getDestination())
                .departureTime(parseDateTime(dto.getDepartureTime()))
                .arrivalTime(parseDateTime(dto.getArrivalTime()))
                .totalSeats(dto.getTotalSeats())
                .availableSeats(dto.getAvailableSeats())
                .pricePerSeat(dto.getPricePerSeat())
                .type(BusType.valueOf(dto.getType()))
                .operatorName(dto.getOperatorName())
                .status(dto.getStatus() != null ? Status.valueOf(dto.getStatus()) : Status.ACTIVE)
                .build();
        return busRepository.save(bus);
    }

    public Bus updateBus(Long id, BusDTO dto) {
        Bus bus = getBusById(id);
        bus.setBusNumber(dto.getBusNumber());
        bus.setName(dto.getName());
        bus.setSource(dto.getSource());
        bus.setDestination(dto.getDestination());
        bus.setDepartureTime(parseDateTime(dto.getDepartureTime()));
        bus.setArrivalTime(parseDateTime(dto.getArrivalTime()));
        bus.setTotalSeats(dto.getTotalSeats());
        bus.setAvailableSeats(dto.getAvailableSeats());
        bus.setPricePerSeat(dto.getPricePerSeat());
        bus.setType(BusType.valueOf(dto.getType()));
        bus.setOperatorName(dto.getOperatorName());
        if (dto.getStatus() != null) {
            bus.setStatus(Status.valueOf(dto.getStatus()));
        }
        return busRepository.save(bus);
    }

    public void deleteBus(Long id) {
        Bus bus = getBusById(id);
        busRepository.delete(bus);
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
