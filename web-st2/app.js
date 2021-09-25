const btn = document.querySelector("#btn");
let input_text = document.querySelector("#input_text");
let content = document.querySelector("#content");
let work = [];
let count = 0;
let flag = false;
function refreshItems() {
	content.innerHTML = "";
	setTimeout(() => {
		work.map((val) => {
			flag = true;
			content.insertAdjacentHTML(
				"afterbegin",
				`<div class="items" id="${val.id}">
                <h3>${val.text}</h3>
               <div class="prop">
                   <i class="fas fa-sort-up"></i>
                   <i class="fas fa-sort-down"></i>
                   <i class="fas fa-trash"></i>
               </div>
            </div>`,
			);
		});
	}, 1);
}
const addData = () => {
	let text = input_text.value.trim();
	refreshItems();
	if (text != "") {
		count++;
		work.push({ text, id: count });

		count++;
		input_text.value = "";
		input_text.focus();
	} else {
		alert("Please enter Something");
	}
};
console.log(content.innerHTML);
document.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		addData();
	}
});
btn.addEventListener("click", () => {
	addData();
	btn.style.transition = "all 1s ease";
	if (flag) {
		btn.innerHTML = '<i class="fas fa-check"></i>';
		function changeIcon() {
			btn.innerHTML = '<i class="far fa-paper-plane"></i>';
			flag = false;
		}
		setTimeout(changeIcon, 500);
	}
});
//// delete functionality
content.addEventListener("click", deleteCheck);
function deleteCheck(e) {
	const item = e.target;
	if (item.classList[1] === "fa-sort-up") {
		const todo = item.parentElement.parentElement.getAttribute("id");
		console.log(todo);
		let index = -1;
		for (let i = 0; i < work.length; i++) {
			if (work[i].id == todo) {
				index = i;
			}
		}
		if (index != work.length - 1) {
			const temp = work[index + 1];
			work[index + 1] = work[index];
			work[index] = temp;

			refreshItems();
		} else {
			alert("sorry!");
		}
	}
	if (item.classList[1] === "fa-sort-down") {
		const todo = item.parentElement.parentElement.getAttribute("id");
		console.log(todo);
		let index = -1;
		for (let i = 0; i < work.length; i++) {
			if (work[i].id == todo) {
				index = i;
			}
		}
		if (index != 0) {
			const temp = work[index - 1];
			work[index - 1] = work[index];
			work[index] = temp;

			refreshItems();
		} else {
			alert("Chill");
		}
	}
	if (item.classList[1] === "fa-trash") {
		item.parentElement.parentElement.remove();
		const todo = item.parentElement.parentElement;
		todo.classList.add("slide-out-elliptic-top-bck");
		todo.addEventListener("animationend", () => todo.remove());
		const newArray = work.filter(({ id }) => id != todo.getAttribute("id"));
		work = newArray;
	}
}
