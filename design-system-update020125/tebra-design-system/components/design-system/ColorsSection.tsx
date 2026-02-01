"use client"

import { Card, CardContent } from "@/components/ui/card"

const growthColors = [
    { name: "Growth 1", variable: "--growth-1", hex: "#004852", description: "Deep teal" },
    { name: "Growth 1.5", variable: "--growth-1-5", hex: "#195B63", description: "Medium deep teal" },
    { name: "Growth 2", variable: "--growth-2", hex: "#417E86", description: "Primary teal" },
    { name: "Growth 3", variable: "--growth-3", hex: "#8CB2B6", description: "Soft green-teal" },
    { name: "Growth 4", variable: "--growth-4", hex: "#C8DDE0", description: "Light blue-grey" },
    { name: "Growth 5", variable: "--growth-5", hex: "#EEF7F9", description: "Pale blue-white" },
]

const vitalityColors = [
    { name: "Vitality 0", variable: "--vitality-0", hex: "#DC7B5D", description: "Deep coral" },
    { name: "Vitality 1", variable: "--vitality-1", hex: "#FF8D6E", description: "Primary coral" },
    { name: "Vitality 2", variable: "--vitality-2", hex: "#FFAF95", description: "Soft coral" },
    { name: "Vitality 3", variable: "--vitality-3", hex: "#FFCFBF", description: "Light peach" },
    { name: "Vitality 4", variable: "--vitality-4", hex: "#FFE9E3", description: "Pale peach" },
]

const backboneColors = [
    { name: "Backbone 1", variable: "--backbone-1", hex: "#F6F3EB", description: "Warm white" },
    { name: "Backbone 2", variable: "--backbone-2", hex: "#F0EEE8", description: "Stone" },
    { name: "Backbone 3", variable: "--backbone-3", hex: "#E8E5DF", description: "Light grey-stone" },
    { name: "Backbone 4", variable: "--backbone-4", hex: "#E1DED8", description: "Medium grey-stone" },
]

const coreColors = [
    { name: "Core 1", variable: "--core-1", hex: "#8CA7A2", description: "Sage green" },
    { name: "Core 2", variable: "--core-2", hex: "#B3C6C4", description: "Soft sage" },
    { name: "Core 3", variable: "--core-3", hex: "#D4E0DD", description: "Pale green-grey" },
    { name: "Core 4", variable: "--core-4", hex: "#E9EFEE", description: "Near white green" },
]

const careColors = [
    { name: "Care 1", variable: "--care-1", hex: "#E0D3C8", description: "Warm beige" },
    { name: "Care 2", variable: "--care-2", hex: "#EEE5DE", description: "Light beige" },
    { name: "Care 3", variable: "--care-3", hex: "#F6F2EC", description: "Pale beige" },
    { name: "Care 4", variable: "--care-4", hex: "#F8F9F8", description: "Near white beige" },
]

const synapseColors = [
    { name: "Synapse 1", variable: "--synapse-1", hex: "#000000", description: "Black" },
    { name: "Synapse 2", variable: "--synapse-2", hex: "#545454", description: "Dark Grey" },
    { name: "Synapse 3", variable: "--synapse-3", hex: "#9A9A9A", description: "Medium Grey" },
    { name: "Synapse 4", variable: "--synapse-4", hex: "#D6D6D6", description: "Light Grey" },
    { name: "Synapse 5", variable: "--synapse-5", hex: "#F6F6F6", description: "Ultra Light Grey" },
    { name: "Synapse 6", variable: "--synapse-6", hex: "#FFFFFF", description: "White" },
]

const successColors = [
    { name: "Soma", variable: "--soma", hex: "#1D6B45", description: "Deep Green" },
    { name: "Vigor", variable: "--vigor", hex: "#2B865A", description: "Primary Green" },
    { name: "Cyto", variable: "--cyto", hex: "#3FA266", description: "Bright Green" },
    { name: "Restore", variable: "--restore", hex: "#6FC691", description: "Soft Green" },
    { name: "Asana", variable: "--asana", hex: "#C3E7C0", description: "Pale Green" },
]

const warningColors = [
    { name: "Neuron", variable: "--neuron", hex: "#F2BA2A", description: "Deep Yellow" },
    { name: "Energize", variable: "--energize", hex: "#FCDE73", description: "Bright Yellow" },
    { name: "Amino", variable: "--amino", hex: "#FEF5D5", description: "Pale Yellow" },
]

const errorColors = [
    { name: "Remedy", variable: "--remedy", hex: "#B51A2C", description: "Deep Red" },
    { name: "First Aid", variable: "--first-aid", hex: "#D83B4D", description: "Primary Red" },
    { name: "Siren", variable: "--siren", hex: "#F8CBD1", description: "Soft Red" },
    { name: "Plasma", variable: "--plasma", hex: "#FCEEEE", description: "Pale Red" },
]

export function ColorsSection() {
    return (
        <section id="colors" className="space-y-10 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Color Palette</h2>
                <p className="text-muted-foreground">The official brand colors, functional palettes, and semantic tokens.</p>
            </div>

            <div className="space-y-12">
                <PaletteGroup title="Growth" colors={growthColors} />
                <PaletteGroup title="Vitality" colors={vitalityColors} />
                <PaletteGroup title="Backbone" colors={backboneColors} />
                <PaletteGroup title="Core" colors={coreColors} />
                <PaletteGroup title="Care" colors={careColors} />
                <PaletteGroup title="Synapse (Neutrals)" colors={synapseColors} />
                <PaletteGroup title="State / Success (Green)" colors={successColors} />
                <PaletteGroup title="State / Warning" colors={warningColors} />
                <PaletteGroup title="State / Error & Alert" colors={errorColors} />
            </div>
        </section>
    )
}

function PaletteGroup({ title, colors }: { title: string, colors: any[] }) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">{title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {colors.map((color) => (
                    <ColorCard key={color.name} {...color} />
                ))}
            </div>
        </div>
    )
}

function ColorCard({ name, variable, hex, description }: { name: string, variable: string, hex?: string, description: string }) {
    return (
        <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <div
                className="h-24 w-full"
                style={{ backgroundColor: `var(${variable})` }}
            />
            <CardContent className="p-3">
                <div className="font-bold text-sm">{name}</div>
                <div className="text-[10px] font-mono text-muted-foreground truncate">{variable}</div>
                {hex && <div className="text-[10px] font-mono text-muted-foreground opacity-70">{hex}</div>}
                <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{description}</p>
            </CardContent>
        </Card>
    )
}
