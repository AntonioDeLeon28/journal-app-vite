import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {

    return async( dispatch, getState ) => { // "getState" es una función que ya existe del redux y que sirve para traer todo el estado actual del store 

        dispatch( savingNewNote() ); // Pone isSaving en true

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) ); // Además pone isSaving en false
        dispatch( setActiveNote( newNote ) );
        
    }

}

export const startLoadingNotes = () => {

    return async( dispatch, getState ) => { // "getState" es una función que ya existe del redux y que sirve para traer todo el estado actual del store 


        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );
        dispatch( setNotes(notes) );
        
    }

}

export const startSaveNote = () => {

    return async( dispatch, getState ) => {

        dispatch( setSaving() );
        
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await setDoc( docRef, noteToFireStore, { merge: true });

        // Se podria despachar esta acción trayendo la información del backend pero como igual tenemos la informacion en el frontend pues mejor actualizamos nuestro sideBar con los datos del frontend para nos hacer una petición
        dispatch( updateNote() ); // Se puede colocar un payload "note" (que se renombro asi pero es el "active" en si), pero da igual ya que hay un cambio en la nota y se actualizan los datos del "active", entonces desde el mismo documento del reducer puedo extraer los datos de la nota activa

    }

}

export const startUploadingFiles = ( files = [] ) => {

    return async( dispatch ) => {
        dispatch( setSaving() );

        // await fileUpload( files[0] );
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        console.log(photosUrls);

        dispatch( setPhotosToActiveNote(photosUrls) );

    }

}

export const startDeletingNote = () => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) );

    }

}
