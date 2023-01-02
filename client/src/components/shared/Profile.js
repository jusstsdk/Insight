import { Button, Col, NavLink, OverlayTrigger, Popover } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChangePasswordPopOver from "./ChangePasswordPopOver";
import EditProfilePopover from "./EditProfilePopover";
import Login from "./Login";
import ProfilePopover from "./ProfilePopover";
import SelectCountryPopover from "./SelectCountryPopover";
import { CgProfile } from "react-icons/cg";

export default function Profile() {
	const userType = useSelector((state) => state.userReducer.type);
	const user = useSelector((state) => state.userReducer.user);
	const navigate = useNavigate();

	if (userType === "Guest")
		return (
			<>
				<OverlayTrigger
					trigger="click"
					key="bottom"
					placement="bottom"
					overlay={
						<Popover id={`popover-positioned-bottom`}>
							<Popover.Header as="h3">{`Login to your profile`}</Popover.Header>
							<Popover.Body>
								<Login />
								<SelectCountryPopover />
								<Col className="d-flex justify-content-between">
									<Button
										className="fitWidth"
										variant="link"
										onClick={() => {
											navigate("/guest/signUp");
										}}>
										Sign Up
									</Button>
									<Button
										className="fitWidth"
										variant="link"
										onClick={() => {
											navigate("/guest/forgotPassword");
										}}>
										Forgot password?
									</Button>
								</Col>
							</Popover.Body>
						</Popover>
					}
					rootClose>
					<Button>
						<CgProfile size={30} />
					</Button>
				</OverlayTrigger>
			</>
		);
	else
		return (
			<>
				<OverlayTrigger
					trigger="click"
					key="bottom"
					placement="bottom"
					overlay={
						<Popover id={`popover-positioned-bottom`}>
							<Popover.Header as="h3">Hello, {user.username}</Popover.Header>
							<Popover.Body>
								{userType === "Trainee" && (
									<h6>
										Balance: {Math.trunc(user.wallet * user.exchangeRate * 100) / 100}{" "}
										{user.currency}
									</h6>
								)}
								{userType === "Instructor" && (
									<h6>
										Month's Pay:{" "}
										{(Math.trunc(user.monthlyPay.amount * user.exchangeRate * 100) / 100) * 0.1}{" "}
										{user.currency}
									</h6>
								)}

								<SelectCountryPopover />
								{userType === "Instructor" && (
									<div className="d-flex justify-content-start mt-2">
										<EditProfilePopover />
									</div>
								)}
								<Col className="d-flex mt-2 justify-content-between">
									<ChangePasswordPopOver />
									<ProfilePopover />
								</Col>
							</Popover.Body>
						</Popover>
					}
					rootClose>
					<NavLink id="profileButton" className="secondaryText linkDecor">
						Profile
					</NavLink>
				</OverlayTrigger>
			</>
		);
}
