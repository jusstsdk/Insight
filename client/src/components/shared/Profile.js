import { Button, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChangePasswordPopOver from "./ChangePasswordPopOver";
import EditProfilePopover from "./EditProfilePopover";
import Login from "./Login";
import ProfilePopover from "./ProfilePopover";
import SelectCountryPopover from "./SelectCountryPopover";

export default function Profile() {
	const userType = useSelector((state) => state.userReducer.type);
	const navigate = useNavigate();

	if (userType == "Guest")
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
								<Button
									variant="Link"
									onClick={() => {
										navigate("/guest/signUp");
									}}
								>
									Sign Up
								</Button>
								<Button
									variant="Link"
									onClick={() => {
										navigate("/guest/forgotPassword");
									}}
								>
									Forgot password?
								</Button>
							</Popover.Body>
						</Popover>
					}
					rootClose
				>
					<Button>Profile</Button>
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
							<Popover.Header as="h3">{`Profile`}</Popover.Header>
							<Popover.Body>
								<SelectCountryPopover />
								<div className="d-flex mt-2">
									{userType === "Instructor" && <EditProfilePopover />}
									<ChangePasswordPopOver />
									<ProfilePopover />
								</div>
							</Popover.Body>
						</Popover>
					}
					rootClose
				>
					<Button>Profile</Button>
				</OverlayTrigger>
			</>
		);
}
