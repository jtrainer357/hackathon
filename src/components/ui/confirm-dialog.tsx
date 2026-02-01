'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface ConfirmDialogProps {
    trigger?: React.ReactNode
    title: string
    description: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => Promise<void> | void
    destructive?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function ConfirmDialog({
    trigger,
    title,
    description,
    confirmText = "Continue",
    cancelText = "Cancel",
    onConfirm,
    destructive = false,
    open: controlledOpen,
    onOpenChange: setControlledOpen,
}: ConfirmDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen
    const setOpen = isControlled ? setControlledOpen! : setInternalOpen

    const handleConfirm = async (e: React.MouseEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await onConfirm()
            setOpen(false)
        } catch (error) {
            console.error("Confirmation action failed:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className={destructive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
