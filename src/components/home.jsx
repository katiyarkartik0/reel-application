import { auth, storage, firestore } from "../firebase";
import { authContext } from "../AuthProvider";
import { useEffect, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import "./home.css";
import VideoCard from "./VideoCard";

let Home = () => {
    let user = useContext(authContext);
    let [posts, setPosts] = useState([]);

    useEffect(()=>{
        let unsub = firestore.collection("posts").onSnapshot((querySnapshot)=>{
            let docArr = querySnapshot.docs
            let arr = [];
            for(let i = 0; i<docArr.length; i++){
                arr.push({
                    id:docArr[i].id,
                    ...docArr[i].data(),
                });
            }

            setPosts(arr);

        })

        return ()=>{
            unsub();
        }
    })

    return <>

        {(user) ? "" : <Redirect to="/login" />}
        <div className="video-container">
            {
                posts.map((el)=>{
                    return <VideoCard key = {el.id} data={el}/>;
                })
            }
        </div>
        <button
            onClick={() => {
                auth.signOut();
            }}
            className="home-logout-btn">Logout
        </button>
        <input type="file"
            onClick={(e) => {
                e.currentTarget.value = null;
            }}
            onChange={(e) => {
                let videoObj = (e.currentTarget.files[0]);
                let { name, size, type } = videoObj;
                size = size / 1000000;
                if (size > 10) {
                    alert("file size exceeds 10 mb");
                    return;
                }

                type = type.split("/")[0];
                console.log(type);
                if (type !== "video") {
                    alert("Please upload a video file");
                    return;
                }

                let uploadTask = storage.ref(`/posts/${user.uid}/${Date.now() + name}`).put(videoObj);

                uploadTask.on("state_changed", null, null, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                        console.log(url);

                        firestore
                            .collection("posts")
                            .add({ name: user.displayName, url, likes: [], comments: [] })
                    });
                });
            }}
        />
    </>
}

export default Home;