fetch('https://cs571api.cs.wisc.edu/rest/s26/hw2/students', {
    headers: {
        "X-CS571-ID": CS571.getBadgerId()
    }
})
.then(res => res.json())
.then(data => {
    console.log(data);
	document.getElementById("num-results").innerText = data.length;
	buildStudents(data);
	allStuds = data; // store all students in a global variable for searching later
});

function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	const container = document.getElementById("students");
	container.innerHTML = ''; // clear out any existing students
	for(let stud of studs) {
		const studCard = document.createElement("div");
		studCard.className = "col-12 col-md-6 col-lg-4 col-xl-3";
		// const nameHTML = document.createElement("h2");
		// nameHTML.innerText = stud.name.first + " " + stud.name.last;
		// const majorHTML = document.createElement("p");
		// majorHTML.innerHTML = "<strong>" + stud.major + "</strong>";
		// const studinfoHTML = document.createElement("p");
		// studinfoHTML.innerText = stud.name.first + " is taking " + stud.numCredits + " credits and " + (stud.isWisconsin ? "is" : "is NOT") + " from Wisconsin.";
		// const interestsHTML = document.createElement("p");
		// interestsHTML.innerText = "They have " + stud.interests.length + " interests including...";
		// const interestsListHTML = document.createElement("ul");
		// for(let interest of stud.interests) {
		// 	const interestHTML = document.createElement("li");
		// 	interestHTML.innerText = interest;
		// 	interestsListHTML.appendChild(interestHTML);
		// }
		// studCard.appendChild(nameHTML);
		// studCard.appendChild(majorHTML);
		// studCard.appendChild(studinfoHTML);
		// studCard.appendChild(interestsHTML);
		// studCard.appendChild(interestsListHTML);
		// container.appendChild(studCard);
		studCard.innerHTML = `
			<h2>${stud.name.first} ${stud.name.last}</h2>
			<p><strong>${stud.major}</strong></p>
			<p>${stud.name.first} is taking ${stud.numCredits} credits and ${stud.isWisconsin ? "is" : "is NOT"} from Wisconsin.</p>
			<p>They have ${stud.interests.length} interests including...</p>
			<ul>
				${stud.interests.map(interest => `<li>${interest}</li>`).join('')}
			</ul>
		`;
		container.appendChild(studCard);
	}
	console.log(container);

}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	// TODO Implement the search
	const nameSearch = document.getElementById("search-name").value.trim().toLowerCase();
	const majorSearch = document.getElementById("search-major").value.trim().toLowerCase();
	const interestSearch = document.getElementById("search-interest").value.trim().toLowerCase();

	const results = allStuds.filter (stud => {
		const nameMatch = nameSearch === "" || stud.name.first.toLowerCase().includes(nameSearch) || stud.name.last.toLowerCase().includes(nameSearch);
		const majorMatch = majorSearch === "" || stud.major.toLowerCase().includes(majorSearch);
		const interestMatch = interestSearch === "" || stud.interests.some(interest => interest.toLowerCase().includes(interestSearch));
		return nameMatch && majorMatch && interestMatch;
	})

	buildStudents(results);
	document.getElementById("num-results").innerText = results.length;

}

document.getElementById("search-btn").addEventListener("click", (e) => {
	console.log("Search button clicked");
	handleSearch(e);
});
// document.getElementById("search-name").addEventListener("input", () => {
// 	console.log("Name input changed");
// });
// document.getElementById("search-major").addEventListener("input", () => {
// 	console.log("Major input changed");
// });
// document.getElementById("search-interest").addEventListener("input", () => {
// 	console.log("Interest input changed");
// });