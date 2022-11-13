import { AppShell, Button, Center, createStyles, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/user";
import { IconLogin } from "@tabler/icons";
import { ClassNames } from "@emotion/react";

const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 80,
      fontWeight: 500,
      fontFamily: 'BlinkMacSystemFont',
      color: theme.colors.blue[6],
    },
  }));

export function Home(){
    const navigate = useNavigate();
    const setUserName = useUser(store => store.setUserName);
    const name = useUser(store => store.userName);
    const [submittedValues, setSubmittedValues] = useState('');
    const {classes} = useStyles();
    const form = useForm({
        initialValues: {
            username: '',
        },
        validate: {
          username: (value) => (value.length < 3 ? 'Username is not long enough' : null),  
        },
    });
    const handleClick = (values: {username: string}) => {
        setUserName(values.username);
        navigate('/dashboard');
    };
    return (
        <form onSubmit={form.onSubmit((values) => handleClick(values))}>
        <Stack mt = {100}>
        <Center>
        <Title className = {classes.title}>
            hoot
        </Title>
        </Center>
        <Center>
        <TextInput
            label = "Username"
            placeholder = "Alyssa P. Hacker"
            {...form.getInputProps('username')}
        />
        </Center>
        <Group position="center">
          <Button mt = "md" type="submit" rightIcon = {<IconLogin/>}>Login</Button>
        </Group>    
        </Stack>
      </form>
    )
}