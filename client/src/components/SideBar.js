import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
const SideBar = () => {
	return (
		<div className="border-end bg-white" id="sidebar-wrapper">
			<div className="sidebar-heading border-bottom bg-light">Search Cases</div>
			<form>
				<div className="list-group list-group-flush">
					{/* <a
					className="list-group-item list-group-item-action list-group-item-light p-3"
					href="#!"
				>
					Dashboard
				</a> */}
					<div className="mb-3 list-group-item list-group-item-action list-group-item-light p-2">
						<label className="form-label" for="firstname">
							First Name
						</label>
						<input
							type="text"
							className="form-control"
							id="firstname"
							placeholder="First Name"
						/>
					</div>
					<div className="mb-3 list-group-item list-group-item-action list-group-item-light p-2">
						<label className="form-label" for="lastname">
							Last Name
						</label>
						<input
							type="text"
							className="form-control"
							id="lastname"
							placeholder="Last Name"
						/>
					</div>
					<div className="mb-3 list-group-item list-group-item-action list-group-item-light p-2">
						<label className="form-label" for="ncic">
							NCIC#
						</label>
						<input
							type="text"
							className="form-control"
							id="ncic"
							placeholder="NCIC#"
						/>
					</div>
					<div className="mb-3 list-group-item list-group-item-action list-group-item-light p-2 text-center">
						<button type="button" className="btn btn-primary w-75">
							{" "}
							<GoSearch />
							&nbsp;&nbsp;Search
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
export default SideBar;
