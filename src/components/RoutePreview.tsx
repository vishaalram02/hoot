import {createStyles} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    block: {
        display: 'block',
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
    data: { avatar: string; name: string; desc: string, start: string, end: string, id: string, status : string}[];
    setPopUp: Function;
}

export function Preview({claimTasks, data, setPopUp}: PreviewProps){
    const { classes, cx } = useStyles();
    return (
        <div className={cx(classes.block)}>
            Hi this is a preview
            <a
            className={cx(classes.link)}
            onClick={(event) => {
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
        </div>
    )
}