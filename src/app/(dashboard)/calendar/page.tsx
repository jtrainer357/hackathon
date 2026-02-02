'use client';

import { useState } from 'react';
import { WidgetContainer } from "@/components/ui/widget-container";
import { mockAppointments, getAppointmentsByDate, getTodaysAppointments } from '@/lib/mock-appointments';
import { Calendar as CalendarIcon, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DesignSystem } from '@/lib/design-system';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Calendar helpers
  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const getDayAppointments = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return getAppointmentsByDate(date);
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const displayAppointments = selectedDate
    ? getAppointmentsByDate(selectedDate)
    : getTodaysAppointments();

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (datetime: string) => {
    return new Date(datetime).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 md:p-dashboard-padding max-w-dashboard-max-width mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-synapse-1">Calendar</h1>
        <p className="text-synapse-3 mt-2">View and manage appointments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendar View */}
        <WidgetContainer
          title={`${monthNames[currentMonth]} ${currentYear}`}
          className="lg:col-span-2"
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-growth-50 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-synapse-2" />
            </button>
            <h3 className="text-lg font-semibold text-synapse-1">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-growth-50 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-synapse-2" />
            </button>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-synapse-3 py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const appointments = getDayAppointments(day);
              const hasAppointments = appointments.length > 0;

              return (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDayClick(day)}
                  className={`
                    aspect-square p-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isToday(day)
                      ? 'bg-growth-100 text-growth-800 ring-2 ring-growth-500'
                      : isSelected(day)
                        ? 'bg-growth-500 text-white'
                        : hasAppointments
                          ? 'bg-growth-50 text-synapse-1 hover:bg-growth-100'
                          : 'text-synapse-2 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span>{day}</span>
                    {hasAppointments && (
                      <div className="flex gap-0.5 mt-1">
                        {appointments.slice(0, 3).map((apt, idx) => (
                          <div
                            key={idx}
                            className={`w-1 h-1 rounded-full ${
                              isSelected(day) ? 'bg-white' : 'bg-growth-500'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-xs text-synapse-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-growth-100 ring-2 ring-growth-500" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-growth-50" />
              <span>Has appointments</span>
            </div>
          </div>
        </WidgetContainer>

        {/* Appointments List */}
        <WidgetContainer
          title={selectedDate ? formatDate(selectedDate.toISOString()) : "Today's Appointments"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDate?.toISOString() || 'today'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: DesignSystem.animation.durationFast }}
              className="space-y-3"
            >
              {displayAppointments.length === 0 ? (
                <div className="text-center py-8 text-synapse-3">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No appointments scheduled</p>
                </div>
              ) : (
                displayAppointments.map((apt, index) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 bg-growth-50 rounded-lg hover:bg-growth-100 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-growth-400 to-growth-600 flex items-center justify-center text-white font-medium text-sm shrink-0">
                        {apt.patient_name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-synapse-1 text-sm group-hover:text-growth-700 transition-colors">
                          {apt.patient_name}
                        </h4>
                        <p className="text-xs text-synapse-3 mt-0.5">
                          {apt.appointment_type}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-synapse-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(apt.scheduled_time)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{apt.duration_minutes} min</span>
                          </div>
                        </div>
                        {apt.notes && (
                          <p className="text-xs text-synapse-3 mt-2 italic">
                            {apt.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* Summary */}
          {displayAppointments.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-synapse-3">
                <span>{displayAppointments.length} appointment{displayAppointments.length !== 1 ? 's' : ''}</span>
                <span>
                  {displayAppointments.reduce((acc, apt) => acc + apt.duration_minutes, 0)} total minutes
                </span>
              </div>
            </div>
          )}
        </WidgetContainer>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <WidgetContainer title="This Week">
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-growth-600">
              {mockAppointments.filter(apt => {
                const aptDate = new Date(apt.scheduled_time);
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - today.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);
                return aptDate >= weekStart && aptDate < weekEnd;
              }).length}
            </div>
            <div className="text-sm text-synapse-3 mt-1">Appointments</div>
          </div>
        </WidgetContainer>

        <WidgetContainer title="This Month">
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-growth-600">
              {mockAppointments.filter(apt => {
                const aptDate = new Date(apt.scheduled_time);
                return aptDate.getMonth() === currentMonth && aptDate.getFullYear() === currentYear;
              }).length}
            </div>
            <div className="text-sm text-synapse-3 mt-1">Appointments</div>
          </div>
        </WidgetContainer>

        <WidgetContainer title="Average Duration">
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-growth-600">
              {Math.round(
                mockAppointments.reduce((acc, apt) => acc + apt.duration_minutes, 0) /
                mockAppointments.length
              )}
            </div>
            <div className="text-sm text-synapse-3 mt-1">Minutes</div>
          </div>
        </WidgetContainer>
      </div>
    </div>
  );
}
