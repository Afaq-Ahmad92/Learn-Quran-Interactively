import React from "react";
import "../Styling_Sheets/Home.css";
const Page_Detail = (props) => {
	return (
		<div className="pageDetail">
			<div className="pageDetail_left">
				<h3>{props.h3_1}</h3>
				<h1>{props.h1}</h1>
                <h3>{props.h3_2}</h3>
				<p>{props.p}</p>
			</div>
			<div className="pageDetail_right">
				<img className="image" src={props.img} alt="page_detail_image" />
			</div>
		</div>
	);
};

export default Page_Detail;
