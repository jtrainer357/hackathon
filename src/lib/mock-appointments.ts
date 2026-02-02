export interface Appointment {
  id: string;
  patient_id: string;
  patient_name: string;
  appointment_type: string;
  scheduled_time: string;
  duration_minutes: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  patient_avatar?: string;
}

export const mockAppointments: Appointment[] = [
  // Today's appointments
  {
    id: 'apt-1',
    patient_id: 'tim-anders',
    patient_name: 'Tim Anders',
    appointment_type: 'Follow-up Session',
    scheduled_time: '2026-02-01T10:00:00',
    duration_minutes: 50,
    status: 'scheduled',
    notes: 'Continue CBT for anxiety management',
  },
  {
    id: 'apt-2',
    patient_id: 'sarah-chen',
    patient_name: 'Sarah Chen',
    appointment_type: 'Initial Consultation',
    scheduled_time: '2026-02-01T11:00:00',
    duration_minutes: 60,
    status: 'scheduled',
  },
  {
    id: 'apt-3',
    patient_id: 'marcus-williams',
    patient_name: 'Marcus Williams',
    appointment_type: 'Medication Review',
    scheduled_time: '2026-02-01T14:00:00',
    duration_minutes: 30,
    status: 'scheduled',
  },
  {
    id: 'apt-4',
    patient_id: 'emily-rodriguez',
    patient_name: 'Emily Rodriguez',
    appointment_type: 'Therapy Session',
    scheduled_time: '2026-02-01T15:00:00',
    duration_minutes: 50,
    status: 'scheduled',
    notes: 'EMDR for trauma processing',
  },

  // February 2nd
  {
    id: 'apt-5',
    patient_id: 'david-park',
    patient_name: 'David Park',
    appointment_type: 'Group Therapy',
    scheduled_time: '2026-02-02T09:00:00',
    duration_minutes: 90,
    status: 'scheduled',
  },
  {
    id: 'apt-6',
    patient_id: 'tim-anders',
    patient_name: 'Tim Anders',
    appointment_type: 'Check-in',
    scheduled_time: '2026-02-02T14:00:00',
    duration_minutes: 30,
    status: 'scheduled',
  },

  // February 3rd
  {
    id: 'apt-7',
    patient_id: 'lisa-thompson',
    patient_name: 'Lisa Thompson',
    appointment_type: 'Family Session',
    scheduled_time: '2026-02-03T10:00:00',
    duration_minutes: 60,
    status: 'scheduled',
  },
  {
    id: 'apt-8',
    patient_id: 'james-wilson',
    patient_name: 'James Wilson',
    appointment_type: 'Therapy Session',
    scheduled_time: '2026-02-03T13:00:00',
    duration_minutes: 50,
    status: 'scheduled',
  },

  // February 5th
  {
    id: 'apt-9',
    patient_id: 'rachel-kim',
    patient_name: 'Rachel Kim',
    appointment_type: 'Initial Assessment',
    scheduled_time: '2026-02-05T11:00:00',
    duration_minutes: 90,
    status: 'scheduled',
  },

  // February 6th - Tim's next appointment
  {
    id: 'apt-10',
    patient_id: 'tim-anders',
    patient_name: 'Tim Anders',
    appointment_type: 'Therapy Session',
    scheduled_time: '2026-02-06T10:00:00',
    duration_minutes: 50,
    status: 'scheduled',
    notes: 'Review progress on anxiety management techniques',
  },

  // February 6th - Other appointments
  {
    id: 'apt-11',
    patient_id: 'amanda-garcia',
    patient_name: 'Amanda Garcia',
    appointment_type: 'Couples Therapy',
    scheduled_time: '2026-02-06T14:00:00',
    duration_minutes: 60,
    status: 'scheduled',
  },

  // February 9th
  {
    id: 'apt-12',
    patient_id: 'michael-brown',
    patient_name: 'Michael Brown',
    appointment_type: 'Follow-up Session',
    scheduled_time: '2026-02-09T09:00:00',
    duration_minutes: 50,
    status: 'scheduled',
  },
  {
    id: 'apt-13',
    patient_id: 'tim-anders',
    patient_name: 'Tim Anders',
    appointment_type: 'Therapy Session',
    scheduled_time: '2026-02-09T15:00:00',
    duration_minutes: 50,
    status: 'scheduled',
  },

  // February 10th
  {
    id: 'apt-14',
    patient_id: 'jennifer-lee',
    patient_name: 'Jennifer Lee',
    appointment_type: 'Crisis Intervention',
    scheduled_time: '2026-02-10T10:00:00',
    duration_minutes: 60,
    status: 'scheduled',
  },

  // February 12th
  {
    id: 'apt-15',
    patient_id: 'robert-martinez',
    patient_name: 'Robert Martinez',
    appointment_type: 'Therapy Session',
    scheduled_time: '2026-02-12T11:00:00',
    duration_minutes: 50,
    status: 'scheduled',
  },

  // February 13th - Tim's next
  {
    id: 'apt-16',
    patient_id: 'tim-anders',
    patient_name: 'Tim Anders',
    appointment_type: 'Therapy Session',
    scheduled_time: '2026-02-13T10:00:00',
    duration_minutes: 50,
    status: 'scheduled',
  },
];

// Helper functions
export function getAppointmentsByDate(date: Date): Appointment[] {
  const dateStr = date.toISOString().split('T')[0];
  return mockAppointments.filter(apt =>
    apt.scheduled_time.startsWith(dateStr)
  ).sort((a, b) =>
    new Date(a.scheduled_time).getTime() - new Date(b.scheduled_time).getTime()
  );
}

export function getTodaysAppointments(): Appointment[] {
  return getAppointmentsByDate(new Date());
}

export function getAppointmentsForMonth(year: number, month: number): Appointment[] {
  return mockAppointments.filter(apt => {
    const aptDate = new Date(apt.scheduled_time);
    return aptDate.getFullYear() === year && aptDate.getMonth() === month;
  });
}

export function getAppointmentsByPatient(patientId: string): Appointment[] {
  return mockAppointments.filter(apt => apt.patient_id === patientId)
    .sort((a, b) =>
      new Date(a.scheduled_time).getTime() - new Date(b.scheduled_time).getTime()
    );
}
