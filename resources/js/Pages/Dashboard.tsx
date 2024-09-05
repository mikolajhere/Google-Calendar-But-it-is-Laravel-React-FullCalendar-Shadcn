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
import { useState } from "react";

export default function Dashboard({ auth }: PageProps) {
    // State to control dialog visibility and event title
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEventTitle, setSelectedEventTitle] = useState("");

    const handleDateClick = (info: any) => {
        setSelectedEventTitle(info.dateStr); // Set the event title
        setIsDialogOpen(true); // Open the dialog
    };

    const handleEventClick = (info: any) => {
        setSelectedEventTitle(info.event.title); // Set the event title
        setIsDialogOpen(true); // Open the dialog
    };

    const closeDialog = () => {
        setIsDialogOpen(false); // Close the dialog
        setSelectedEventTitle(""); // Clear the selected title
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
                    <FullCalendar
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
                        initialView="dayGridMonth"
                        events={[
                            { title: "event 1", date: "2024-09-02" },
                            { title: "event 2", date: "2024-09-16" },
                            { title: "event 3", date: "2024-09-27" },
                        ]}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        headerToolbar={{
                            left: "today, prev, next, title",
                            right: "timeGridDay,timeGridWeek,dayGridMonth,yearGrid",
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
        </AuthenticatedLayout>
    );
}
