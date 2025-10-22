// Mettre l'année automatiquement
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('userForm');
const results = document.getElementById('results');
const summary = document.getElementById('summary');
const workoutPlan = document.getElementById('workoutPlan');
const mealPlan = document.getElementById('mealPlan');

// Programmes d’entraînement en anglais, jour par jour
const workoutPrograms = {
  gain: [
    { day: "Monday", exercises: ["Chest: Bench Press 4x12", "Biceps: Dumbbell Curl 3x15", "Shoulders: Shoulder Press 3x12"] },
    { day: "Tuesday", exercises: ["Legs: Squats 4x15", "Glutes: Hip Thrust 3x15", "Calves: Standing Calf Raises 3x20"] },
    { day: "Wednesday", exercises: ["Back: Pull-Ups 3x10", "Triceps: Tricep Dips 3x12", "Abs: Plank 3x1min"] },
    { day: "Thursday", exercises: ["Cardio: Running 30 min", "Full Body Stretching 15 min"] },
    { day: "Friday", exercises: ["Chest & Back: Push-Ups 3x20, Rows 3x15", "Biceps & Triceps: Superset 3x12"] },
    { day: "Saturday", exercises: ["Legs & Core: Lunges 3x15, Leg Raises 3x15", "Cardio: Cycling 20 min"] },
    { day: "Sunday", exercises: ["Rest or light activity: Yoga / Walk 30 min"] }
  ],
  lose: [
    { day: "Monday", exercises: ["HIIT: 20 min", "Abs: Plank 3x1min", "Jumping Jacks 3x50"] },
    { day: "Tuesday", exercises: ["Full Body: Bodyweight Squats 3x15", "Push-Ups 3x15", "Lunges 3x15"] },
    { day: "Wednesday", exercises: ["Cardio: Running 30 min", "Stretching 10 min"] },
    { day: "Thursday", exercises: ["HIIT: 20 min", "Core: Leg Raises 3x15", "Burpees 3x12"] },
    { day: "Friday", exercises: ["Full Body: Push-Ups 3x15, Squats 3x15", "Jump Rope 10 min"] },
    { day: "Saturday", exercises: ["Cardio: Cycling 30 min", "Abs: Bicycle Crunch 3x20"] },
    { day: "Sunday", exercises: ["Rest or light activity: Walk / Yoga 30 min"] }
  ],
  maintain: [
    { day: "Monday", exercises: ["Full Body: Moderate Weights 3x12 each muscle", "Stretching 10 min"] },
    { day: "Tuesday", exercises: ["Cardio: Jogging 30 min", "Core: Plank 3x1min"] },
    { day: "Wednesday", exercises: ["Rest or light activity"] },
    { day: "Thursday", exercises: ["Full Body: Moderate Weights 3x12", "Stretching 10 min"] },
    { day: "Friday", exercises: ["Cardio: Swimming or Cycling 30 min"] },
    { day: "Saturday", exercises: ["Full Body: Bodyweight Exercises 3x15"] },
    { day: "Sunday", exercises: ["Rest or light activity"] }
  ]
};

// Plans alimentaires détaillés
const mealPlans = {
  gain: `
    <ul>
      <li><strong>Breakfast (7:00-8:00):</strong> Oatmeal 100g + 3 Eggs + 1 Banana + 1 Glass of Milk</li>
      <li><strong>Snack (10:00-10:30):</strong> Protein Shake + Almonds 20g</li>
      <li><strong>Lunch (12:30-13:30):</strong> Chicken Breast 150g + Brown Rice 100g + Steamed Vegetables 100g</li>
      <li><strong>Snack (16:00):</strong> Greek Yogurt 150g + Honey 1 tsp</li>
      <li><strong>Dinner (19:00-20:00):</strong> Whole Grain Pasta 100g + Tuna 100g + Salad with Olive Oil</li>
      <li><strong>Optional Night Snack:</strong> Cottage Cheese 100g</li>
    </ul>
  `,
  lose: `
    <ul>
      <li><strong>Breakfast (7:00-8:00):</strong> Yogurt 150g + Berries 100g + Green Tea</li>
      <li><strong>Snack (10:00-10:30):</strong> Apple or Pear + Handful of Nuts</li>
      <li><strong>Lunch (12:30-13:30):</strong> Grilled Fish 150g + Steamed Vegetables 150g + Quinoa 80g</li>
      <li><strong>Snack (16:00):</strong> Carrot & Cucumber Sticks + Hummus 2 tbsp</li>
      <li><strong>Dinner (19:00-20:00):</strong> Vegetable Soup + 2 Boiled Eggs</li>
      <li><strong>Optional Night Snack:</strong> Herbal Tea</li>
    </ul>
  `,
  maintain: `
    <ul>
      <li><strong>Breakfast (7:00-8:00):</strong> Whole Wheat Bread 2 slices + Cheese 30g + 1 Egg + Coffee</li>
      <li><strong>Snack (10:00-10:30):</strong> Handful of Nuts + Fruit</li>
      <li><strong>Lunch (12:30-13:30):</strong> Lean Meat 150g + Rice 100g + Vegetables 100g</li>
      <li><strong>Snack (16:00):</strong> Yogurt 150g + Honey 1 tsp</li>
      <li><strong>Dinner (19:00-20:00):</strong> Salad 150g + Boiled Eggs 2 pcs</li>
      <li><strong>Optional Night Snack:</strong> Milk or Herbal Tea</li>
    </ul>
  `
};

// Fonction pour générer HTML du programme
function generateWorkoutHTML(program) {
  let html = "<ul>";
  program.forEach(dayObj => {
    html += `<li><strong>${dayObj.day}:</strong><ul>`;
    dayObj.exercises.forEach(ex => {
      html += `<li>${ex}</li>`;
    });
    html += "</ul></li>";
  });
  html += "</ul>";
  return html;
}

// Gestion du formulaire
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const age = parseInt(document.getElementById('age').value);
  const sex = document.getElementById('sex').value;
  const goal = document.getElementById('goal').value;
  const sessions = parseInt(document.getElementById('sessions').value);

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  summary.innerHTML = `
    <p><strong>Weight:</strong> ${weight} kg | <strong>Height:</strong> ${height} cm | <strong>BMI:</strong> ${bmi}</p>
    <p><strong>Goal:</strong> ${goal === 'gain' ? 'Build Muscle' : goal === 'lose' ? 'Lose Weight' : 'Maintain'}</p>
    <p><strong>Sessions per week:</strong> ${sessions}</p>
  `;

  workoutPlan.innerHTML = generateWorkoutHTML(workoutPrograms[goal]);
  mealPlan.innerHTML = mealPlans[goal];

  // Animation d’affichage
  results.classList.remove('hidden');
  setTimeout(() => results.classList.add('show'), 50);
});
