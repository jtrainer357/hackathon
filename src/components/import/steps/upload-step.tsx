
'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, File, CheckCircle2Icon, AlertCircleIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { UploadedFile } from '../import-wizard'

interface UploadStepProps {
    sourceSystem: string
    onComplete: (batchId: string, files: UploadedFile[]) => void
}

interface UploadFile {
    file: File
    type: 'roster' | 'documents' | 'appointments'
    status: 'pending' | 'uploading' | 'complete' | 'error'
    progress: number
}

export function UploadStep({ sourceSystem, onComplete }: UploadStepProps) {
    const [files, setFiles] = React.useState<UploadFile[]>([])
    const [isDragging, setIsDragging] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files) {
            processFiles(Array.from(e.dataTransfer.files))
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            processFiles(Array.from(e.target.files))
        }
    }

    const processFiles = (newFiles: File[]) => {
        const processed = newFiles.map(file => {
            let type: 'roster' | 'documents' | 'appointments' = 'documents'
            if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) type = 'roster'
            if (file.name.endsWith('.ics')) type = 'appointments'

            return { file, type, status: 'pending', progress: 0 } as UploadFile
        })
        setFiles(prev => [...prev, ...processed])
    }

    const startUpload = async () => {
        const supabase = createClient()
        const uploadingFiles = [...files]

        // 1. Create Batch (Mock or Real)
        // For MVP demonstration without full auth context wiring in client, 
        // we might need to rely on a server action or just mock the ID if RLS fails.
        // However, let's try to fetch user first.

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            toast.error("You must be logged in to import data.")
            return
        }

        // We'll create a fake batch ID for the upload path if we can't insert yet, 
        // or assume we have a way.
        // Let's create a random UUID for the batch just for storage organization.
        const tempBatchId = crypto.randomUUID()

        let successCount = 0

        for (let i = 0; i < uploadingFiles.length; i++) {
            const f = uploadingFiles[i]
            if (f.status === 'complete') {
                successCount++
                continue
            }

            setFiles(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'uploading' } : item))

            try {
                const filePath = `${tempBatchId}/${f.type}/${f.file.name}`
                const { error } = await supabase.storage
                    .from('import-temp')
                    .upload(filePath, f.file)

                if (error) throw error

                setFiles(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'complete', progress: 100 } : item))
                successCount++
            } catch (err) {
                console.error("Upload error", err)
                setFiles(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'error' } : item))
                toast.error(`Failed to upload ${f.file.name}`)
            }
        }


        if (successCount === uploadingFiles.length && successCount > 0) {
            // All done
            // Now we would create the batch record in DB with the references.
            // For MVP, we pass the batchId to the next step which might handle the DB creation via API
            // or we do it here.
            // Let's assume we create it in the background or pass it.
            onComplete(tempBatchId, uploadingFiles.map(f => ({ name: f.file.name, type: f.type })))
        }
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-synapse-6">Upload your files</h2>
                <p className="text-synapse-3">
                    Importing from <span className="font-semibold text-growth-5 capitalize">{sourceSystem}</span>.
                    We accept CSV, XLSX, PDF, and ZIP.
                </p>
            </div>

            <div
                className={cn(
                    "border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer",
                    isDragging ? "border-growth-2 bg-growth-1/5" : "border-synapse-2 hover:border-growth-2",
                    files.length > 0 ? "py-6" : "py-16"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    aria-label="Select files to import"
                    className="hidden"
                    multiple
                    onChange={handleFileSelect}
                    accept=".csv,.xlsx,.xls,.pdf,.zip,.ics"
                />

                {files.length === 0 ? (
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-backbone-2 rounded-full flex items-center justify-center mx-auto text-synapse-4">
                            <Upload className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-medium text-synapse-6">Click to upload or drag and drop</p>
                            <p className="text-sm text-synapse-3">Max file size 500MB</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}>
                            Add more files
                        </Button>
                    </div>
                )}
            </div>

            {files.length > 0 && (
                <div className="space-y-3">
                    {files.map((file, idx) => (
                        <Card key={idx} className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-backbone-2 rounded-lg text-synapse-4">
                                    <File className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-synapse-6 truncate max-w-[200px]">{file.file.name}</p>
                                    <p className="text-xs text-synapse-3 uppercase">{file.type} • {(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                {file.status === 'uploading' && <div className="text-xs text-growth-5 animate-pulse">Uploading...</div>}
                                {file.status === 'complete' && <CheckCircle2Icon className="w-5 h-5 text-vigor" />}
                                {file.status === 'error' && <AlertCircleIcon className="w-5 h-5 text-remedy" />}
                                {file.status === 'pending' && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-synapse-3" onClick={() => removeFile(idx)}>
                                        <span className="sr-only">Remove</span>
                                        ×
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <div className="flex justify-end pt-4">
                <Button
                    className="bg-vitality-1 hover:bg-vitality-2"
                    size="lg"
                    onClick={startUpload}
                    disabled={files.length === 0 || files.some(f => f.status === 'uploading')}
                >
                    {files.some(f => f.status === 'uploading') ? 'Uploading...' : 'Process Import'}
                </Button>
            </div>
        </div>
    )
}
