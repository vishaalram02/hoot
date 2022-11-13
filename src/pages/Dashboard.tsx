import { AppShell, Button, Group, Header, Stack } from "@mantine/core";
import { HeaderSimple} from "../components/Header";
import { Tasks } from "./Tasks";
import { NewTask } from "./NewTask";
import { RouteInfo } from "./RouteInfo";
import { useState } from 'react';
import { MyTasks } from "./MyTasks";
import { IconLogout } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { Task } from "../components/SelectTable";

interface DashboardProps {
    data: Task[];
    setData: Function;
}

// status can be unclaimed, claimed, or finished. Only unclaimed tasks are shown. When finished tasks are confirmed, delete.
export function Dashboard({data, setData}:DashboardProps){
    const [page, setPage] = useState("tasks");
    const [selection, setSelection] = useState([]);
    const [inProgress, setProgress] = useState(false);

    console.log(data);
    const claimTasks = () => {
        setData(data.map((task) => {
            if(selection.filter((item) => (item === task.id)).length > 0){
                task.status = "claimed";
            }
            return task;
        }));
    }
    const addTask = (task: {name: string; desc: string, start: string, end: string, start_task: string, end_task: string, start_loc: google.maps.LatLngLiteral, end_loc: google.maps.LatLngLiteral, id: string, status : string, claimedby: string}) => {
        data.push(task);
    }
    const tasks = <Tasks claimTasks = {claimTasks} data = {data} selection = {selection} setSelection = {setSelection} addTask = {addTask} ></Tasks>;
    const newtask = <NewTask claimTasks = {claimTasks} addTask = {addTask}></NewTask>;
    const routeinfo = <RouteInfo></RouteInfo>;
    const mytasks = <MyTasks data = {data}></MyTasks>;
    const display = {"tasks": tasks, "newtask": newtask, "route": routeinfo, "mytasks": mytasks}[page];
    const navigate = useNavigate();
    return (
        <Stack>
            <Group position = "right" mr = {50}>
            <Button type="submit" leftIcon = {<IconLogout/>} onClick = {(event: any) => {navigate('/home');}}>Logout</Button>
            </Group>
            <Stack align = "center" mt = {50}>
            <HeaderSimple links = {[{link: "tasks", label: "Tasks"}, {link: "newtask", label: "Create Task"}, {link: "route", label: "Route"}, {link: "mytasks", label: "My Tasks"}] } setFunc ={setPage} >
            </HeaderSimple>
            {display}
            </Stack>
        </Stack>
    )
}