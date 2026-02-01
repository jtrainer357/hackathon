'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
    File01Icon,
    HealthIcon,
    GoogleIcon,
    TableIcon,
    Settings01Icon
} from 'hugeicons-react'

interface SourceSelectionStepProps {
    onSelect: (system: string) => void
}

const sources = [
    { id: 'simplepractice', name: 'SimplePractice', icon: HealthIcon, color: 'text-orange-500' },
    { id: 'therapynotes', name: 'TherapyNotes', icon: File01Icon, color: 'text-blue-500' },
    { id: 'google', name: 'Google/Excel', icon: GoogleIcon, color: 'text-green-500' },
    { id: 'other', name: 'Other EHR', icon: Settings01Icon, color: 'text-synapse-4' },
]

export function SourceSelectionStep({ onSelect }: SourceSelectionStepProps) {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-synapse-6">Where are you importing from?</h2>
                <p className="text-synapse-3">We&apos;ll tailor the import experience to your source system.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sources.map((source) => (
                    <motion.div
                        key={source.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card
                            className="p-6 cursor-pointer hover:border-growth-2 hover:bg-growth-1/5 transition-colors flex items-center space-x-4"
                            onClick={() => onSelect(source.id)}
                        >
                            <div className={`p-3 rounded-full bg-backbone-1 ${source.color}`}>
                                <source.icon className="w-8 h-8" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-synapse-6">{source.name}</h3>
                                <p className="text-sm text-synapse-3">Import patients, notes & documents</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
