"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { WidgetContainer } from "@/components/ui/widget-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from "framer-motion"
import { DesignSystem } from "@/lib/design-system"
import { generateInsights } from "@/lib/substrate/clinical-insights"
import { InsightsCard } from "@/components/clinical/insights-card"
interface PatientAppointment {
  id?: string
  appointment_date: string
  appointment_time: string
  type: string
  status?: string
}

interface PatientSessionNote {
  id?: string
  note_date: string
  type?: string
  subjective?: string
  objective?: string
  assessment?: string
  plan?: string
  therapist_name?: string
}

interface PatientOutcomeMeasure {
  measurement_date: string
  score: number
}

interface PatientPageData {
  id: string
  first_name: string
  last_name: string
  email: string | null
  phone: string | null
  date_of_birth: string
  age: number
  pronouns: string | null
  chief_complaint: string | null
  treatment_plan: string | null
  active_diagnoses: string | null
  nextAppointment: PatientAppointment | null
  recentNote: PatientSessionNote | null
  sessionNotes: PatientSessionNote[]
  appointments: PatientAppointment[]
  outcomeMeasures: Record<string, PatientOutcomeMeasure[]>
}

// Mock data for Tim Anders
const MOCK_TIM_ANDERS: PatientPageData = {
  id: "c0000000-0000-0000-0000-000000000001",
  first_name: "Tim",
  last_name: "Anders",
  email: "tim.anders@email.com",
  phone: "(555) 123-4567",
  date_of_birth: "1990-03-15",
  age: 34,
  pronouns: "he/him",
  chief_complaint: "Anxiety and work stress",
  treatment_plan: "Weekly CBT sessions focusing on cognitive restructuring and stress management techniques",
  active_diagnoses: "F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety",
  nextAppointment: {
    appointment_date: "2026-02-06",
    appointment_time: "10:00:00",
    type: "Therapy Session"
  },
  recentNote: {
    note_date: "2026-01-23",
    subjective: "Tim reports feeling more in control of his anxiety...",
  },
  sessionNotes: [
    {
      id: "1",
      note_date: "2026-01-23",
      type: "Therapy Session",
      subjective: "Tim reports feeling more in control of his anxiety this week. He successfully used the grounding techniques during a stressful work presentation.",
      objective: "Patient appeared relaxed and engaged. Good eye contact. Affect congruent with mood.",
      assessment: "Continued progress in managing work-related anxiety. Demonstrating effective use of coping skills.",
      plan: "Continue weekly CBT sessions. Practice cognitive restructuring with upcoming project deadlines.",
      therapist_name: "Dr. Sarah Chen"
    },
    {
      id: "2",
      note_date: "2026-01-16",
      type: "Therapy Session",
      subjective: "Tim reports increased anxiety about an upcoming project deadline. Having difficulty sleeping.",
      objective: "Patient appeared tense. Fidgeting noted. Speech rapid at times.",
      assessment: "Acute anxiety spike related to work stressor. Sleep disruption noted.",
      plan: "Review sleep hygiene. Introduce progressive muscle relaxation. Check in about work boundaries.",
      therapist_name: "Dr. Sarah Chen"
    }
  ],
  appointments: [
    { appointment_date: "2026-02-06", appointment_time: "10:00:00", type: "Therapy Session", status: "scheduled" },
    { appointment_date: "2026-02-13", appointment_time: "10:00:00", type: "Therapy Session", status: "scheduled" },
    { appointment_date: "2026-01-23", appointment_time: "10:00:00", type: "Therapy Session", status: "completed" },
  ],
  outcomeMeasures: {
    "PHQ-9": [
      { measurement_date: "2025-06-15", score: 18 },
      { measurement_date: "2025-07-15", score: 16 },
      { measurement_date: "2025-08-15", score: 14 },
      { measurement_date: "2025-09-15", score: 12 },
      { measurement_date: "2025-10-15", score: 10 },
      { measurement_date: "2025-11-15", score: 8 },
      { measurement_date: "2026-01-15", score: 3 }
    ],
    "GAD-7": [
      { measurement_date: "2025-06-15", score: 15 },
      { measurement_date: "2025-07-15", score: 14 },
      { measurement_date: "2025-08-15", score: 12 },
      { measurement_date: "2025-09-15", score: 10 },
      { measurement_date: "2025-10-15", score: 8 },
      { measurement_date: "2025-11-15", score: 6 },
      { measurement_date: "2026-01-15", score: 4 }
    ]
  }
}

export default function PatientPage() {
  const params = useParams()
  const id = params?.id as string
  const [patient, setPatient] = useState<PatientPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showFullHistory, setShowFullHistory] = useState(false)

  useEffect(() => {
    async function fetchPatient() {
      try {
        const response = await fetch(`/api/patients/${id}`)
        if (response.ok) {
          const data = await response.json()
          setPatient(data)
        } else {
          // Use mock data if API fails
          // API unavailable, using mock data
          setPatient(MOCK_TIM_ANDERS)
        }
      } catch (error) {
        console.error("Error fetching patient:", error)
        // Use mock data as fallback
        setPatient(MOCK_TIM_ANDERS)
      } finally {
        setLoading(false)
      }
    }

    fetchPatient()
  }, [id])

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-muted rounded-2xl"></div>
          <div className="h-96 bg-muted rounded-2xl"></div>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground">Patient not found</h2>
        </div>
      </div>
    )
  }

  // Prepare chart data
  const chartData = patient.outcomeMeasures["PHQ-9"]?.map((phq, index) => ({
    date: new Date(phq.measurement_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    "PHQ-9": phq.score,
    "GAD-7": patient.outcomeMeasures["GAD-7"]?.[index]?.score || 0
  })) || []

  // Calculate trend
  const phqScores = patient.outcomeMeasures["PHQ-9"] || []
  const trend = phqScores.length >= 2
    ? phqScores[phqScores.length - 1].score - phqScores[0].score
    : 0

  const TrendIcon = trend < 0 ? TrendingDown : trend > 0 ? TrendingUp : Minus
  const trendColor = trend < 0 ? "text-success" : trend > 0 ? "text-alert" : "text-muted-foreground"
  const trendLabel = trend < 0 ? "Improving" : trend > 0 ? "Worsening" : "Stable"

  return (
    <motion.div
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DesignSystem.animation.duration }}
    >
      {/* Patient Header */}
      <WidgetContainer title="Patient Overview" hideHeader>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Avatar */}
            <div className="h-16 w-16 rounded-full bg-growth-4 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-growth-1">
                {patient.first_name[0]}{patient.last_name[0]}
              </span>
            </div>

            {/* Name & Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {patient.first_name} {patient.last_name}
                </h1>
                {patient.pronouns && (
                  <Badge variant="secondary" className="text-sm">
                    {patient.pronouns}
                  </Badge>
                )}
                <Badge variant="outline" className="text-sm">
                  {patient.age} years old
                </Badge>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                {patient.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    {patient.email}
                  </div>
                )}
                {patient.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4" />
                    {patient.phone}
                  </div>
                )}
              </div>
            </div>

            {/* Next Appointment CTA */}
            {patient.nextAppointment && (
              <Button className="shrink-0 h-12 min-h-[48px] rounded-full px-6 font-bold">
                <Calendar className="h-5 w-5 mr-2" />
                Next: {new Date(patient.nextAppointment.appointment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {patient.nextAppointment.appointment_time.slice(0, 5)}
              </Button>
            )}
          </div>

          {/* Chart Summary */}
          <div className="pt-4 border-t border-border space-y-3">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-1">Chief Complaint</h3>
              <p className="text-foreground">{patient.chief_complaint}</p>
            </div>

            {patient.active_diagnoses && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-1">Active Diagnoses</h3>
                <p className="text-foreground">{patient.active_diagnoses}</p>
              </div>
            )}

            {!showFullHistory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullHistory(true)}
                className="text-growth-2 hover:text-growth-1"
              >
                Show More
              </Button>
            )}

            {showFullHistory && patient.treatment_plan && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3"
              >
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-1">Treatment Plan</h3>
                  <p className="text-foreground">{patient.treatment_plan}</p>
                </div>
                {patient.recentNote && (
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-1">
                      Last Visit ({new Date(patient.recentNote.note_date).toLocaleDateString()})
                    </h3>
                    <p className="text-foreground">{patient.recentNote.subjective}</p>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullHistory(false)}
                  className="text-growth-2 hover:text-growth-1"
                >
                  Show Less
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </WidgetContainer>

      {/* Substrate Insights */}
      {patient && (
        <InsightsCard
          insights={generateInsights({
            first_name: patient.first_name,
            last_name: patient.last_name,
            outcomeMeasures: patient.outcomeMeasures,
            appointments: patient.appointments,
            treatment_plan: patient.treatment_plan,
          })}
        />
      )}

      {/* Tabbed Interface */}
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="notes" className="py-3 text-xs md:text-sm">Session Notes</TabsTrigger>
          <TabsTrigger value="treatment" className="py-3 text-xs md:text-sm">Treatment Plan</TabsTrigger>
          <TabsTrigger value="outcomes" className="py-3 text-xs md:text-sm">Outcome Measures</TabsTrigger>
          <TabsTrigger value="communications" className="py-3 text-xs md:text-sm">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="mt-6">
          <WidgetContainer title={`Session Notes (${patient.sessionNotes.length})`}>
            <div className="space-y-4">
              {patient.sessionNotes.map((note, index) => (
                <div
                  key={note.id || index}
                  className="p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {new Date(note.note_date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </h4>
                      <p className="text-sm text-muted-foreground">{note.therapist_name} • {note.type}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <strong className="text-muted-foreground">S:</strong>
                      <span className="ml-2 text-foreground">{note.subjective}</span>
                    </div>
                    <div>
                      <strong className="text-muted-foreground">O:</strong>
                      <span className="ml-2 text-foreground">{note.objective}</span>
                    </div>
                    <div>
                      <strong className="text-muted-foreground">A:</strong>
                      <span className="ml-2 text-foreground">{note.assessment}</span>
                    </div>
                    <div>
                      <strong className="text-muted-foreground">P:</strong>
                      <span className="ml-2 text-foreground">{note.plan}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </WidgetContainer>
        </TabsContent>

        <TabsContent value="treatment" className="mt-6">
          <WidgetContainer title="Treatment Plan">
            <div className="prose max-w-none">
              <p className="text-foreground">{patient.treatment_plan}</p>
              <div className="mt-6 p-4 bg-growth-5 rounded-lg">
                <h4 className="font-semibold mb-2 text-foreground">Goals</h4>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• Reduce anxiety symptoms by 50% (PHQ-9 score &lt; 10)</li>
                  <li>• Develop effective stress management techniques</li>
                  <li>• Improve work-life balance and set healthy boundaries</li>
                </ul>
              </div>
            </div>
          </WidgetContainer>
        </TabsContent>

        <TabsContent value="outcomes" className="mt-6">
          <WidgetContainer
            title="Outcome Measures"
            headerAction={
              <div className={`flex items-center gap-2 ${trendColor}`}>
                <TrendIcon className="h-5 w-5" />
                <span className="font-semibold">{trendLabel}</span>
              </div>
            }
          >
            <div className="h-60 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="PHQ-9"
                    stroke="hsl(var(--growth-2))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--growth-2))', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="GAD-7"
                    stroke="hsl(var(--vitality-1))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--vitality-1))', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">PHQ-9 (Depression)</p>
                <p className="text-3xl font-bold text-foreground">
                  {phqScores[phqScores.length - 1]?.score || 0}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.abs(trend)} point improvement
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">GAD-7 (Anxiety)</p>
                <p className="text-3xl font-bold text-foreground">
                  {patient.outcomeMeasures["GAD-7"]?.[patient.outcomeMeasures["GAD-7"].length - 1]?.score || 0}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Mild symptoms</p>
              </div>
            </div>
          </WidgetContainer>
        </TabsContent>

        <TabsContent value="communications" className="mt-6">
          <WidgetContainer title="Patient Communications">
            <div className="text-center py-12 text-muted-foreground">
              <p>No messages yet</p>
            </div>
          </WidgetContainer>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
