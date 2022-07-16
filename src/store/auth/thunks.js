import { signInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./";

export const chekingAuthentication = () => {

    return async (dispatch) => {

        dispatch(checkingCredentials()); // Solo pone el status en "checking"

    }

}

export const startGoogleSignIn = () => {

    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        if (!result.ok) { return dispatch(logout(result.errorMessage)) };
        dispatch(login(result));

    }

}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async (dispatch) => {

        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
        if (ok === false) return dispatch(logout({ errorMessage }));
        dispatch(login({ uid, displayName, email, photoURL }));

    }

}

export const startLoginWithEmailPassword = ({ email, password }) => {

    return async (dispatch) => { // Llamar acción del provider

        dispatch(checkingCredentials()); // Solo pone el status en "checking"

        const { ok, displayName, photoURL, uid, errorMessage } = await loginWithEmailPassword({ email, password });
        if (!ok) return dispatch(logout({ errorMessage }));
        dispatch(login({ displayName, email, photoURL, uid }));

    }

}

export const startLogout = () => {

    return async( dispatch ) => {

        await logoutFirebase();

        dispatch( logout() ); // Dispatch al authSlice

        dispatch( clearNotesLogout() ); // Dispatch al journalSlice

    }

}

