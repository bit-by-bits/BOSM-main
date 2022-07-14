const END_POINT = "https://www.bitsbosm.org/2022";
const form_cont = document.getElementById("reg-cont");
const form = document.getElementById("reg-form");
const reg_btn = document.getElementById("reg-btn");
const back_btn = document.getElementById("form_close");
const sport_inpt = document.getElementById("sports");
const sport_sel_list = document.getElementById("sport-sel-list");
const sport_list = document.getElementById("sport-list");
const college_list = document.getElementById("college");
let display_form = false;
let avail_sports = [];
let sel_sports = [];
let colleges = [];
let sports_avail_html = ``;
let sports_sel_html = ``;
let college_html = ``;

const get_elems = async () => {
	try {
		let college_res = await fetch(`${END_POINT}/get_colleges`, {
			method: "GET",
			mode: "cors",
		});

		let sports_res = await fetch(`${END_POINT}/get_sports`, {
			method: "GET",
			mode: "cors",
		});

		let college_list_json = await college_res.json();
		let sport_list_json = await sports_res.json();
		colleges = college_list_json.colleges;
		avail_sports = sport_list_json.sports;
		let college_pat = ``;
		colleges.forEach((val) => {
			college_html = `${college_html}<option value="${val}>${val}</option>`;
			college_pat = `${college_pat}|${val}`;
		});
		college_list.innerHTML = college_html;
		document.getElementById("college").pattern = college_pat;
	} catch (e) {
		alert("Failure in getting data");
	}
};

const submit_form = async () => {
	try {
		let genders = document.getElementsByName("gender");
		let gender;
		genders.forEach((gender_elem) => {
			if (gender_elem.checked) {
				gender = gender_elem.value;
			}
		});

		let data = {
			name: document.getElementById("name").value,
			email_id: document.getElementById("email").value,
			phone: document.getElementById("phone").value,
			gender: gender,
			year_of_study: document.getElementById("yos").value,
			college_id: document.getElementById("college").value,
			city: document.getElementById("city").value,
			state: document.getElementById("state").value,
			sports_ids: JSON.stringify(sel_sports),
			is_coach: document.getElementById("coach").checked,
		};

		console.log(data);

		let submit_res = await fetch(`${END_POINT}/register`, {
			method: "POST",
			mode: "cors",
			body: JSON.stringify(data)
		});

		alert("SUCCESS");
		display_form = false;
		form_toggle();
		document.getElementById("name").value = "";
		document.getElementById("email").value = "";
		document.getElementById("phone").value = "";
		document.getElementById("yos").value = "";
		document.getElementById("college").value = "";
		document.getElementById("city").value = "";
		document.getElementById("state").value = "";
		document.getElementById("sports").value = "";
		avail_sports = [...avail_sports, ...sel_sports];
		sel_sports = [];
	} catch (e) {
		alert("FAILURE");
	}
};

const form_toggle = () => {
	if (display_form) {
		form_cont.style.clipPath = "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)";
	} else {
		form_cont.style.clipPath = "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)";
	}
};

const set_sport_list = () => {
	sports_avail_html = ``;
	sports_sel_html = ``;
	avail_sports.forEach((val) => {
		sports_avail_html = `${sports_avail_html}<option value = "${val}">${val}</option>`;
	});
	sport_list.innerHTML = sports_avail_html;
	sel_sports.forEach((val) => {
		sports_sel_html = `${sports_sel_html}<li class="sport-item">${val}</li>`;
	});
	sport_sel_list.innerHTML = sports_sel_html;
};

form.addEventListener("submit", (evt) => {
	evt.preventDefault();
	submit_form();
});

reg_btn.addEventListener("click", () => {
	display_form = true;
	form_toggle();
});

back_btn.addEventListener("click", () => {
	display_form = false;
	form_toggle();
});

sport_inpt.addEventListener("input", (evt) => {
	if (avail_sports.includes(evt.target.value)) {
		sel_sports.push(evt.target.value);
		avail_sports.splice(avail_sports.indexOf(evt.target.value), 1);
		evt.target.value = "";
		set_sport_list();
	}
});

document.body.addEventListener("keyup", (evt) => {
	if (evt.key === "Escape") {
		if (display_form) {
			display_form = false;
			form_toggle();
		}
	}
});

form_cont.addEventListener("click", (evt) => {
	if (!form.contains(evt.target)) {
		display_form = false;
		form_toggle();
	}
});

document.querySelectorAll(".sport-item").forEach((ele) => {
	ele.addEventListener("click", (evt) => {
		avail_sports.push(ele.textContent);
		sel_sports.splice(sel_sports.indexOf(ele.textContent), 1);
		set_sport_list();
	});
});

form_toggle();
set_sport_list();
get_elems();