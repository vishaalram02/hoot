import { AppShell, Button, Header } from "@mantine/core";
import App from "../App";
import {TableSelection} from "../components/SelectTable";

export function Tasks(){

    return (
        <TableSelection data = {[{ avatar: "string", name: "string", email: "string", job: "string", id: "string" }]}></TableSelection>
    )
}