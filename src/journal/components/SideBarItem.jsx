import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal";


export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {


    const dispatch = useDispatch();

    const noteDatas = {
        id,
        title,
        body,
        date,
        imageUrls, // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    }

    const handleClick = () => {
        dispatch( setActiveNote(noteDatas) );
    }

    return (
        <ListItem disablePadding onClick={ handleClick }>
            <ListItemButton >
                <ListItemIcon >
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={title} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
