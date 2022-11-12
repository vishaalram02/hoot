import { AppShell, Button, Header, Stack } from "@mantine/core";
import { HeaderSimple} from "../components/Header";
import { Tasks } from "./Tasks";
import { NewTask } from "./NewTask";
import { RouteInfo } from "./RouteInfo";
import { useState } from 'react';

// status can be unclaimed, claimed, or finished. Only unclaimed tasks are shown. When finished tasks are confirmed, delete.

export function Dashboard(){
    const [page, setPage] = useState("tasks");
    const [data, setData] = useState([{ avatar: "string", name: "string", desc: "string", locations: "string", id: "string", status : "unclaimed"}]);
    const claimTasks = (idList:string[]) => {
        setData(data.map((task) => {
            if(task.id in idList){
                task.status = "claimed";
            }
            return task;
        }));
    }
    const tasks = <Tasks onClick = {claimTasks} data = {data}></Tasks>;
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