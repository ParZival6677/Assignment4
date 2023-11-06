// Form Validation
function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    let isValid = true;

    if (name.trim() === "") {
        alert("Name is required");
        isValid = false;
    }

    if (email.trim() === "") {
        alert("Email is required");
        isValid = false;
    } else if (!validateEmail(email)) {
        alert("Invalid email format");
        isValid = false;
    }

    if (message.trim() === "") {
        alert("Message is required");
        isValid = false;
    }

    if (isValid) {
        alert("Thank you for submitting the form!");
    }

    return isValid;
}

// Validate email format using a regular expression
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
    // Initialize Bootstrap dropdown
    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggle) {
        return new bootstrap.Dropdown(dropdownToggle);
    });
});

// To-Do List
window.addTaskModal = function () {
    const taskInputModal = document.getElementById("taskInputModal");
    const taskListModal = document.getElementById("taskListModal");

    const taskText = taskInputModal.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        // Create a span for the task text
        const span = document.createElement("span");
        span.textContent = taskText;

        // Create a "Completed" button for task completion
        const completeButton = document.createElement("button");
        completeButton.className = "btn btn-success btn-sm";
        completeButton.textContent = "✓";
        completeButton.style.marginRight = "5px";
        completeButton.onclick = function() {
            span.classList.toggle("completed");
        };

        // Create a "Delete" button for task deletion
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "✖";
        deleteButton.onclick = function() {
            taskListModal.removeChild(li);
        };

        // Append the span and buttons to the li element
        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        // Append the li element to the task list
        taskListModal.appendChild(li);

        taskInputModal.value = "";
    }
};

// Add event handlers after document is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the modal elements
    const todoListModal = new bootstrap.Modal(document.getElementById("todoListModal"));
    const countdownTimerModal = new bootstrap.Modal(document.getElementById("countdownTimerModal"));

    // Event handlers for opening modals
    document.getElementById("toDoListDropdownItem").addEventListener("click", function (e) {
        e.preventDefault();
        todoListModal.show();
    });

    document.getElementById("countdownTimerDropdownItem").addEventListener("click", function (e) {
        e.preventDefault();
        countdownTimerModal.show();
    });

    // Start the Countdown Timer
    const durationInputModal = document.getElementById("durationModal");
    const startButtonModal = document.getElementById("startButtonModal");
    const timerModal = document.getElementById("timerModal");
    let countdownIntervalModal;

    startButtonModal.addEventListener("click", function () {
        const duration = parseInt(durationInputModal.value);

        if (duration > 0) {
            if (countdownIntervalModal) {
                clearInterval(countdownIntervalModal);
            }
            timerModal.classList.remove("hidden");
            startCountdown(duration);
        }
    });

    // Start the countdown timer
    function startCountdown(duration) {
        let remainingTime = duration;
        timerModal.innerText = remainingTime;

        countdownIntervalModal = setInterval(function () {
            remainingTime--;

            if (remainingTime < 0) {
                clearInterval(countdownIntervalModal);
                timerModal.innerText = "Time's up!";
            } else {
                timerModal.innerText = remainingTime;
            }
        }, 1000);
    }
});

$(document).ready(function () {
    $(".draggable-item").on("dragstart", function (e) {
        e.originalEvent.dataTransfer.setData("text/plain", e.target.textContent);
    });

    $(".dropzone").on("dragover", function (e) {
        e.preventDefault();
    });

    $(".dropzone").on("drop", function (e) {
        e.preventDefault();
        var data = e.originalEvent.dataTransfer.getData("text/plain");
        var category = $(this).data("category");

        if (data && data.length > 0) {
            $(this).append("<div class='dropped-item'>" + data + "</div>");
            $(".draggable-item:contains(" + data + ")").hide();
        }
    });

    $("#checkAnswersButton").on("click", function () {
        var correctAnswers = {
            "ac": "Alternating Current (AC)",
            "coil": "Tesla Coil",
            "motor": "Induction Motor",
            "wpt": "Wireless Power Transmission",
            "radio": "Radio"
        };

        var allCorrect = true;
        $(".dropzone").each(function () {
            var category = $(this).data("category");
            var droppedItem = $(this).find(".dropped-item");
            var correctAnswer = correctAnswers[category];

            if (droppedItem.length === 0 || droppedItem.text() !== correctAnswer) {
                allCorrect = false;
            }
        });

        $(".dropzone").each(function () {
            var category = $(this).data("category");
            var droppedItem = $(this).find(".dropped-item");
            var correctAnswer = correctAnswers[category];

            if (droppedItem.length === 0 || droppedItem.text() !== correctAnswer) {
                $(this).removeClass("bg-success").addClass("bg-danger");
            } else {
                $(this).removeClass("bg-danger").addClass("bg-success");
            }
        });

        if (allCorrect) {
            alert("Congratulations! You placed all inventions in the correct categories.");
        } else {
            alert("Please place all inventions in the correct categories.");
        }
    });
});

function playAudio() {
    let audio = document.getElementById("myAudio");
    audio.play();
}

function stopAudio() {
    let audio = document.getElementById("myAudio");
    audio.pause();
}
