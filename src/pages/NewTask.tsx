import { AppShell, Button, Center, Header, createStyles, TextInput } from "@mantine/core";
import App from "../App";
import { ContainedInputs } from "../components/InputBox";
const useStyles = createStyles((theme) => ({
    root: {
      position: 'relative',
    },
  
    input: {
      height: 'auto',
      width: 500, 
      paddingTop: 18,
    },
  
    label: {
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: theme.fontSizes.xs,
      paddingLeft: theme.spacing.sm,
      paddingTop: theme.spacing.sm / 2,
      zIndex: 1,
    },
  }));
export function NewTask(){
    const { classes } = useStyles();
    return (
        <div>
            <TextInput label = "Start location" placeholder = "Maseeh Hall" classNames = {classes}></TextInput>
            <TextInput label = "Task at start location" placeholder = "Pick up homework" classNames = {classes}></TextInput>
            <TextInput label = "End location" placeholder = "Next House" classNames = {classes}></TextInput>
            <TextInput label = "Task at end location" placeholder = "Drop off homework" classNames = {classes}></TextInput>
            <Center>
            <Button mt = "md">Submit</Button>
            </Center>
        </div>
    );
}