package com.travel.dto;


public class DashboardSummary {
    private long totalBuses;
    private long totalTrains;
    private long totalBusBookings;
    private long totalTrainBookings;

    public DashboardSummary() {}

    public DashboardSummary(long totalBuses, long totalTrains, long totalBusBookings, long totalTrainBookings) {
        this.totalBuses = totalBuses;
        this.totalTrains = totalTrains;
        this.totalBusBookings = totalBusBookings;
        this.totalTrainBookings = totalTrainBookings;
    }

    public static DashboardSummaryBuilder builder() {
        return new DashboardSummaryBuilder();
    }

    // Getters and Setters
    public long getTotalBuses() { return totalBuses; }
    public void setTotalBuses(long totalBuses) { this.totalBuses = totalBuses; }
    public long getTotalTrains() { return totalTrains; }
    public void setTotalTrains(long totalTrains) { this.totalTrains = totalTrains; }
    public long getTotalBusBookings() { return totalBusBookings; }
    public void setTotalBusBookings(long totalBusBookings) { this.totalBusBookings = totalBusBookings; }
    public long getTotalTrainBookings() { return totalTrainBookings; }
    public void setTotalTrainBookings(long totalTrainBookings) { this.totalTrainBookings = totalTrainBookings; }

    public static class DashboardSummaryBuilder {
        private long totalBuses;
        private long totalTrains;
        private long totalBusBookings;
        private long totalTrainBookings;

        public DashboardSummaryBuilder totalBuses(long totalBuses) { this.totalBuses = totalBuses; return this; }
        public DashboardSummaryBuilder totalTrains(long totalTrains) { this.totalTrains = totalTrains; return this; }
        public DashboardSummaryBuilder totalBusBookings(long totalBusBookings) { this.totalBusBookings = totalBusBookings; return this; }
        public DashboardSummaryBuilder totalTrainBookings(long totalTrainBookings) { this.totalTrainBookings = totalTrainBookings; return this; }

        public DashboardSummary build() {
            return new DashboardSummary(totalBuses, totalTrains, totalBusBookings, totalTrainBookings);
        }
    }
}
