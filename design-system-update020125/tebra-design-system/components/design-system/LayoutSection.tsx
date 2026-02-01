"use client"

import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator } from "@/components/ui/context-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"

export function LayoutSection() {
    return (
        <section id="layout" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Layout & Containers</h2>
                <p className="text-muted-foreground">Structural building blocks and content organization.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Accordion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is it styled?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It comes with default styles that matches the other
                                    components' aesthetic.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Scroll Area</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-32 w-full rounded-md border p-4 border-dashed border-border/50">
                            Jokerman. The quick brown fox jumps over the lazy dog.
                            Typography is the craft of endowing human language with a durable visual form.
                            Design is a formal response to a strategic question.
                            The world is full of obvious things which nobody by any chance ever observes.
                            Design is a formal response to a strategic question.
                            The world is full of obvious things which nobody by any chance ever observes.
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Resizable Panels</CardTitle>
                        <CardDescription>Drag the handle to resize panels.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px]">
                        <ResizablePanelGroup direction="horizontal" className="rounded-lg border border-border/50">
                            <ResizablePanel defaultSize={25}>
                                <div className="flex h-full items-center justify-center p-6 bg-muted/20">
                                    <span className="font-semibold text-xs">Sidebar</span>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel defaultSize={75}>
                                <div className="flex h-full items-center justify-center p-6">
                                    <span className="font-semibold text-xs">Content Area</span>
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Collapsible</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Collapsible className="w-full space-y-2">
                            <div className="flex items-center justify-between space-x-4 px-4 py-2 border rounded-md">
                                <h4 className="text-sm font-semibold">@lineto-akkurat</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-9 p-0">
                                        <HugeiconsIcon icon={ArrowDown01Icon} className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                AkkuratLL-Regular.otf
                            </div>
                            <CollapsibleContent className="space-y-2">
                                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                    AkkuratLL-Bold.otf
                                </div>
                                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                    AkkuratLL-Black.otf
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Aspect Ratio (16:9)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-md">
                            <AspectRatio ratio={16 / 9} className="bg-muted flex items-center justify-center">
                                <div className="text-muted-foreground/50 font-bold">16:9 Content</div>
                            </AspectRatio>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Carousel & Skeletons</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="px-12 pb-4">
                            <Carousel className="w-full max-w-xs mx-auto">
                                <CarouselContent>
                                    {[1, 2, 3].map((_, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6 bg-muted/30">
                                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>

                        <Separator />

                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm col-span-full">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Context Menu</CardTitle>
                        <CardDescription>Right-click the area below to see the menu.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ContextMenu>
                            <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed border-border/50 text-sm">
                                Right click here
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-64">
                                <ContextMenuItem inset>Back</ContextMenuItem>
                                <ContextMenuItem inset disabled>Forward</ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem inset>Reload</ContextMenuItem>
                                <ContextMenuItem inset>Settings</ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
