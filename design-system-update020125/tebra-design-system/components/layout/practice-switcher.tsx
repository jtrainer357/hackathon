'use client';

import { useState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { ChevronDown, Building2, Check, Loader2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Practice {
    id: string;
    name: string;
    slug?: string;
}

interface PracticeSwitcherProps {
    practices?: Practice[];
    currentPractice?: Practice | null;
    onSwitch?: (practice: Practice) => Promise<void> | void;
}

export function PracticeSwitcher({
    practices: initialPractices,
    currentPractice: initialCurrent,
    onSwitch
}: PracticeSwitcherProps) {
    const [practices, setPractices] = useState<Practice[]>([]);
    const [currentPractice, setCurrentPractice] = useState<Practice | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (initialPractices && initialCurrent) {
            setPractices(initialPractices);
            setCurrentPractice(initialCurrent);
            setIsLoading(false);
        } else {
            // DEMO MODE: Load mock data if no props provided
            // This ensures the component looks perfect in a fresh Design System install
            // without requiring backend connection.
            const demoPractices = [
                { id: '1', name: 'Coastal Medical Group', slug: 'coastal-medical' },
                { id: '2', name: 'Downtown Family Practice', slug: 'downtown-family' },
                { id: '3', name: 'Westside Cardiology', slug: 'westside-cardio' },
            ];
            setPractices(demoPractices);
            setCurrentPractice(demoPractices[0]);
            setIsLoading(false);
        }
    }, [initialPractices, initialCurrent]);

    const handleSwitch = (practice: Practice) => {
        if (practice.id === currentPractice?.id) return;

        startTransition(async () => {
            if (onSwitch) {
                await onSwitch(practice);
            } else {
                // Demo mode switch
                await new Promise(resolve => setTimeout(resolve, 500)); // Fake network delay
                setCurrentPractice(practice);
                toast.success(`Switched to ${practice.name}`);
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-lg">Loading...</span>
            </div>
        );
    }

    // If only one practice, just show the name without dropdown
    if (practices.length <= 1) {
        return (
            <h1 className="text-2xl font-normal tracking-tight">
                {currentPractice?.name || 'No Practice'}
            </h1>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="flex items-center gap-2 hover:bg-card/50 rounded-lg px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                disabled={isPending}
            >
                <Building2 className="h-5 w-5 text-growth-1" />
                <span className="text-2xl font-normal tracking-tight">
                    {currentPractice?.name || 'Select Practice'}
                </span>
                {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
                {practices.map((practice) => (
                    <DropdownMenuItem
                        key={practice.id}
                        onClick={() => handleSwitch(practice)}
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-growth-2" />
                            <span className={practice.id === currentPractice?.id ? 'font-medium' : ''}>
                                {practice.name}
                            </span>
                        </div>
                        {practice.id === currentPractice?.id && (
                            <Check className="h-4 w-4 text-vigor" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
