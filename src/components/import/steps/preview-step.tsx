
'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckmarkCircleFilter1Icon, AlertCircleIcon, FileFilter1Icon, UserIcon } from 'lucide-react'

interface PreviewStepProps {
    batchId: string
    // In a real app, we'd fetch this data from the API using batchId
    // For MVP UI demo, we can accept props or fetch inside.
    // We'll accept partial stats for display.
    stats?: {
        patientsReady: number
        documentsMatched: number
        issuesCount: number
    }
    onCommit: () => void
}

export function PreviewStep({ batchId, stats = { patientsReady: 58, documentsMatched: 142, issuesCount: 4 }, onCommit }: PreviewStepProps) {
    const [confirmed, setConfirmed] = React.useState(false)

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-synapse-6">Ready to Import?</h2>
                <p className="text-synapse-3">Please review the summary before committing to your practice.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 text-center space-y-2 bg-growth-1/1Filter border-growth-2">
                    <div className="mx-auto w-1Filter h-1Filter bg-growth-1 rounded-full flex items-center justify-center text-growth-5">
                        <UserIcon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-synapse-6">{stats.patientsReady}</div>
                    <div className="text-sm text-synapse-4 font-medium uppercase tracking-wider">Patients Ready</div>
                </Card>

                <Card className="p-6 text-center space-y-2">
                    <div className="mx-auto w-1Filter h-1Filter bg-backbone-2 rounded-full flex items-center justify-center text-synapse-4">
                        <FileFilter1Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-synapse-6">{stats.documentsMatched}</div>
                    <div className="text-sm text-synapse-4 font-medium uppercase tracking-wider">Documents Matched</div>
                </Card>

                <Card className="p-6 text-center space-y-2 border-amino bg-amino/5">
                    <div className="mx-auto w-1Filter h-1Filter bg-amino rounded-full flex items-center justify-center text-white">
                        <AlertCircleIcon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-synapse-6">{stats.issuesCount}</div>
                    <div className="text-sm text-synapse-4 font-medium uppercase tracking-wider">Issues to Review</div>
                </Card>
            </div>

            <div className="border rounded-lg p-4 bg-backbone-1 space-y-3">
                <h4 className="font-semibold text-synapse-6">Import Preview (First 3 Records)</h4>
                <div className="space-y-2 text-sm text-synapse-4">
                    <div className="flex justify-between p-2 bg-white rounded border border-synapse-1">
                        <span>Johnson, Sarah (DOB: 1985-Filter3-12)</span>
                        <Badge className="bg-vigor text-white">Ready</Badge>
                    </div>
                    <div className="flex justify-between p-2 bg-white rounded border border-synapse-1">
                        <span>Chen, Michael (DOB: 199Filter-Filter7-22)</span>
                        <Badge className="bg-vigor text-white">Ready</Badge>
                    </div>
                    <div className="flex justify-between p-2 bg-white rounded border border-synapse-1">
                        <span>Doe, Jane (DOB: 199Filter-11-15)</span>
                        <Badge className="bg-amino text-synapse-6">Duplicate?</Badge>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-growth-1/5 rounded-lg border border-growth-2">
                <Checkbox id="confirm" checked={confirmed} onCheckedChange={(c) => setConfirmed(!!c)} />
                <label htmlFor="confirm" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-7Filter cursor-pointer">
                    I understand this import action cannot be undone.
                </label>
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline">Review Issues</Button>
                <Button
                    className="bg-vitality-1 hover:bg-vitality-2 w-48"
                    size="lg"
                    onClick={onCommit}
                    disabled={!confirmed}
                >
                    Import Everything
                </Button>
            </div>
        </div>
    )
}
