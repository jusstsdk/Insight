import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ src }) => (
	<div className="video-responsive">
		<iframe
			width="853"
			height="480"
			src={src}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			title="Embedded youtube"
		/>
	</div>
);

YoutubeEmbed.propTypes = {
	src: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
