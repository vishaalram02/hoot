import { AppShell, Button, createStyles, Header } from "@mantine/core";
import { defaultShouldCreate } from "@mantine/core/lib/Select/Select";
import { useState , useEffect} from "react";
import { Preview } from "../components/RoutePreview";
import {TableSelection, Task} from "../components/SelectTable";

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

interface TaskProps {
    claimTasks: Function;
    selection: string[];
    setSelection: Function;
    data: Task[];
    addTask: Function;
}

export function Tasks({claimTasks, data, selection, setSelection}: TaskProps){
    const { classes, cx } = useStyles();
    const [popUp, setPopUp] = useState(false);
    const selectTable = <TableSelection data = {data.filter((item) => (item.status === "unclaimed")) } selection = {selection} setSelection = {setSelection}></TableSelection>;
    const preview = popUp ? <Preview claimTasks = {claimTasks} data = {data.filter((item) => (selection.filter((id) => (item.id === id)).length > 0))} setPopUp = {setPopUp}></Preview> : <></>;
    useEffect(() => {
        setPopUp(false);
    }, [selection, data]);
    return (
        <div>
            {preview}
            <a
            className={cx(classes.link)}
            onClick={(event) => {
                if(selection.length > 0) setPopUp(true);
            }}
            >
            Preview Route
            </a>
            {selectTable}
        </div>
    )
}