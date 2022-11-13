import { AppShell, Button, Header, Stack } from "@mantine/core";
import { HeaderSimple} from "../components/Header";
import { Tasks } from "./Tasks";
import { NewTask } from "./NewTask";
import { RouteInfo } from "./RouteInfo";
import { useState } from 'react';
import { MyTasks } from "./MyTasks";

// status can be unclaimed, claimed, or finished. Only unclaimed tasks are shown. When finished tasks are confirmed, delete.

export function Dashboard(){
    const [page, setPage] = useState("tasks");
    const [data, setData] = useState([
        { avatar: "string", name: "Andrew Huang", desc: "food", locations: "simmon", id: "2", status : "unclaimed"},
        { avatar: "string", name: "Daniel Hong", desc: "snak", locations: "nv", id: "3", status : "claimed"},
        { avatar: "string", name: "Andrew Huang", desc: "asdf", locations: "bofdsafds", id: "4", status : "unclaimed"},
    ]);
    const [selection, setSelection] = useState(['1']);

    console.log(data);
    const claimTasks = () => {
        setData(data.map((task) => {
            if(selection.filter((item) => (item === task.id)).length > 0){
                task.status = "claimed";
            }
            return task;
        }));
    }
    const tasks = <Tasks claimTasks = {claimTasks} data = {data} selection = {selection} setSelection = {setSelection}></Tasks>;
    const newtask = <NewTask></NewTask>;
    const routeinfo = <RouteInfo></RouteInfo>;
    const mytasks = <MyTasks data = {data}></MyTasks>;
    const display = {"tasks": tasks, "newtask": newtask, "route": routeinfo, "mytasks": mytasks}[page];
    return (
        <Stack align="center" mt={50}>
            <HeaderSimple links = {[{link: "tasks", label: "Tasks"}, {link: "newtask", label: "Create Task"}, {link: "route", label: "Route"}, {link: "mytasks", label: "My Tasks"}] } setFunc ={setPage} >
            </HeaderSimple>
            {display}
        </Stack>
    )
}