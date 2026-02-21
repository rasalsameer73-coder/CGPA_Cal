
const gradePoints = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "P": 4,
    "F": 0
};

const tableBody = document.getElementById("tableBody");

function addRow() {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" placeholder="Subject"></td>
        <td><input type="number" min="1" class="credit"></td>
        <td>
            <select class="grade">
                <option value="O">O</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="P">P</option>
                <option value="F">F</option>
            </select>
        </td>
        <td><button onclick="removeRow(this)">X</button></td>
    `;

    tableBody.appendChild(row);
}


function removeRow(btn) {
    btn.closest("tr").remove();
    calculateCGPA();
}


function calculateCGPA() {
    const rows = document.querySelectorAll("#tableBody tr");

    let totalCredits = 0;
    let totalPoints = 0;

    rows.forEach(row => {
        const creditInput = row.querySelector(".credit");
        const gradeSelect = row.querySelector(".grade");

        const credits = parseFloat(creditInput.value);
        const grade = gradeSelect.value;

        if (!isNaN(credits) && credits > 0) {
            totalCredits += credits;
            totalPoints += credits * gradePoints[grade];
        }
    });

    let cgpa = 0;
    if (totalCredits > 0) {
        cgpa = (totalPoints / totalCredits).toFixed(2);
    }

    document.getElementById("totalCredits").innerText = totalCredits;
    document.getElementById("cgpa").innerText = cgpa;
}


tableBody.addEventListener("input", calculateCGPA);
tableBody.addEventListener("change", calculateCGPA);


addRow();