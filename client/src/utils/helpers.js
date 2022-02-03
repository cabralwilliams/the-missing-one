export function validateEmail(email) {
	var re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export function saveDonationAmount(donationAmount) {
	localStorage.setItem("theMissingDonation", `${donationAmount}`);
}

export function retrieveDonationAmount() {
	let output = parseFloat(localStorage.getItem("theMissingDonation"));
	localStorage.removeItem("theMissingDonation");
	return output;
}

export function storeCaseNames(firstName,lastName) {
	localStorage.setItem('caseFirstName',firstName);
	localStorage.setItem('caseLastName',lastName);
}

export function getCaseNames() {
	return {
		firstname: localStorage.getItem('caseFirstName'),
		lastname: localStorage.getItem('caseLastName')
	}
}

export function removeCaseNames() {
	localStorage.removeItem('caseFirstName');
	localStorage.removeItem('caseLastName');
}