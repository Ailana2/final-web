const urlParams = new URLSearchParams(window.location.search);
  const studentId = parseInt(urlParams.get('id')); // convert to number

  fetch('students.json')
    .then(response => response.json())
    .then(data => {
      const student = data.find(s => s.id === studentId);

      if (student) {
        document.getElementById("name").textContent = student.name;
        document.getElementById("id").textContent = student.id;
        document.getElementById("studentImage").src = student.image;

        // If "grade" is not part of student.json, you may set it manually or skip it
        document.getElementById("grade").textContent = student.grade; // or fetch from somewhere else

        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        progressFill.style.width = `${student.progress}%`;
        progressText.textContent = `${student.progress}%`;
      } else {
        console.error("Student not found.");
      }
    })
    .catch(error => {
      console.error("Error loading student data:", error);
    });



// Feedback function
function submitFeedback() {
    const input = document.getElementById("feedbackInput");
    const message = document.getElementById("feedbackMessage");
  
    const feedback = input.value.trim();
    if (feedback.length === 0) {
      alert("Please write your feedback before submitting.");
      return;
    }
  
    console.log("Feedback submitted:", feedback);
    message.classList.remove("hidden");
  
    setTimeout(() => {
      message.classList.add("hidden");
    }, 3000);
  
    input.value = "";
  }
  
  // Go back button logic
  document.getElementById("backButton").addEventListener("click", function () {
    window.location.href = "preindex.html"; // Make sure this matches your homepage file name
  });
  
  
  const subjectCards = document.querySelectorAll('.subject-card');
  const quizTableBody = document.querySelector(".quiz-table tbody");
  
  
  
  // Default: activate mechanics on page load
  window.addEventListener("DOMContentLoaded", () => {
  activateCard("mechanics");
  });
  
  subjectCards.forEach(card => {
  card.addEventListener("click", () => {
    const subject = card.getAttribute("data-subject");
    activateCard(subject);
  });
  });
  
  function activateCard(subjectKey) {
  // Update active class
  subjectCards.forEach(card => {
    const cardSubject = card.getAttribute("data-subject");
    if (cardSubject === subjectKey) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
  
  // Update quiz table
  const topics = topicsData[subjectKey];
  quizTableBody.innerHTML = "";
  topics.forEach(item => {
    const row = `<tr>
      <td>${item.topic}</td>
      <td>${item.quiz}</td>
      <td>${item.percentage}</td>
    </tr>`;
    quizTableBody.innerHTML += row;
  });
  }
  
  function addTopic() {
  const topic = document.getElementById("newTopic").value.trim();
  const quiz = document.getElementById("newQuiz").value.trim();
  const percent = document.getElementById("newPercent").value.trim();
  
  if (!topic || !quiz || !percent) {
    alert("Please fill in all fields.");
    return;
  }
  
  const table = document.getElementById("topicsTable").getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  
  cell1.textContent = topic;
  cell2.textContent = quiz;
  cell3.textContent = percent;
  
  document.getElementById("newTopic").value = "";
  document.getElementById("newQuiz").value = "";
  document.getElementById("newPercent").value = "";
  }
  
  document.getElementById("newQuiz").addEventListener("input", function () {
  const value = this.value.trim(); // e.g., "5/10"
  const percentInput = document.getElementById("newPercent");
  
  if (/^\d+\/\d+$/.test(value)) {
    const [score, total] = value.split("/").map(Number);
    if (total > 0) {
      const percentage = Math.round((score / total) * 100);
      percentInput.value = percentage + "%";
    } else {
      percentInput.value = "";
    }
  } else {
    percentInput.value = "";
  }
  });
  
  function updateProgressBar() {
  const percentageCells = document.querySelectorAll('.quiz-table tbody td:nth-child(3)');
  let total = 0;
  let count = 0;
  
  percentageCells.forEach(cell => {
    const percent = parseInt(cell.textContent.replace('%', ''));
    if (!isNaN(percent)) {
      total += percent;
      count++;
    }
  });
  
  const average = count > 0 ? Math.round(total / count) : 0;
  
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  
  progressFill.style.width = `${average}%`;
  progressText.textContent = `${average}%`;
  }
  
  // Call after the DOM loads
  window.addEventListener('DOMContentLoaded', updateProgressBar);
  
  
  
  fetch('https://student-grades-rest.onrender.com/api/students')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#students tbody');
        data.forEach(student => {
          student.grades.forEach(grade => {
            const row = document.createElement('tr');
  
            const idCell = document.createElement('td');
            idCell.textContent = student.id;
  
            const nameCell = document.createElement('td');
            nameCell.textContent = student.name;
  
            const subjectCell = document.createElement('td');
            subjectCell.textContent = grade.subject;
  
            const gradeCell = document.createElement('td');
            gradeCell.textContent = grade.gradeValue;
  
            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(subjectCell);
            row.appendChild(gradeCell);
  
            tableBody.appendChild(row);
          });
        });
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });


