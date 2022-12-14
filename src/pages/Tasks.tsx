import { AppShell, Button, createStyles, Header } from "@mantine/core";
import { defaultShouldCreate } from "@mantine/core/lib/Select/Select";
import { useState , useEffect} from "react";
import { Preview } from "../components/RoutePreview";
import { useUser } from "../hooks/user";
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
    setDirData: Function;
    setPage: Function;
}

export function Tasks({ setPage, claimTasks, data, selection, setSelection, setDirData}: TaskProps){
    const name = useUser(store => store.userName);
    const { classes, cx } = useStyles();
    const [popUp, setPopUp] = useState(false);
    const selectTable = <TableSelection data = {data.filter((item) => (item.status === "unclaimed")) } selection = {selection} setSelection = {popUp ? Function() : setSelection}></TableSelection>;
    const preview = () => {
            return popUp ? (
                <Preview 
                setPage = {setPage} 
                setDirData = {setDirData} 
                claimTasks = {claimTasks} 
                data = {data.filter((item) => (selection.filter((id) => (item.id === id)).length > 0) || (item.status == "claimed" && item.claimedby == name))} 
                setSelection = {setSelection} setPopUp = {setPopUp}></Preview>) : (<></>);
        };
    useEffect(() => {
        setPopUp(false);
    }, [selection, data]);
    return (
        <div>
            {preview()}
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