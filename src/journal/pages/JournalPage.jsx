// import { MailOutline } from "@mui/icons-material"
import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

export const JournalPage = () => {

  const dispatch = useDispatch();

  const { isSaving, active } = useSelector( state => state.journal );

  const onCLickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
      {/* <> */}
      {/* <Typography variant='h1'> JournalPage </Typography> Se le pone "variant" para se coloque el tema que MaterialUI le puso a "h1" */}
      {/* <Typography> JournalPage </Typography> Por defecto es un parrafo en el html */}
      {/* <Typography component='h1'> JournalPage </Typography> Sólo le dice al html que cambie el componente a h1 pero no modifica el estilo */}
      {/* <h1> JournalPage </h1> */}
      {/* <MailOutline /> Se puede colocar de esta manera un ícono */}
      {/* </> */}

      { active ? <NoteView /> : <NothingSelectedView /> } {/* También podemos convertir la propiedad active a booleano de la sig. manera: !!active */}

      <IconButton
        disabled= { isSaving }
        onClick={ onCLickNewNote }
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
