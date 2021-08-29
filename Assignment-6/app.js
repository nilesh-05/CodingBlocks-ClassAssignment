const todoList = [];

const todoListElement = document.querySelector("#output");

document.querySelector(".addTask").addEventListener("click", addTodo);
document.querySelector("#myInput").addEventListener("keydown", function (e) {
	if (e.keyCode == 13) {
		addTodo();
	}
});

function addTodo() {
	const todoText = document.querySelector("#myInput").value;

	if (todoText == "") {
		alert("You did not enter any item");
	} else {
		const todoObject = {
			id: todoList.length,
			todoText: todoText,
			isDone: false,
		};

		todoList.unshift(todoObject);
		displayTodos();
	}
}

function doneTodo(todoId) {
	const selectedTodoIndex = todoList.findIndex((item) => item.id == todoId);

	todoList[selectedTodoIndex].isDone
		? (todoList[selectedTodoIndex].isDone = false)
		: (todoList[selectedTodoIndex].isDone = true);
	displayTodos();
}

function deleteItem(x) {
	todoList.splice(
		todoList.findIndex((item) => item.id == x),
		1,
	);
	displayTodos();
}

function displayTodos() {
	todoListElement.innerHTML = "";
	document.querySelector("#myInput").value = "";

	todoList.forEach((item) => {
		const listElement = document.createElement("li");
		const delBtn = document.createElement("i");

		listElement.innerHTML = item.todoText;
		listElement.setAttribute("data-id", item.id);
		listElement.setAttribute("draggable", true);
		delBtn.setAttribute("data-id", item.id);
		delBtn.classList.add("far");
		delBtn.classList.add("fa-trash-alt");
		delBtn.setAttribute("data-id", item.id);

		listElement.addEventListener("click", function (e) {
			const selectedId = e.target.getAttribute("data-id");
			doneTodo(selectedId);
		});

		delBtn.addEventListener("click", function (e) {
			const delId = e.target.getAttribute("data-id");
			deleteItem(delId);
		});

		todoListElement.appendChild(listElement);
		listElement.appendChild(delBtn);
		addEventsDragAndDrop(listElement);
	});
}

function dragStart(e) {
	this.style.opacity = "0.4";
	dragSrcEl = this;
	e.dataTransfer.effectAllowed = "move";
	e.dataTransfer.setData("text/html", this.innerHTML);
}

function dragEnter(e) {
	this.classList.add("over");
}

function dragLeave(e) {
	e.stopPropagation();
	this.classList.remove("over");
}

function dragOver(e) {
	e.preventDefault();
	e.dataTransfer.dropEffect = "move";
	return false;
}

function dragDrop(e) {
	if (dragSrcEl != this) {
		dragSrcEl.innerHTML = this.innerHTML;
		this.innerHTML = e.dataTransfer.getData("text/html");
	}
	return false;
}

function dragEnd(e) {
	var listItens = document.querySelectorAll(".draggable");
	[].forEach.call(listItens, function (item) {
		item.classList.remove("over");
	});
	this.style.opacity = "1";
}

function addEventsDragAndDrop(el) {
	el.addEventListener("dragstart", dragStart, false);
	el.addEventListener("dragenter", dragEnter, false);
	el.addEventListener("dragover", dragOver, false);
	el.addEventListener("dragleave", dragLeave, false);
	el.addEventListener("drop", dragDrop, false);
	el.addEventListener("dragend", dragEnd, false);
}

var listItens = document.querySelectorAll(".draggable");
[].forEach.call(listItens, function (item) {
	addEventsDragAndDrop(item);
});
