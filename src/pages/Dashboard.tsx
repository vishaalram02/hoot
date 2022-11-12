import { AppShell, Button, Header, Stack } from "@mantine/core";
import App from "../App";
import { HeaderSimple} from "../components/Header";
import { Tasks } from "./Tasks";
import { NewTask } from "./NewTask";
import { RouteInfo } from "./RouteInfo";
import { SetStateAction, useState } from 'react';

export function Dashboard(){
    const [page, setPage] = useState("tasks");
    const tasks = <Tasks></Tasks>;
    const newtask = <NewTask></NewTask>;
    const routeinfo = <RouteInfo></RouteInfo>;
    const display = {"tasks": tasks, "newtask": newtask, "route": routeinfo}[page];
    return (
        <Stack align="center" mt={50}>
            <HeaderSimple links = {[{link: "tasks", label: "Tasks"}, {link: "newtask", label: "Create Task"}, {link: "route", label: "Route"}] } setFunc ={setPage} >
            </HeaderSimple>
            {display}
        </Stack>
    )
}