import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { useState, useRef } from "react";

export default function Dashboard({ auth }: PageProps) {
    // State to control dialog visibility and event title
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEventTitle, setSelectedEventTitle] = useState("");
    const calendarRef = useRef<FullCalendar>(null); // Add a ref for the calendar

    const handleDateClick = (info: any) => {
        // setSelectedEventTitle(info.dateStr); // Set the event title
        // setIsDialogOpen(true); // Open the dialog
        // if calendar mode is year then change to day
        console.log({ info });
        if (info.view.type === "yearGrid" && calendarRef.current) {
            calendarRef.current.getApi().changeView("timeGridDay"); // Change the calendar view
        }
    };

    const handleEventClick = (info: any) => {
        console.log(info);
        setSelectedEventTitle(
            `${info.event._def.extendedProps.time} ${info.event.title}`
        ); // Set the event title
        setIsDialogOpen(true); // Open the dialog
    };

    const closeDialog = () => {
        setIsDialogOpen(false); // Close the dialog
        setSelectedEventTitle(""); // Clear the selected title
    };

    const changeView = (view: string) => {
        if (calendarRef.current) {
            calendarRef.current.getApi().changeView(view); // Change the calendar view
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex">
                <aside className="h-full border-r max-w-64 p-4">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Sed, cum a obcaecati dolore suscipit, ad qui
                        perspiciatis esse minus consequuntur aperiam consequatur
                        beatae quae harum dolorum nulla quia id! Autem quas
                        fugit odio delectus expedita labore laudantium suscipit
                        consequatur earum temporibus. Quia recusandae ratione,
                        perspiciatis voluptatum est deserunt aspernatur
                        repudiandae totam optio praesentium nobis laboriosam
                        vitae accusantium laudantium harum tenetur dicta maxime
                        quidem culpa nulla! Optio aliquid itaque aperiam
                        temporibus minus odio magnam recusandae iure, veniam
                        voluptatibus, possimus voluptatem. Beatae laudantium
                        tempora in, quisquam fuga voluptatibus nam vel tempore
                        explicabo aperiam, quam sunt? Consequuntur, cum minima
                        sint rem mollitia aspernatur.
                    </p>
                </aside>
                <div className="flex-1">
                    {/* FullCalendar component */}
                    <FullCalendar
                        ref={calendarRef}
                        locale={"pl"}
                        themeSystem="standard"
                        aspectRatio={2.2}
                        nowIndicator={true}
                        editable={true}
                        droppable={true}
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            timeGridPlugin,
                            resourceTimeGridPlugin,
                            multiMonthPlugin,
                        ]}
                        slotLabelFormat={{
                            hour: "numeric",
                            minute: "2-digit",
                            omitZeroMinute: false,
                            meridiem: false,
                            hour12: false,
                        }}
                        firstDay={1}
                        displayEventTime={true}
                        initialView="dayGridMonth"
                        events={[
                            {
                                title: "event 1",
                                date: "2024-09-02",
                                time: "10:00",
                            },
                            {
                                title: "event 2",
                                date: "2024-09-16",
                                time: "17:00",
                            },
                            {
                                title: "event 3",
                                date: "2024-09-27",
                                time: "10:00",
                            },
                        ]}
                        customButtons={{
                            myCustomButton: {
                                // copy Open button from DropdownMenu
                                text: "Open",
                                click: () => {
                                    document
                                        .getElementById("radix-:r3:")
                                        ?.click();
                                },
                            },
                        }}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        headerToolbar={{
                            left: "today, prev, next, title",
                            right: "myCustomButton",
                        }}
                        views={{
                            yearGrid: {
                                type: "multiMonth",
                                duration: { months: 12 },
                                buttonText: "year",
                            },
                        }}
                    />
                </div>
            </div>

            {/* Dialog for events */}
            <div>
                <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{selectedEventTitle}</DialogTitle>
                            <DialogDescription>
                                Here are the details for the selected event.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {/* You can add additional content here as needed */}
                        </div>
                        <DialogFooter>
                            <Button onClick={closeDialog}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Dropdown Menu for changing calendar view */}
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Change View</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => changeView("timeGridDay")}
                        >
                            <span>Day View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => changeView("timeGridWeek")}
                        >
                            <span>Week View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => changeView("dayGridMonth")}
                        >
                            <span>Month View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => changeView("yearGrid")}
                        >
                            <span>Year View</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </AuthenticatedLayout>
    );
}
