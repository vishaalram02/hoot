import {Center, createStyles, Stack} from "@mantine/core";
import { RouteRender } from "./RouteRender";
import { Task } from "./SelectTable";
import { usePath } from "../hooks/path";

const useStyles = createStyles((theme) => ({
    block: {
        height: 300,
        outlineWidth: 'medium',
        outlineColor: 'white',
    },
    link: {
      display: 'block',
      width: 200,
      lineHeight: 1,
      lineWidth: 5,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        cursor: "pointer",
      },
    },
  }));

interface PreviewProps {
    claimTasks: Function;
    data: Task[];
    setPopUp: Function;
    setDirData: Function;
}

export function Preview({ claimTasks, data, setPopUp, setDirData}: PreviewProps){
    const clear = usePath((store) => store.clear);
    const { classes, cx } = useStyles();
    return (
        <Stack align = "center" className={cx(classes.block)}>
            <RouteRender preview={true} containerStyle = {{width: '100%', height: '400px'}} setDirData = {setDirData} origin = {{lat: 42.35977,lng: -71.09491}}  data = {data}></RouteRender>
            <a
            className={cx(classes.link)}
            onClick={(event) => {
                clear();
                claimTasks();
            }}
            >
            Claim Tasks
            </a>
            <a
            className={cx(classes.link)}
            onClick={(event) => {
                setPopUp(false);
            }}
            >
            Close Preview
            </a>
        </Stack>
    )
}