import { AppShell, Button, Center, Group, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/user";
import { IconLogin } from "@tabler/icons";

export function Home(){
    const navigate = useNavigate();
    const setUserName = useUser(store => store.setUserName);
    const name = useUser(store => store.userName);
    const [submittedValues, setSubmittedValues] = useState('');
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
        <Center>
        <TextInput
            label = "Username"
            placeholder = "Alyssa P. Hacker"
            {...form.getInputProps('username')}
        />
        </Center>
        <Group position="center" mt="md">
          <Button mt = "md" type="submit" rightIcon = {<IconLogin/>}>Login</Button>
        </Group>
      </form>
    )
}