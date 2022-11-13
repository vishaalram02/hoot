import { MantineProvider, Text, Button, Stack, AppShell, Header } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { useState } from "react";
import { useUser } from "./hooks/user";

export default function App() {
  const name = useUser(store => store.userName);
  const [data, setData] = useState([
    {name: "Andrew Huang", desc: "Print my essay", start: "Simmons Hall", end: "New Vassar", start_task: "pick my pset at printer", end_task: "drop off my essay at my dorm", start_loc: {lat: 42.3573, lng: -71.1009}, end_loc: {lat: 42.3590, lng: -71.0976}, claimedby: "Brian", id: "2", status : "unclaimed"},
    {name: "Daniel Hong", desc: "Get me a snack", start: "New Vassar", end: "New House", start_task: "pcik up snack", end_task: "drop off snack", start_loc: {lat: 42.3590, lng: -71.0976}, end_loc: {lat: 42.3551, lng: -71.1006}, claimedby: "Brian", id: "3", status : "claimed"},
    {name: "Andrew Huang", desc: "Submit my pset", start: "Hayden Library", end: "Maseeh Hall", start_task: "pick up my completed pset", end_task: "drop off my pset", start_loc: {lat: 42.3589, lng: -71.0895}, end_loc: {lat: 42.3578, lng: -71.0935}, claimedby: "Brian", id: "4", status : "unclaimed"},
  ]);
  return (
    <MantineProvider theme = {{colorScheme: "light"}} withGlobalStyles withNormalizeCSS>
    <Router>
      <Routes>
        <Route path="home" element={<Home/>} />
        <Route path="dashboard" element={<Dashboard links = {[{link: "tasks", label: "Tasks", links: []}, {link: "newtask", label: "Create Task", links: []}, {link: "route", label: "Route", links: []}, {link: "mytasks", label: "My Tasks", links: []}, {link: "username", label: name, links: [{link: "home", label: "Logout"}]}]} data = {data} setData = {setData}/>} />
      </Routes>;
    </Router>
    </MantineProvider>
  );
}
