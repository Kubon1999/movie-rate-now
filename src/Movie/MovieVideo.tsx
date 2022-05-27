import { useState } from "react";

const MovieVideo = (props: { videoUrl: string }) => {
  const [showVideo, setShowVideo] = useState(false); //now ts knows showVideo should be a boolean

  if (showVideo && props.videoUrl) {
    //if you should show video and there exists an trailer
    //then show video
    return (
      <div className="modal-card-item">
        <iframe
          src={`https://www.youtube.com/embed/${props.videoUrl}`}
          height="100%"
          width="100%"
          frameBorder="0"
          allow="autoplay"
          title="video-player"
        ></iframe>
      </div>
    );
  } else if (!props.videoUrl) {
    //the trailer does not exist
    //then dont show any option
    return null;
  } else {
    return (
      <i
        className="fa fa-play-circle"
        aria-hidden="true"
        onClick={() => setShowVideo(true)}
      ></i>
    );
  }
};

export default MovieVideo;
