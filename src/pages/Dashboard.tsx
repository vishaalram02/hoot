import { createStyles, Container, Group, Stack, Header, Menu, Center, Burger } from "@mantine/core";
import { Tasks } from "./Tasks";
import { NewTask } from "./NewTask";
import { RouteInfo } from "./RouteInfo";
import { useState } from 'react';
import { MyTasks } from "./MyTasks";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/user";
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';

import { Task } from "../components/SelectTable";
const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        borderBottom: 0,
    },

    inner: {
        height: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    '&:hover': {
      backgroundColor: theme.colors.blue[5],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderSearchProps {
    links: { link: string; label: string; links: { link: string; label: string }[] }[];
    data: Task[];
    setData: Function;
}

export function Dashboard({ links, data, setData }: HeaderSearchProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();
    const [page, setPage] = useState("tasks");
    const [selection, setSelection] = useState([]);
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
    const navigate = useNavigate();
    const name = useUser(store => store.userName);
    const display = {"tasks": tasks, "newtask": newtask, "route": routeinfo, "mytasks": mytasks}[page];
    const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item onClick={() => handleSubClick(item.link)} key={item.link}>{item.label}</Menu.Item>
    ));
    const handleClick = (link: string) => {
        if (link==='username'){
            return;
        }
        else {
            setPage(link);
        }
    };
    const handleSubClick = (link: string) => {
        if (link==='home'){
            navigate("/home");
        }
        else {
            setPage(link);
        }
    };
    if (menuItems.length > 0) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              className={classes.link}
              onClick={(event) => handleClick(link.link)}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }
        return (
        <a
            key={link.label}
            className={classes.link}
            onClick={(event) => handleClick(link.link)}
        >
            {link.label}
        </a>
        );
    });

    return (
        <Stack>
        <Header height={40} className = {classes.header}>
        <Container className={classes.inner} fluid>
            <Group>

            </Group>
            <Group spacing={5} className={classes.links} mr = {110}>
                {items}
            </Group>
            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        </Container>
        </Header>
        <Group position = "center">
            {display}
        </Group>
        </Stack>
    );
}