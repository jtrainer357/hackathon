"use client"

import { useEffect, useState } from "react"
import { Search, Phone, Mail, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PatientSearchResult, Appointment, SessionNote } from "@/types/database"

interface PatientListItem extends PatientSearchResult {
  address: string | null
  insurance_provider: string | null
  insurance_id: string | null
  updated_at: string
}

interface PatientDetails extends PatientListItem {
  nextAppointment: Appointment | null
  recentNote: SessionNote | null
  sessionNotes: SessionNote[]
  appointments: {
    upcoming: Appointment[]
    past: Appointment[]
  }
  stats: {
    totalNotes: number
    totalAppointments: number
    upcomingAppointments: number
  }
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientListItem[]>([])
  const [selectedPatient, setSelectedPatient] = useState<PatientDetails | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [detailsLoading, setDetailsLoading] = useState(false)

  // Fetch all patients on mount
  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await fetch('/api/patients/search?q=&limit=100')
        if (response.ok) {
          const data = await response.json()
          setPatients(data.patients || [])

          // Auto-select first patient (Tim Anders)
          if (data.patients && data.patients.length > 0) {
            fetchPatientDetails(data.patients[0].id)
          }
        }
      } catch (error) {
        console.error("Error fetching patients:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  // Fetch patient details
  async function fetchPatientDetails(patientId: string) {
    setDetailsLoading(true)
    try {
      const response = await fetch(`/api/patients/${patientId}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedPatient(data)
      }
    } catch (error) {
      console.error("Error fetching patient details:", error)
    } finally {
      setDetailsLoading(false)
    }
  }

  // Handle patient selection
  function handlePatientSelect(patient: PatientListItem) {
    fetchPatientDetails(patient.id)
  }

  // Filter patients based on search
  const filteredPatients = patients.filter(patient => {
    const searchLower = searchQuery.toLowerCase()
    const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase()
    return fullName.includes(searchLower)
  })

  // Format date as MM-DD-YYYY
  function formatDateMMDDYYYY(dateString: string) {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'N/A'
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      return `${month}-${day}-${year}`
    } catch {
      return 'N/A'
    }
  }

  // Format date as M/D/YYYY
  function formatDateShort(dateString: string) {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'N/A'
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    } catch {
      return 'N/A'
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading patients...</div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Riverside Family Health</h1>
          <div className="flex items-center gap-4">
            <nav className="flex gap-6">
              <button className="text-sm font-medium text-foreground border-b-2 border-growth-2 pb-1">
                All Patients
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground">
                Active
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground">
                New
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground">
                Inactive
              </button>
            </nav>
            <button className="px-4 py-2 bg-growth-2 text-white rounded-full text-sm font-medium hover:bg-growth-1">
              Add Patient
            </button>
          </div>
        </div>
      </div>

      {/* Two-panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Patient List */}
        <div className="w-80 border-r border-border bg-card/30 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                aria-label="Search patients"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </div>

          {/* Patient List */}
          <div className="flex-1 overflow-y-auto">
            {filteredPatients.map((patient) => {
              const isSelected = selectedPatient?.id === patient.id

              return (
                <button
                  key={patient.id}
                  onClick={() => handlePatientSelect(patient)}
                  className={`w-full p-4 border-b border-border text-left hover:bg-muted/50 transition-colors ${
                    isSelected ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="h-12 w-12 rounded-full bg-growth-4 flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-growth-1">
                        {patient.first_name?.[0] || '?'}{patient.last_name?.[0] || '?'}
                      </span>
                    </div>

                    {/* Patient Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground text-sm">
                          {patient.first_name || 'Unknown'} {patient.last_name || 'Patient'}
                        </h3>
                        {patient.is_active && (
                          <Badge className="bg-success/15 text-success text-xs px-2 py-0">
                            ACTIVE
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Age {patient.age || 'N/A'} • {formatDateMMDDYYYY(patient.date_of_birth ?? '')}
                      </p>
                      <p className="text-xs text-muted-foreground">{patient.phone || 'No phone'}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last activity: {formatDateShort(patient.updated_at)}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Panel - Patient Details */}
        <div className="flex-1 overflow-y-auto bg-background">
          {detailsLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse">Loading patient details...</div>
            </div>
          ) : selectedPatient ? (
            <div className="p-6 space-y-6">
              {/* Patient Header */}
              <div className="bg-card/65 rounded-2xl shadow-widget p-6">
                {/* Next Appointment Badge */}
                {selectedPatient.nextAppointment && selectedPatient.nextAppointment.appointment_date && (
                  <div className="mb-4 inline-block">
                    <Badge className="bg-growth-2/10 text-growth-1 border-growth-2 px-3 py-1 text-xs font-semibold">
                      NEXT APPOINTMENT: {new Date(selectedPatient.nextAppointment.appointment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </Badge>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="h-20 w-20 rounded-full bg-growth-4 flex items-center justify-center shrink-0">
                    <span className="text-3xl font-bold text-growth-1">
                      {selectedPatient.first_name?.[0] || '?'}{selectedPatient.last_name?.[0] || '?'}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-foreground">
                        {selectedPatient.first_name || 'Unknown'} {selectedPatient.last_name || 'Patient'}
                      </h2>
                      {selectedPatient.is_active && (
                        <Badge className="bg-success/15 text-success">
                          ACTIVE
                        </Badge>
                      )}
                    </div>

                    {/* Contact Info Grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">DOB</p>
                        <p className="text-foreground font-medium">
                          {formatDateMMDDYYYY(selectedPatient.date_of_birth ?? '')} ({selectedPatient.age} yo)
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground flex items-center gap-1 text-xs">
                          <Phone className="h-3 w-3" /> Phone
                        </p>
                        <p className="text-foreground font-medium">{selectedPatient.phone || 'N/A'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground flex items-center gap-1 text-xs">
                          <Mail className="h-3 w-3" /> Email
                        </p>
                        <p className="text-foreground font-medium">{selectedPatient.email || 'N/A'}</p>
                      </div>
                      {selectedPatient.address && (
                        <div className="col-span-2">
                          <p className="text-muted-foreground flex items-center gap-1 text-xs">
                            <MapPin className="h-3 w-3" /> Address
                          </p>
                          <p className="text-foreground font-medium">{selectedPatient.address}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="grid grid-cols-2 gap-4 shrink-0">
                    <div className="bg-background/50 rounded-lg p-4 text-center min-w-[120px]">
                      <p className="text-xs text-muted-foreground mb-1">Insurance</p>
                      <p className="text-lg font-bold text-foreground">12 Total</p>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 text-center min-w-[120px]">
                      <p className="text-xs text-muted-foreground mb-1">Balance</p>
                      <p className="text-lg font-bold text-foreground">$125.50</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-growth-2 data-[state=active]:bg-transparent"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="appointments"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-growth-2 data-[state=active]:bg-transparent"
                  >
                    Appointments
                  </TabsTrigger>
                  <TabsTrigger
                    value="medical-records"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-growth-2 data-[state=active]:bg-transparent"
                  >
                    Medical Records
                  </TabsTrigger>
                  <TabsTrigger
                    value="messages"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-growth-2 data-[state=active]:bg-transparent"
                  >
                    Messages
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-growth-2 data-[state=active]:bg-transparent"
                  >
                    Billing
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-growth-2 data-[state=active]:bg-transparent"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                  {/* Upcoming Appointments */}
                  <div className="bg-card/65 rounded-2xl shadow-widget p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Upcoming Appointments</h3>
                      <button className="text-sm text-growth-2 hover:text-growth-1">
                        See All
                      </button>
                    </div>

                    {selectedPatient.appointments?.upcoming && selectedPatient.appointments.upcoming.length > 0 ? (
                      <div className="space-y-3">
                        {selectedPatient.appointments.upcoming.slice(0, 2).map((apt, index) => (
                          <div key={apt.id || `apt-${index}`} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                            <div>
                              <p className="font-medium text-foreground">
                                {apt.appointment_date ? new Date(apt.appointment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                              </p>
                              <p className="text-sm text-muted-foreground">Follow Up • Dr. Provider</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-foreground">{apt.type || 'Appointment'}</p>
                              <Badge variant="outline" className="mt-1">{apt.status || 'scheduled'}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No upcoming appointments</p>
                      </div>
                    )}
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-card/65 rounded-2xl shadow-widget p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Recent Activity</h3>
                      <button className="text-sm text-growth-2 hover:text-growth-1">
                        See All
                      </button>
                    </div>

                    {selectedPatient.sessionNotes && selectedPatient.sessionNotes.length > 0 ? (
                      <div className="space-y-3">
                        {selectedPatient.sessionNotes.slice(0, 3).map((note, index) => (
                          <div key={note.id || index} className="p-3 bg-background/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-foreground">{note.session_type || 'Psychology Session'}</p>
                              <p className="text-xs text-muted-foreground">
                                {note.note_date ? new Date(note.note_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">Session documented</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No recent activity</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="appointments" className="mt-6">
                  <div className="bg-card/65 rounded-2xl shadow-widget p-6">
                    <h3 className="font-semibold text-foreground mb-4">All Appointments</h3>
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Appointments list will be displayed here</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="medical-records" className="mt-6">
                  <div className="bg-card/65 rounded-2xl shadow-widget p-6">
                    <h3 className="font-semibold text-foreground mb-4">Medical Records</h3>
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Medical records will be displayed here</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="messages" className="mt-6">
                  <div className="bg-card/65 rounded-2xl shadow-widget p-6">
                    <h3 className="font-semibold text-foreground mb-4">Messages</h3>
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Messages will be displayed here</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="billing" className="mt-6">
                  <div className="bg-card/65 rounded-2xl shadow-widget p-6">
                    <h3 className="font-semibold text-foreground mb-4">Billing</h3>
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Billing information will be displayed here</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="bg-card/65 rounded-2xl shadow-widget p-6">
                    <h3 className="font-semibold text-foreground mb-4">Reviews</h3>
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Patient reviews will be displayed here</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>Select a patient to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
