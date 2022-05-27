import { useState } from "react";

const MovieVideo = (props: { videoUrl: string }) => {
  const [showVideo, setShowVideo] = useState(false); //now ts knows showVideo should be a boolean

  return showVideo ? (
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
  ) : (
    <i
      className="fa fa-play-circle"
      aria-hidden="true"
      onClick={() => setShowVideo(true)}
    ></i>
  );
};

export default MovieVideo;
