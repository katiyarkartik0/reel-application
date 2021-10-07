import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "./firebase";

export const authContext = createContext();

let AuthProvider = (props) =>{
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(()=>{
        let unsub = auth.onAuthStateChanged(async (user)=>{
            if(user){
                let { displayName, email, uid, photoURL } = user;
                setUser({displayName, email, uid, photoURL});

                let docref = firestore.collection("users").doc(uid);
                let documentSnapshot = await docref.get();
                if(!documentSnapshot.exists){
                    docref.set({
                        displayName,
                        email,
                        photoURL
                    })
                }


            }
            else{
                setUser(null);
            }

            setLoading(false);
        });
//this needs to be called when unmount
        return () =>{
            unsub();
        };
    }, []);
//this is conditional rendering i.e., if loading is false then pass 
// the value = {user} to props.children 
    return <authContext.Provider value={user}>
    {!loading && props.children} 
    </authContext.Provider>
}

export default AuthProvider;
