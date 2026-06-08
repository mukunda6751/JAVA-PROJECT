package com.travel.config;

import com.travel.entity.Bus;
import com.travel.entity.Train;
import com.travel.entity.User;
import com.travel.enums.*;
import com.travel.repository.BusRepository;
import com.travel.repository.TrainRepository;
import com.travel.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataLoader.class);

    private final UserRepository userRepository;
    private final BusRepository busRepository;
    private final TrainRepository trainRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, BusRepository busRepository, TrainRepository trainRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.busRepository = busRepository;
        this.trainRepository = trainRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        loadUsers();
        loadBuses();
        loadTrains();
    }

    private void loadUsers() {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .name("Admin User")
                    .email("admin@travel.com")
                    .phone("9999999999")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);

            User user = User.builder()
                    .name("John Doe")
                    .email("john@travel.com")
                    .phone("8888888888")
                    .password(passwordEncoder.encode("user123"))
                    .role(Role.USER)
                    .build();
            userRepository.save(user);

            log.info("✅ Seeded 2 users (admin@travel.com / admin123, john@travel.com / user123)");
        }
    }

    private void loadBuses() {
        if (busRepository.count() == 0) {
            LocalDateTime base = LocalDateTime.now().plusDays(3);

            busRepository.save(Bus.builder()
                    .busNumber("BUS001")
                    .name("Royal Express")
                    .source("Delhi")
                    .destination("Mumbai")
                    .departureTime(base.withHour(22).withMinute(0))
                    .arrivalTime(base.plusDays(1).withHour(10).withMinute(0))
                    .totalSeats(40)
                    .availableSeats(40)
                    .pricePerSeat(1500.0)
                    .type(BusType.AC)
                    .operatorName("Royal Travels")
                    .status(Status.ACTIVE)
                    .build());

            busRepository.save(Bus.builder()
                    .busNumber("BUS002")
                    .name("City Liner")
                    .source("Bangalore")
                    .destination("Chennai")
                    .departureTime(base.withHour(8).withMinute(30))
                    .arrivalTime(base.withHour(14).withMinute(30))
                    .totalSeats(50)
                    .availableSeats(50)
                    .pricePerSeat(800.0)
                    .type(BusType.NON_AC)
                    .operatorName("City Bus Corp")
                    .status(Status.ACTIVE)
                    .build());

            busRepository.save(Bus.builder()
                    .busNumber("BUS003")
                    .name("Night Rider")
                    .source("Hyderabad")
                    .destination("Pune")
                    .departureTime(base.plusDays(1).withHour(21).withMinute(0))
                    .arrivalTime(base.plusDays(2).withHour(7).withMinute(0))
                    .totalSeats(36)
                    .availableSeats(36)
                    .pricePerSeat(1200.0)
                    .type(BusType.SLEEPER)
                    .operatorName("Night Express")
                    .status(Status.ACTIVE)
                    .build());

            busRepository.save(Bus.builder()
                    .busNumber("BUS004")
                    .name("Eastern Shuttle")
                    .source("Kolkata")
                    .destination("Patna")
                    .departureTime(base.plusDays(2).withHour(6).withMinute(0))
                    .arrivalTime(base.plusDays(2).withHour(16).withMinute(0))
                    .totalSeats(45)
                    .availableSeats(45)
                    .pricePerSeat(600.0)
                    .type(BusType.SEMI_SLEEPER)
                    .operatorName("Eastern Motors")
                    .status(Status.ACTIVE)
                    .build());

            busRepository.save(Bus.builder()
                    .busNumber("BUS005")
                    .name("Desert King")
                    .source("Jaipur")
                    .destination("Ahmedabad")
                    .departureTime(base.plusDays(3).withHour(16).withMinute(0))
                    .arrivalTime(base.plusDays(4).withHour(2).withMinute(0))
                    .totalSeats(40)
                    .availableSeats(40)
                    .pricePerSeat(1100.0)
                    .type(BusType.AC)
                    .operatorName("Desert Travels")
                    .status(Status.ACTIVE)
                    .build());

            log.info("✅ Seeded 5 buses");
        }
    }

    private void loadTrains() {
        if (trainRepository.count() == 0) {
            LocalDateTime base = LocalDateTime.now().plusDays(3);

            trainRepository.save(Train.builder()
                    .trainNumber("12952")
                    .name("Rajdhani Express")
                    .source("Delhi")
                    .destination("Mumbai")
                    .departureTime(base.withHour(16).withMinute(0))
                    .arrivalTime(base.plusDays(1).withHour(8).withMinute(35))
                    .totalSeats(200)
                    .availableSeats(200)
                    .pricePerSeat(2500.0)
                    .trainClass(TrainClass.AC_2_TIER)
                    .status(Status.ACTIVE)
                    .build());

            trainRepository.save(Train.builder()
                    .trainNumber("12028")
                    .name("Shatabdi Express")
                    .source("Bangalore")
                    .destination("Chennai")
                    .departureTime(base.withHour(6).withMinute(0))
                    .arrivalTime(base.withHour(11).withMinute(0))
                    .totalSeats(300)
                    .availableSeats(300)
                    .pricePerSeat(1200.0)
                    .trainClass(TrainClass.AC_3_TIER)
                    .status(Status.ACTIVE)
                    .build());

            trainRepository.save(Train.builder()
                    .trainNumber("12264")
                    .name("Duronto Express")
                    .source("Hyderabad")
                    .destination("Pune")
                    .departureTime(base.plusDays(1).withHour(20).withMinute(30))
                    .arrivalTime(base.plusDays(2).withHour(8).withMinute(30))
                    .totalSeats(500)
                    .availableSeats(500)
                    .pricePerSeat(800.0)
                    .trainClass(TrainClass.SLEEPER)
                    .status(Status.ACTIVE)
                    .build());

            trainRepository.save(Train.builder()
                    .trainNumber("12360")
                    .name("Garib Rath Express")
                    .source("Kolkata")
                    .destination("Patna")
                    .departureTime(base.plusDays(2).withHour(23).withMinute(45))
                    .arrivalTime(base.plusDays(3).withHour(7).withMinute(15))
                    .totalSeats(400)
                    .availableSeats(400)
                    .pricePerSeat(700.0)
                    .trainClass(TrainClass.AC_3_TIER)
                    .status(Status.ACTIVE)
                    .build());

            trainRepository.save(Train.builder()
                    .trainNumber("22946")
                    .name("Vande Bharat Express")
                    .source("Jaipur")
                    .destination("Ahmedabad")
                    .departureTime(base.plusDays(3).withHour(5).withMinute(30))
                    .arrivalTime(base.plusDays(3).withHour(13).withMinute(0))
                    .totalSeats(150)
                    .availableSeats(150)
                    .pricePerSeat(3000.0)
                    .trainClass(TrainClass.FIRST_CLASS)
                    .status(Status.ACTIVE)
                    .build());

            log.info("✅ Seeded 5 trains");
        }
    }
}
