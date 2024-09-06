import { Head } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";

import { Label } from "@/Components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Dashboard({ auth }: PageProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEventTitle, setSelectedEventTitle] = useState("");
    const calendarRef = useRef<FullCalendar>(null);
    const miniCalendarRef = useRef<FullCalendar>(null);
    const [currentView, setCurrentView] = useState("dayGridMonth");
    const [calendarTitle, setCalendarTitle] = useState("");
    const [miniCalendarTitle, setMiniCalendarTitle] = useState<
        string | undefined
    >(undefined);

    const viewNamesMap: Record<string, string> = {
        dayGridMonth: "Month",
        timeGridDay: "Day",
        timeGridWeek: "Week",
        yearGrid: "Year",
    };

    const handleDateClick = (info: any) => {
        if (info.view.type === "yearGrid") {
            calendarRef.current?.getApi().changeView("timeGridDay");
            calendarRef.current?.getApi().gotoDate(info.dateStr);
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
            setCurrentView(view); // Update the state with the new view
        }
    };

    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        const miniCalendarApi = miniCalendarRef.current?.getApi();
        if (calendarApi) {
            setCurrentView(calendarApi.view.type);
            setCalendarTitle(calendarApi.view.title);
        }
        if (miniCalendarApi) {
            setMiniCalendarTitle(miniCalendarApi.view.title);
        }
    }, []);

    // event listener for keydown shortcuts to change calendar view
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.code) {
                case "KeyD":
                    changeView("timeGridDay");
                    break;
                case "KeyM":
                    changeView("dayGridMonth");
                    break;
                case "KeyW":
                    changeView("timeGridWeek");
                    break;
                case "KeyY":
                    changeView("yearGrid");
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handlePrevNavigation = () => {
        const calendarApi = calendarRef.current?.getApi();
        const miniCalendarApi = miniCalendarRef.current?.getApi();
        if (calendarApi) {
            switch (currentView) {
                case "timeGridDay":
                    calendarApi.prev();
                    break;
                case "timeGridWeek":
                    calendarApi.prev();
                    break;
                case "dayGridMonth":
                    calendarApi.prev();
                    break;
                case "yearGrid":
                    calendarApi.incrementDate({ years: -1 }); // Navigate by one year
                    break;
                default:
                    break;
            }
            setCurrentView(calendarApi.view.type);
            setCalendarTitle(calendarApi.view.title);
            setMiniCalendarTitle(calendarApi?.view.title);
        }
        if (miniCalendarApi) {
            miniCalendarApi.prev();
        }
    };

    const handleNextNavigation = () => {
        const calendarApi = calendarRef.current?.getApi();
        const miniCalendarApi = miniCalendarRef.current?.getApi();
        if (calendarApi) {
            switch (currentView) {
                case "timeGridDay":
                    calendarApi.next();
                    break;
                case "timeGridWeek":
                    calendarApi.next();
                    break;
                case "dayGridMonth":
                    calendarApi.next();
                    break;
                case "yearGrid":
                    calendarApi.incrementDate({ years: 1 }); // Navigate by one year
                    break;
                default:
                    break;
            }
            setCurrentView(calendarApi.view.type);
            setCalendarTitle(calendarApi.view.title);
            setMiniCalendarTitle(calendarApi?.view.title);
        }
        if (miniCalendarApi) {
            miniCalendarApi.next();
        }
    };

    const handleCurrentDate = () => {
        const calendarApi = calendarRef.current?.getApi();
        const miniCalendarApi = miniCalendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.today(); // Navigate to today
            setCurrentView(calendarApi.view.type);
            setCalendarTitle(calendarApi.view.title);
        }
        if (miniCalendarApi) {
            miniCalendarApi.today();
            setMiniCalendarTitle(miniCalendarApi.view.title);
        }
    };

    const handleMiniCalendarNextNavigation = () => {
        const miniCalendarApi = miniCalendarRef.current?.getApi();
        if (miniCalendarApi) {
            miniCalendarApi.next();
            setMiniCalendarTitle(miniCalendarApi.view.title);
        }
    };

    const handleMiniCalendarPrevNavigation = () => {
        const miniCalendarApi = miniCalendarRef.current?.getApi();
        if (miniCalendarApi) {
            miniCalendarApi.prev();
            setMiniCalendarTitle(miniCalendarApi.view.title);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="flex flex-wrap h-full">
                <header className="w-full flex items-center justify-between px-4 py-2 border-b border-gray-200">
                    <div className="gap-2 flex items-center justify-between">
                        <Button
                            onClick={() => {
                                document
                                    .querySelector("aside")
                                    ?.classList.toggle("max-w-64");
                                document
                                    .querySelector("aside")
                                    ?.classList.toggle("max-w-4");
                            }}
                            className="bg-transparent shadow-none rounded-full hover:bg-slate-100 w-12 h-12 p-2"
                        >
                            <HamburgerMenuIcon className="w-5 h-5 text-gray-600" />
                        </Button>
                        <div className="flex items-center gap-4 pr-8">
                            <ApplicationLogo className="h-8" />
                            <h2 className="text-lg font-semibold text-gray-800 leading-tight">
                                Calendar
                            </h2>
                        </div>
                        <Button variant="outline" onClick={handleCurrentDate}>
                            Today
                        </Button>
                        <div className="flex items-center">
                            <span
                                onClick={handlePrevNavigation}
                                className="hover:bg-slate-100 hover:cursor-pointer rounded-full p-2"
                            >
                                <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
                            </span>
                            <span
                                onClick={handleNextNavigation}
                                className="hover:bg-slate-100 hover:cursor-pointer rounded-full p-2"
                            >
                                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                            </span>
                        </div>
                        <div>
                            <span
                                className={`text-gray-700 text-xl leading-6 font-normal ${
                                    currentView === "dayGridMonth"
                                        ? "capitalize"
                                        : ""
                                }`}
                            >
                                {calendarTitle}
                            </span>
                        </div>
                    </div>
                    <div className=" flex items-center justify-between gap-4 relative">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <span className="flex items-center">
                                        {viewNamesMap[currentView]}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="w-2 h-2 ml-2 text-gray-700"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 py-2 px-0">
                                <DropdownMenuItem
                                    className="flex items-center justify-between"
                                    onClick={() => {
                                        changeView("timeGridDay");
                                    }}
                                >
                                    <span>Day</span>
                                    <span className="text-gray-500">D</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center justify-between"
                                    onClick={() => changeView("timeGridWeek")}
                                >
                                    <span>Week</span>
                                    <span className="text-gray-500">W</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center justify-between"
                                    onClick={() => changeView("dayGridMonth")}
                                >
                                    <span>Month</span>
                                    <span className="text-gray-500">M</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center justify-between"
                                    onClick={() => changeView("yearGrid")}
                                >
                                    <span>Year</span>
                                    <span className="text-gray-500">Y</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="w-[40px] h-[40px] absolute top-0 right-0 cursor-pointer">
                                <svg
                                    focusable="false"
                                    height="40px"
                                    version="1.1"
                                    viewBox="0 0 40 40"
                                    width="40px"
                                    xmlSpace="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <path
                                        d="M4.02,28.27C2.73,25.8,2,22.98,2,20c0-2.87,0.68-5.59,1.88-8l-1.72-1.04C0.78,13.67,0,16.75,0,20c0,3.31,0.8,6.43,2.23,9.18L4.02,28.27z"
                                        fill="#F6AD01"
                                    ></path>
                                    <path
                                        d="M32.15,33.27C28.95,36.21,24.68,38,20,38c-6.95,0-12.98-3.95-15.99-9.73l-1.79,0.91C5.55,35.61,12.26,40,20,40c5.2,0,9.93-1.98,13.48-5.23L32.15,33.27z"
                                        fill="#249A41"
                                    ></path>
                                    <path
                                        d="M33.49,34.77C37.49,31.12,40,25.85,40,20c0-5.86-2.52-11.13-6.54-14.79l-1.37,1.46C35.72,9.97,38,14.72,38,20c0,5.25-2.26,9.98-5.85,13.27L33.49,34.77z"
                                        fill="#3174F1"
                                    ></path>
                                    <path
                                        d="M20,2c4.65,0,8.89,1.77,12.09,4.67l1.37-1.46C29.91,1.97,25.19,0,20,0l0,0C12.21,0,5.46,4.46,2.16,10.96L3.88,12C6.83,6.08,12.95,2,20,2"
                                        fill="#E92D18"
                                    ></path>
                                </svg>
                            </div>
                            <div className="">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="flex h-full items-center justify-center ">
                                            <button
                                                type="button"
                                                className="flex items-center justify-center relative w-[32px] h-[32px] top-0.5 right-1 border border-transparent text-base leading-4 font-medium  rounded-full  text-white bg-blue-900 transition ease-in-out duration-150"
                                            >
                                                {auth.user.name[0]}
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="flex-1 flex">
                    <aside className="h-full border-r p-4 mini-calendar max-w-64">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className="flex items-center h-auto shadow-sm shadow-slate-400 rounded-full"
                                    variant="outline"
                                >
                                    <svg
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                        className="mr-3"
                                    >
                                        <path
                                            fill="#34A853"
                                            d="M16 16v14h4V20z"
                                        ></path>
                                        <path
                                            fill="#4285F4"
                                            d="M30 16H20l-4 4h14z"
                                        ></path>
                                        <path
                                            fill="#FBBC05"
                                            d="M6 16v4h10l4-4z"
                                        ></path>
                                        <path
                                            fill="#EA4335"
                                            d="M20 16V6h-4v14z"
                                        ></path>
                                        <path
                                            fill="none"
                                            d="M0 0h36v36H0z"
                                        ></path>
                                    </svg>
                                    <span className="">Create</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="w-2.5 h-2.5 ml-4 text-gray-500"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">
                                            Dimensions
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Set the dimensions for the layer.
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="width">Width</Label>
                                            <Input
                                                id="width"
                                                defaultValue="100%"
                                                className="col-span-2 h-8"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="maxWidth">
                                                Max. width
                                            </Label>
                                            <Input
                                                id="maxWidth"
                                                defaultValue="300px"
                                                className="col-span-2 h-8"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="height">
                                                Height
                                            </Label>
                                            <Input
                                                id="height"
                                                defaultValue="25px"
                                                className="col-span-2 h-8"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="maxHeight">
                                                Max. height
                                            </Label>
                                            <Input
                                                id="maxHeight"
                                                defaultValue="none"
                                                className="col-span-2 h-8"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className="">
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-gray-700 text-md leading-6 font-medium capitalize ml-2">
                                    {miniCalendarTitle}
                                </span>
                                <div className="flex items-center">
                                    <span
                                        onClick={
                                            handleMiniCalendarPrevNavigation
                                        }
                                        className="hover:bg-slate-100 hover:cursor-pointer rounded-full p-2"
                                    >
                                        <ChevronLeftIcon className="w-4 h-4 text-gray-500" />
                                    </span>
                                    <span
                                        onClick={
                                            handleMiniCalendarNextNavigation
                                        }
                                        className="hover:bg-slate-100 hover:cursor-pointer rounded-full p-2"
                                    >
                                        <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 ">
                                <FullCalendar
                                    ref={miniCalendarRef}
                                    locale={"en"}
                                    plugins={[dayGridPlugin]}
                                    initialView="dayGridMonth"
                                    fixedWeekCount={false}
                                    height="auto"
                                    selectable={true}
                                    droppable={true}
                                    selectMirror={true}
                                    firstDay={1}
                                    dayHeaderFormat={{
                                        weekday: "narrow",
                                    }}
                                    headerToolbar={false}
                                />
                            </div>
                        </div>
                    </aside>
                    <div className="flex-1">
                        <FullCalendar
                            ref={calendarRef}
                            selectMirror={true}
                            moreLinkClick="popover"
                            locale={"en"}
                            themeSystem="standard"
                            aspectRatio={1.92}
                            selectable={true}
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
                            multiMonthTitleFormat={{ month: "long" }}
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
                                    text: "Open",
                                    click: () => {
                                        setTimeout(() => {
                                            document
                                                .getElementById("radix-:r3:")
                                                ?.click();
                                        }, 10);
                                    },
                                },
                            }}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                            headerToolbar={{
                                left: "",
                                right: "",
                            }}
                            views={{
                                yearGrid: {
                                    type: "multiMonth",
                                    duration: { months: 12 },
                                    buttonText: "year",
                                },
                            }}
                            datesSet={(dateInfo) => {
                                setCurrentView(dateInfo.view.type); // Update current view on view change
                            }}
                        />
                    </div>
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
        </AuthenticatedLayout>
    );
}
