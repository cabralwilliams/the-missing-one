import React from "react";
import NavBar2 from "./NavBar2";
const Header = () => {
	return (
		<header>
			<div className="px-3 py-2 navigation text-white">
				<nav className="container">
					<NavBar2 />
				</nav>
			</div>
			<div className="px-3 py-2 border-bottom mb-3">
				<div className="container d-flex flex-wrap justify-content-center">
					<form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
						<div>
							{" "}
							<input
								type="search"
								className="form-control"
								placeholder="Case ID"
								aria-label="Search"
							/>
						</div>
					</form>

					<div className="text-end">
						<button type="button" className="btn btn-primary">
							Search
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
