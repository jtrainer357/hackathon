import { WidgetContainer } from "@/components/ui/widget-container";

export default function CalendarPage() {
  return (
    <div className="p-dashboard-padding max-w-dashboard-max-width mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-synapse-1">Calendar</h1>
        <p className="text-synapse-3 mt-2">View and manage appointments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendar View */}
        <WidgetContainer
          title="Schedule"
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-center h-96">
            <p className="text-synapse-3">Calendar interface will be implemented here</p>
          </div>
        </WidgetContainer>

        {/* Today's Appointments */}
        <WidgetContainer
          title="Today's Appointments"
        >
          <div className="space-y-3">
            <p className="text-sm text-synapse-3">Appointment list will appear here</p>
          </div>
        </WidgetContainer>
      </div>
    </div>
  );
}
