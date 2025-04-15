document.addEventListener("DOMContentLoaded", () => {
   const inputBox = document.getElementById("input-box");
   const listContainer = document.getElementById("list-container");

   const addTask= () => {
      if(inputBox.value.trim() === "") {
        alert("You must write something");
      }else {
        const li = document.createElement("li");
        li.textContent = inputBox.value;

        //add delete button
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
        saveData();
      }
      inputBox.value = "";
   }

   const saveData = () => {
      localStorage.setItem("data", listContainer.innerHTML);
   }

   const showTask = () => {
    listContainer.innerHTML = localStorage.getItem("data" | "");
   }
   
   listContainer.addEventListener("click", (e) => {
     if(e.target.TagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
     } else if (e.target.TagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
     }
   })
   listContainer.addEventListener("dblclick", (e) => {
     if(e.target.TagName === "LI") {
        const li = e.target;
        const currentText = li.childNodes[0].nodeValue.trim();

        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.classList.add("edit-task");

        li.innerHTML = "";
        li.appendChild(input);
        input.focus();

        input.addEventListener("blur", () => finishEdit(li, input));
        input.addEventListener("keydown", (e) => {
            if(e.key === "Enter") finishEdit (li, input);
        })
     }
   })

   const finishEdit = (li, input) => {
    const newValue = input.value.trim();
    if(newValue !== "") {
        li.textContent = newValue;
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    } else {
        li.remove();
        saveData();
    }
   }
   window.addTask = addTask;

   showTask();
})