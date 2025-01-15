import {
    createContext,
    useEffect,
    useState
    } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import app from "../firebase/firebase.config";

  // Create the Auth Context
export const AuthContext = createContext();
    const auth = getAuth(app);

    const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("User:", user);
    console.log("Loading:", loading);

    // Create new user with email and password
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user with email and password
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout the user
    const logOut = () => {
        setLoading(true);
        return signOut(auth).then(() => {
        setUser(null);
        setLoading(false);
        });
    };

    // Update the user's profile (e.g., displayName, photoURL)
    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData).then(() => {
        setUser({ ...auth.currentUser, ...updatedData });
        });
    };

    // Google sign-in method
    const googleSignIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
    .then((result) => {
    const loggedUser = result.user;
        setUser(loggedUser);
        setLoading(false);
        return loggedUser;
        })
        .catch((error) => {
        console.error("Google Sign-In Error:", error);
        setLoading(false);
        throw error;
        });
    };

    // Monitor the authenticated user state
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log("Auth state changed:", currentUser);
        setLoading(false);
    });

    return () => unsubscribe();
    }, []);

    // Provide the auth information to children
    const authInfo = {
    user,
    setUser,
    createNewUser,
    userLogin,
    googleSignIn,
    logOut,
    loading,
    updateUserProfile
    };

    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;