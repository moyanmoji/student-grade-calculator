// Initialize data from LocalStorage
let courses = JSON.parse(localStorage.getItem('courses')) || [];

const form = document.getElementById('grade-form');
const courseList = document.getElementById('course-list');

// Event: Add Course
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('course-name').value;
    const mark = parseFloat(document.getElementById('course-mark').value);
    const weight = parseFloat(document.getElementById('course-weight').value);

    // Validation
    if (name && !isNaN(mark) && !isNaN(weight)) {
        courses.push({ name, mark, weight });
        updateUI();
        form.reset();
    }
});

function updateUI() {
    // Save to LocalStorage
    localStorage.setItem('courses', JSON.stringify(courses));
    
    // Clear Table
    courseList.innerHTML = '';
    
    let totalWeightedPoints = 0;
    let totalWeight = 0;

    // Loop through courses
    courses.forEach((course, index) => {
        totalWeightedPoints += (course.mark * (course.weight / 100));
        totalWeight += course.weight;

        const row = `
            <tr>
                <td>${course.name}</td>
                <td>${course.mark}%</td>
                <td>${course.weight}%</td>
                <td><button onclick="deleteCourse(${index})" style="background:#ef4444; padding: 5px 10px;">X</button></td>
            </tr>
        `;
        courseList.innerHTML += row;
    });

    // Calculate Statistics
    const finalAvg = totalWeight > 0 ? (totalWeightedPoints / (totalWeight / 100)).toFixed(2) : 0;
    
    document.getElementById('final-avg').innerText = `${finalAvg}%`;
    document.getElementById('pass-status').innerText = finalAvg >= 50 ? 'Passing' : 'Failing';
    document.getElementById('pass-status').style.color = finalAvg >= 50 ? '#10b981' : '#ef4444';
}

function deleteCourse(index) {
    courses.splice(index, 1);
    updateUI();
}

document.getElementById('clear-btn').addEventListener('click', () => {
    courses = [];
    updateUI();
});

// Load initial data
updateUI();