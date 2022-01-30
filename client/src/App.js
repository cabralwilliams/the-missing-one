import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./index.css";

//inport redux store
import { Provider } from "react-redux";
import store from "./utils/store";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateCase from "./pages/CreateCase";
import Edit from "./pages/Edit";
import DonationCart from "./pages/DonationCart";
import SideBar from "./components/SideBar";
import { GoSearch } from "react-icons/go";
import { BiArrowToLeft } from "react-icons/bi";



import CaseDetails from "./pages/CaseDetails";

import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";


const httpLink = createHttpLink({
	uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

window.addEventListener("DOMContentLoaded", (event) => {
	// Toggle the side navigation
	const sidebarToggle = document.body.querySelector("#sidebarToggle");
	if (sidebarToggle) {
		// Uncomment Below to persist sidebar toggle between refreshes
		// if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
		//     document.body.classList.toggle('sb-sidenav-toggled');
		// }
		sidebarToggle.addEventListener("click", (event) => {
			event.preventDefault();
			document.body.classList.toggle("sb-sidenav-toggled");
			console.log(document.body.classList);
			console.log(event.target.innerHTML);
			if (document.body.classList.contains("sb-sidenav-toggled"))
				event.target.innerHTML = "<i className='bi bi-arrow-bar-left'/> Close";
			else event.target.innerHTML = "<BiArrowToLeft />&nbsp;&nbsp; Search";
			localStorage.setItem(
				"sb|sidebar-toggle",
				document.body.classList.contains("sb-sidenav-toggled")
			);
		});
	}
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	console.log("App component");

	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="flex-column justify-flex-start min-100-vh">
					<Provider store={store}>
						<Header />
						<div className="d-flex Container" id="wrapper">
							<SideBar />
							<div id="page-content-wrapper">
								<button className="btn btn-primary" id="sidebarToggle">
									<BiArrowToLeft />
									&nbsp;&nbsp; Search
								</button>

								<div className="container-fluid width-80">
									<Switch>
										<Route exact path="/" component={Home} />
										<Route exact path="/Profile" component={Profile} />
										<Route exact path="/CreateCase" component={CreateCase} />
										<Route exact path="/login" component={Login} />
										<Route exact path="/signup" component={Signup} />
										<Route
											exact
											path="/DonationCart"
											component={DonationCart}
										/>
										<Route exact path="/edit" component={Edit} />
										<Route exact path="/success" component={Success} />

										<Route exact path="/cases/:caseId" component={CaseDetails} />

										<Route
											exact
											path="/OrderHistory"
											component={OrderHistory}
										/>

										<Route component={NoMatch} />
									</Switch>
								</div>
							</div>
						</div>
						<Footer />
					</Provider>
				</div>
			</Router>
		</ApolloProvider>
	);
}
export default App;
