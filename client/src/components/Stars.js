import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
function Stars(props) {
	// TAKE AS INPUT ONE PROP: stars. Range of stars is 0 -> 5

	const halfStars = props.stars % 1;
	const fullStars = props.stars - halfStars;
	const emptyStars = 5 - (fullStars + halfStars * 2);

	const func = () => {
		let stars = [];
		for (let i = 0; i < fullStars; i++) {
			stars.push(<BsStarFill color={"#FFD700"} />);
		}
		if (halfStars) stars.push(<BsStarHalf color={"#FFD700"} />);
		for (let i = 0; i < emptyStars; i++) {
			stars.push(<BsStar color={"#FFD700"} />);
		}
		return stars;
	};

	return <div className="d-flex justify-content-end align-items-center">{func()}</div>;
}
export default Stars;
