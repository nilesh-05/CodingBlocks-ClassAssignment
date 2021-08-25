var taskList = document.getElementsByTagName("LI");
var i;
for (i = 0; i < taskList.length; i++) {
	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	taskList[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
	close[i].onclick = function () {
		var div = this.parentElement;
		div.style.display = "none";
	};
}

const addItem = () => {
	var li = document.createElement("li");
	var ul = document.querySelector("ul");
	var inputValue = document.getElementById("myInput").value;
	var t = document.createTextNode(inputValue);
	li.appendChild(t);
	if (inputValue === "") {
		alert("Cannot add empty task!");
	} else {
		document.getElementById("output").appendChild(li);
	}
	document.getElementById("myInput").value = "";

	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	li.className = "draggable";
	var attr = document.createAttribute("draggable");
	attr.value = "true";
	li.setAttributeNode(attr);
	li.appendChild(span);
	// ul.appendChild(li);
	addEventsDragAndDrop(li);
	for (i = 0; i < close.length; i++) {
		close[i].onclick = function () {
			var div = this.parentElement;
			div.style.display = "none";
		};
	}
};

// Dragging
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
