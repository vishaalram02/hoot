import { AppShell, Button, Header } from "@mantine/core";
import App from "../App";
import { HeaderSimple} from "../components/Header";

export function RouteInfo(){
    return (
        <HeaderSimple links = {[{link: "dashboard", label: "Dashboard"}, {link: "newtask", label: "Create Task"}, {link: "route", label: "Route"}]}>
        </HeaderSimple>
    )
}