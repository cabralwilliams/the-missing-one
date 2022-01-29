import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
const Header2 = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom ">
			<div className="container-fluid navigation">
				{/* <button className="btn btn-primary" id="sidebarToggle">
					Toggle Menu
				</button> */}
				<Link to="/">
					<h2>The Missing One</h2>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					{Auth.loggedIn() ? (
						<ul className="navbar-nav ms-auto mt-2 mt-lg-0">
							<li className="nav-item active">
								<Link to="/" className="nav-link text-light">
									<svg
										className="bi d-block mx-auto mb-1"
										width="24"
										height="24"
									></svg>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/CreateCase" className="nav-link text-light">
									<svg
										className="bi d-block mx-auto mb-1"
										width="24"
										height="24"
									></svg>
									New Case
								</Link>
							</li>

							<li className="nav-item">
								<Link to="/Profile" className="nav-link text-white">
									<svg
										className="bi d-block mx-auto mb-1"
										width="24"
										height="24"
									></svg>
									Profile
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/DonationCart" className="nav-link text-white">
									<svg
										className="bi d-block mx-auto mb-1"
										width="24"
										height="24"
									></svg>
									Donations
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/OrderHistory" className="nav-link text-white">
									<svg
										className="bi d-block mx-auto mb-1"
										width="24"
										height="24"
									></svg>
									Donations History
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link text-light"
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
						<ul className="navbar-nav ms-auto mt-2 mt-lg-0">
							<li className="nav-item">
								<Link to="/" className="nav-link text-light">
									<svg
										className="bi d-block mx-auto mb-1"
										width="24"
										height="24"
									></svg>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link text-light"
									aria-current="page"
									to="/login"
								>
									<svg
										className="bi d-block mx-auto mb-1"
										width="24"
										height="24"
									></svg>{" "}
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link text-light " to="/signup">
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
			</div>
		</nav>
	);
};

export default Header2;
