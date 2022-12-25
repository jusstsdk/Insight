import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

const YoutubeEmbed = ({ src }) => (
	<Card className="video-responsive">
		<iframe
			width="853"
			height="480"
			src={src}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			title="Embedded youtube"
		/>
	</Card>
);

YoutubeEmbed.propTypes = {
	src: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
