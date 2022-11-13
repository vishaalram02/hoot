import { AppShell, Button, createStyles, Header } from "@mantine/core";
import { useState } from "react";
import { Preview } from "../components/RoutePreview";
import {TableSelection, TableSelectionProps} from "../components/SelectTable";

const useStyles = createStyles((theme) => ({
    link: {
      display: 'block',
      width: 200,
      lineHeight: 1,
      lineWidth: 5,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      fontSize: theme.fontSizes.lg,
      fontWeight: 500,
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        cursor: "pointer",
      },
    },
  }));

interface MyTaskProps {
    data: { avatar: string; name: string; desc: string, locations: string, id: string, status : string}[];
}

export function MyTasks({data}: MyTaskProps){
    const selectTable = <TableSelection data = {data.filter((item) => (item.name === "Daniel Hong"))} selection = {[]} setSelection = {Function()}></TableSelection>;
    return (
        <div>
            {selectTable}
        </div>
    )
}