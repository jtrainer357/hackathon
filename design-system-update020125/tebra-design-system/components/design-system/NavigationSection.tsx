"use client"

import * as React from "react"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function NavigationSection() {
    return (
        <section id="navigation" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Navigation</h2>
                <p className="text-muted-foreground">Menus, orientation, and context-switching elements.</p>
            </div>

            <div className="grid gap-6">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Breadcrumb</CardTitle>
                        <CardDescription>Hierarchical location indicator.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Settings</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Tabs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="account" className="w-[400px]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="password">Password</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account" className="border rounded-md p-4 mt-2">
                                Make changes to your account here.
                            </TabsContent>
                            <TabsContent value="password" className="border rounded-md p-4 mt-2">
                                Change your password here.
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Menubar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Menubar className="w-fit">
                            <MenubarMenu>
                                <MenubarTrigger>File</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>New Window</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Share</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Edit</MenubarTrigger>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>View</MenubarTrigger>
                            </MenubarMenu>
                        </Menubar>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Navigation Menu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                        href="/"
                                                    >
                                                        <div className="mb-2 mt-4 text-lg font-medium">
                                                            shadcn/ui
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                            Beautifully designed components built with Radix UI and Tailwind CSS.
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                        Components
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Pagination</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive>2</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
