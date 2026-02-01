"use client"

import React from "react"
import { useCanvasState } from "@/hooks/useCanvasState"
import { WidgetContainer } from "@/components/ui/widget-container"
import { PriorityActionsModule, PriorityActionsHeaderAction, PriorityActionsTitleBadge } from "@/components/voice-canvas/modules/PriorityActionsModule"
import { ActionsDetailModule } from "@/components/dashboard/actions-detail-module"
import { ActionsCompletionModal } from "@/components/dashboard/actions-completion-modal"

export function PriorityActionsWidget() {
    const [view, setView] = React.useState<'list' | 'detail'>('list')
    const [priorityData, setPriorityData] = React.useState<{ michaelCompleted: boolean, allCompleted: boolean }>({ michaelCompleted: false, allCompleted: false })
    const [isCompleting, setIsCompleting] = React.useState(false)
    const { dashboardWidget } = useCanvasState()

    // Listen for custom event from voice command
    React.useEffect(() => {
        const handleVoiceCompletion = (e: CustomEvent) => {
            if (e.detail?.action === 'complete_priority_actions') {
                handleComplete()
            }
            if (e.detail?.action === 'show_michael_chen_details') {
                setView('detail')
            }
        }

        window.addEventListener('voice-action', handleVoiceCompletion as EventListener)
        return () => window.removeEventListener('voice-action', handleVoiceCompletion as EventListener)
    }, [])

    const handleActionClick = (id: number) => {
        // ID 1 is Michael Chen in our mock data
        if (id === 1) {
            setView('detail')
        }
    }

    const handleBack = () => {
        setView('list')
    }

    const handleComplete = () => {
        setIsCompleting(true)
        setTimeout(() => {
            setIsCompleting(false)
            setPriorityData({ michaelCompleted: true, allCompleted: true })
            setView('list')
        }, 2500)
    }

    if (view === 'detail') {
        return (
            <>
                <ActionsDetailModule
                    onCancel={handleBack}
                    onComplete={handleComplete}
                />
                <ActionsCompletionModal isOpen={isCompleting} />
            </>
        )
    }

    return (
        <WidgetContainer
            title="Priority Actions"
            headerAction={!priorityData.allCompleted && <PriorityActionsHeaderAction />}
            titleSuffix={<PriorityActionsTitleBadge />}
            contentClassName="p-0"
        >
            <PriorityActionsModule
                onActionClick={handleActionClick}
                data={priorityData}
            />
            <ActionsCompletionModal isOpen={isCompleting} />
        </WidgetContainer>
    )
}
