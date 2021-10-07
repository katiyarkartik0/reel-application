import { useState } from "react";
import "./VideoCard.css";


let VideoCard = (props) => {
    let [playing, setPlaying] = useState(false);
    let [commentBoxOpen, setCommentBoxOpen] = useState(false);
    console.log(props);
    
    return (
        <div className="video-card">
            <p className="video-card-username">{props.data.name}</p>
            <span className="video-card-music">
                <span class="material-icons-outlined ">
                    audiotrack
                </span>
                <marquee> some song </marquee>
            </span>
            <span onClick={(e)=>{
                if(commentBoxOpen){
                    setCommentBoxOpen(false);
                }
                else{
                    setCommentBoxOpen(true);
                }
            }}
            class="material-icons-outlined video-card-comment">
                chat
            </span>
            <span class="material-icons-outlined video-card-like">
                favorite_border
            </span>
            {(commentBoxOpen)?(<div className="video-card-comment-box">
                <div className="actual-comments">
                    <div className="post-user-comment">
                        <img></img>
                        <div>
                            <h5>{props.data.name}</h5>
                            <p>comment number one</p>
                        </div>
                    </div>
                </div>
                <div className="comment-form">
                    <input type = "text"/>
                    <button>Post</button>
                </div>
            </div>):("")}
            <video
                onClick={(e) => {
                    if (playing) {
                        e.currentTarget.pause();
                        setPlaying(false);
                    }
                    else {
                        e.currentTarget.play();
                        setPlaying(true);
                    }
                }}
                loop
                src={props.data.url}
                className="video-card-video">

            </video>
        </div>
    )
}

export default VideoCard;