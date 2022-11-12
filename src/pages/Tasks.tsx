import { AppShell, Button, Header } from "@mantine/core";
import {TableSelection, TableSelectionProps} from "../components/SelectTable";
import { useState } from 'react';

interface TaskProps {
    onClick: Function;
    data: { avatar: string; name: string; desc: string, locations: string, id: string, status : string}[];
}

export function Tasks({onClick, data}: TaskProps){
    return (
        <TableSelection data = {data}></TableSelection>
    )
}