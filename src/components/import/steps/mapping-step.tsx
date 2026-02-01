
'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckmarkCircle01Icon, AlertCircleIcon, ArrowRight01Icon } from 'hugeicons-react'
import { ColumnMapping } from '@/lib/ai/gemini-import'
import { cn } from '@/lib/utils'

interface MappingStepProps {
    mappings: ColumnMapping[]
    onComplete: (confirmedMappings: ColumnMapping[]) => void
}

export function MappingStep({ mappings: initialMappings, onComplete }: MappingStepProps) {
    const [mappings, setMappings] = React.useState<ColumnMapping[]>(initialMappings)

    const handleConfirm = () => {
        onComplete(mappings)
    }

    const getConfidenceLevel = (confidence: number) => {
        if (confidence >= 0.9) return 'High'
        if (confidence >= 0.7) return 'Medium'
        return 'Low'
    }

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.9) return 'bg-vigor text-white' // Green
        if (confidence >= 0.7) return 'bg-amino text-synapse-6' // Yellow
        return 'bg-remedy text-white' // Red
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-synapse-6">Review Data Mapping</h2>
                <p className="text-synapse-3">We've mapped your file columns to our system. Please review.</p>
            </div>

            <div className="space-y-4">
                {mappings.map((mapping, idx) => (
                    <Card key={idx} className="p-4 flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-xs font-semibold text-synapse-4 uppercase mb-1">Source Column</p>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-synapse-6">{mapping.sourceColumn}</span>
                            </div>
                        </div>

                        <div className="mx-4 text-synapse-3">
                            <ArrowRight01Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                            <p className="text-xs font-semibold text-synapse-4 uppercase mb-1">Target Field</p>
                            <div className="flex items-center justify-between">
                                <span className={cn("font-medium", mapping.targetField ? "text-growth-5" : "text-synapse-3 italic")}>
                                    {mapping.targetField || "Do Not Import"}
                                </span>

                                <Badge className={`${getConfidenceColor(mapping.confidence)}`}>
                                    {getConfidenceLevel(mapping.confidence)} Match
                                </Badge>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    className="bg-vitality-1 hover:bg-vitality-2"
                    size="lg"
                    onClick={handleConfirm}
                >
                    Confirm Mappings
                </Button>
            </div>
        </div>
    )
}
