export const DesignSystem = {
    animation: {
        duration: 0.5,
        staggerChildren: 0.1,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
    chart: {
        strokeWidth: 2,
        barSize: 8,
        radius: 4,
        innerRadius: "70%",
        outerRadius: "100%",
    },
    styles: {
        // Safe fallback values if CSS variables aren't available, 
        // mostly for libraries that require numeric inputs (like Recharts)
        chartStrokeWidth: 2,
        chartBarRadius: 4,
    }
}
