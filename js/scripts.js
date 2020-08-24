// To Do List
// Make a to do list page where people can add tasks to create a list of things to do.
// Add an option for users to indicate a task is done.
// Allow users to remove a task from the list.
// Make sure to identify specific behaviors your program should demonstrate and create specifications with example input and output. List these in the project's README.

function ToDoList() {
  this.tasks = [];
  this.currentId = 0;
}

ToDoList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.tasks.push(task);
}

ToDoList.prototype.assignId = function(id) {
  this.currentId +=1;
  return this.currentId;
}

ToDoList.prototype.findTask = function(id) {
  for (let i=0; i<this.tasks.length; i++) {
    if (this.tasks[i].id == id) {
      return this.tasks[i];
    }
  };
  return false;
}

ToDoList.prototype.deleteTask = function(id) {
  for (let i=0; i<this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == id) {
        delete this.tasks[i];
        return true;
      }
    }
  };
  return false;
}

function Task(taskName, taskDuration, taskArea) {
  this.taskName = taskName;
  this.taskDuration = taskDuration;
  this.taskArea = taskArea;
}


let toDoList = new ToDoList();

function displayTaskDetails(toDoToDisplay) {
  let toDoList = $("ul#tasks");
  let htmlForTaskInfo = "";
  toDoToDisplay.tasks.forEach(function(task) {
    htmlForTaskInfo += "<li id=" + task.id + ">" + task.taskName + "</li>";
  });
  toDoList.html(htmlForTaskInfo);
};

function showTask(taskId) {
  const task = toDoList.findTask(taskId);
  $("#show-task").show();
  $(".taskName").html(task.taskName);
  $(".taskDuration").html(task.taskDuration);
  $(".taskArea").html(task.taskArea);
}

function attachTaskListeners() {
  $('ul#tasks').on('click', 'li', function() {
    showTask(this.id);
  });
}

function completeTask() {
  $("li").on("click", 'li', function() {
    document.getElementById("text").style.color="blue";
  })
}

$(document).ready(function() {
  attachTaskListeners();
  completeTask();
  $("form#new-task").submit(function(event) {
    event.preventDefault();
    const inputtedTaskName = $("input#new-taskName").val();
    const inputtedTaskDuration = $("input#new-taskDuration").val();
    const inputtedTaskArea = $("input#new-taskArea").val();
    $('input#new-taskName').val("");
    $('input#new-taskDuration').val("");
    $('input#new-taskArea').val("");
    let newTask = new Task(inputtedTaskName, inputtedTaskDuration, inputtedTaskArea);
    toDoList.addTask(newTask);
    displayTaskDetails(toDoList);

    

  });
});