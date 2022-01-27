import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const NavBar2 = () => {
	// function showNavigation() {
	// 	if (Auth.loggedIn()) {
	// 		return (
	// 			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
	// 				<li className="nav-item fs-5 active">
	// 					<Link className="nav-link" aria-current="page" to="/Profile">
	// 						Profile
	// 					</Link>
	// 				</li>
	// 				<li className="nav-item fs-5 active">
	// 					<Link className="nav-link" aria-current="page" to="/CreateCase">
	// 						Create Case
	// 					</Link>
	// 				</li>
	// 				<li className="nav-item fs-5 active">
	// 					{/* this is not using the Link component to logout or user and then refresh the application to the start */}
	// 				<Link
	// 						className="nav-link"
	// 						aria-current="page"
	// 						to="/"
	// 						onClick={() => Auth.logout()}
	// 					>
	// 						Logout
	// 					</Link>
	// 				</li>
	// 			</ul>
	// 		);
	// 	} else {
	// 		return (
	// 			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
	// 				<li className="nav-item fs-5 active">
	// 					<Link className="nav-link" aria-current="page" to="/login">
	// 						Login
	// 					</Link>
	// 				</li>
	// 				<li className="nav-item fs-5">
	// 					<Link className="nav-link" to="/signup">
	// 						Signup
	// 					</Link>
	// 				</li>
	// 			</ul>
	// 		);
	// 	}
	// }

	console.log(Auth.loggedIn());
	return (
		<div className="collapse navbar-collapse d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between">
			<Link to="/">
				<h2>The Missing One</h2>
			</Link>
			{Auth.loggedIn() ? (
				<ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
					<li>
						<Link to="/" className="nav-link text-secondary">
							<svg
								className="bi d-block mx-auto mb-1"
								width="24"
								height="24"
							></svg>
							Home
						</Link>
					</li>

					<li>
						<Link to="/CreateCase" className="nav-link text-white">
							<svg
								className="bi d-block mx-auto mb-1"
								width="24"
								height="24"
							></svg>
							New Case
						</Link>
					</li>
					<li>
						<Link to="/Profile" className="nav-link text-white">
							<svg
								className="bi d-block mx-auto mb-1"
								width="24"
								height="24"
							></svg>
							Profile
						</Link>
					</li>
					<li>
						<Link to="#" className="nav-link text-white">
							<svg
								className="bi d-block mx-auto mb-1"
								width="24"
								height="24"
							></svg>
							Donations
						</Link>
					</li>

					<li>
						{/* this is not using the Link component to logout or user and then refresh the application to the start */}
						<Link
							className="nav-link"
							aria-current="page"
							to="/"
							onClick={() => Auth.logout()}
						>
							{" "}
							<svg
								className="bi d-block mx-auto mb-1"
								width="24"
								height="24"
							></svg>
							Logout{" "}
						</Link>
					</li>
				</ul>
			) : (
				<ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
					<li>
						<Link to="/" className="nav-link text-secondary">
							<svg
								className="bi d-block mx-auto mb-1"
								width="24"
								height="24"
							></svg>
							Home
						</Link>
					</li>
					<li>
						<Link className="nav-link" aria-current="page" to="/login">
							<svg
								className="bi d-block mx-auto mb-1"
								width="24"
								height="24"
							></svg>{" "}
							Login
						</Link>
					</li>
					<li>
						<Link className="nav-link " to="/signup">
							<svg
								className="bi d-block mx-auto mb-1"
								width="10"
								height="17"
							></svg>{" "}
							<span className="btn btn-primary">Signup</span>
						</Link>
					</li>
				</ul>
			)}
		</div>
	);
};

export default NavBar2;
