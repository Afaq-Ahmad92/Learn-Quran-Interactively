import React from "react";
import "../Styling_Sheets/LoadingPage.css";
import img2 from "../assets/image/logo2.jpg";

const LoadingPage = (props) => {
	return (
		<div className="loader-container">
			<img className="loading_img" src={img2} alt="" />

			<div class="animated-title">
				<div class="text-top">
					<div>
						<span
							style={{
								width: "100%",
								marginLeft: "45%",
								fontSize: "1.6rem",
								paddingBottom: "1.4%",
							}}
						>
							{props.firstHeading}
						</span>
						<span
							style={{
								fontWeight: 900,
								width: "100%",
								marginLeft: "30%",
								textAlign: "center",
							}}
						>
							{props.secondHeading}
						</span>
					</div>
				</div>
				<div class="text-bottom">
					<div
						style={{ fontSize: "1.4rem", fontWeight: 550, textAlign: "center" }}
					>
						{props.thirdHeading}
					</div>
				</div>
			</div>
			<div className="spinner"></div>
		</div>
	);
};

export default LoadingPage;
