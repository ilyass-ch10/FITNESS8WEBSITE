document.getElementById('year').textContent = new Date().getFullYear();
const form = document.getElementById('userForm'), results = document.getElementById('results'), summary = document.getElementById('summary'), workoutPlan = document.getElementById('workoutPlan'), mealPlan = document.getElementById('mealPlan');

const programs = {
  gain: {
    1: [["Full Body", ["Squats 4x12", "Bench Press 4x12", "Pull-Ups 3x10", "Shoulder Press 3x12", "Plank 3x1min"]]],
    2: [["Lundi - Upper", ["Bench Press 4x12", "Rows 4x12", "Shoulder Press 3x12", "Biceps Curl 3x15", "Triceps Dips 3x12"]], ["Jeudi - Lower", ["Squats 4x15", "Deadlifts 3x10", "Lunges 3x15", "Calf Raises 3x20", "Leg Raises 3x15"]]],
    3: [["Lundi - Chest & Tris", ["Bench Press 4x12", "Incline Press 3x12", "Chest Flyes 3x15", "Triceps Dips 3x12", "Skull Crushers 3x15"]], ["Mercredi - Back & Bis", ["Pull-Ups 3x10", "Rows 4x12", "Lat Pulldowns 3x12", "Biceps Curl 3x15", "Hammer Curl 3x15"]], ["Vendredi - Legs & Shoulders", ["Squats 4x15", "Shoulder Press 3x12", "Lunges 3x15", "Lateral Raises 3x15", "Calf Raises 3x20"]]],
    4: [["Lundi - Chest", ["Bench Press 4x12", "Incline Dumbbell Press 3x12", "Cable Flyes 3x15", "Push-Ups 3x20"]], ["Mardi - Back", ["Deadlifts 3x10", "Pull-Ups 3x10", "Rows 4x12", "Face Pulls 3x15"]], ["Jeudi - Shoulders & Arms", ["Shoulder Press 3x12", "Lateral Raises 3x15", "Biceps Curl 3x15", "Triceps Extensions 3x15"]], ["Vendredi - Legs", ["Squats 4x15", "Leg Press 3x15", "Lunges 3x15", "Calf Raises 3x20"]]],
    5: [["Lundi - Chest", ["Bench Press 4x12", "Incline Press 3x12", "Dips 3x12", "Cable Crossovers 3x15"]], ["Mardi - Back", ["Pull-Ups 3x10", "Rows 4x12", "Lat Pulldowns 3x12", "Hyperextensions 3x15"]], ["Mercredi - Shoulders", ["Shoulder Press 3x12", "Lateral Raises 3x15", "Front Raises 3x15", "Shrugs 3x15"]], ["Jeudi - Legs", ["Squats 4x15", "Leg Curls 3x15", "Leg Extensions 3x15", "Calf Raises 3x20"]], ["Vendredi - Arms & Core", ["Biceps Curl 3x15", "Triceps Dips 3x12", "Hammer Curl 3x15", "Plank 3x1min", "Leg Raises 3x15"]]],
    6: [["Lundi - Chest & Tris", ["Bench Press 4x12", "Incline Press 3x12", "Cable Flyes 3x15", "Triceps Dips 3x12", "Push-Ups 3x20"]], ["Mardi - Back & Bis", ["Pull-Ups 3x10", "Rows 4x12", "Lat Pulldowns 3x12", "Biceps Curl 3x15", "Cable Rows 3x12"]], ["Mercredi - Legs", ["Squats 4x15", "Leg Press 3x15", "Lunges 3x15", "Calf Raises 3x20", "Leg Curls 3x15"]], ["Jeudi - Shoulders", ["Shoulder Press 3x12", "Lateral Raises 3x15", "Front Raises 3x15", "Face Pulls 3x15"]], ["Vendredi - Arms & Core", ["Biceps Curl 3x15", "Triceps Extensions 3x15", "Hammer Curl 3x15", "Plank 3x1min", "Russian Twist 3x20"]], ["Samedi - Cardio", ["Running 30min", "Cycling 20min", "Stretching 15min"]]],
    7: [["Lundi - Chest", ["Bench Press 4x12", "Incline Press 3x12", "Cable Flyes 3x15", "Dips 3x12"]], ["Mardi - Back", ["Pull-Ups 3x10", "Rows 4x12", "Lat Pulldowns 3x12", "Hyperextensions 3x15"]], ["Mercredi - Shoulders", ["Shoulder Press 3x12", "Lateral Raises 3x15", "Front Raises 3x15", "Shrugs 3x15"]], ["Jeudi - Legs", ["Squats 4x15", "Leg Press 3x15", "Lunges 3x15", "Calf Raises 3x20"]], ["Vendredi - Arms", ["Biceps Curl 3x15", "Triceps Dips 3x12", "Hammer Curl 3x15", "Skull Crushers 3x15"]], ["Samedi - Core & Cardio", ["Plank 3x1min", "Leg Raises 3x15", "Running 30min", "Jump Rope 10min"]], ["Dimanche - Recovery", ["Yoga 30min", "Stretching 15min", "Walk 30min"]]]
  },
  lose: {
    1: [["Full Body HIIT", ["Burpees 4x15", "Jump Squats 3x20", "Mountain Climbers 3x30", "Push-Ups 3x15", "Plank 3x1min"]]],
    2: [["Lundi - Cardio & Core", ["Running 30min", "Jumping Jacks 3x50", "Plank 3x1min", "Bicycle Crunch 3x20"]], ["Jeudi - Full Body", ["Squats 3x15", "Push-Ups 3x15", "Lunges 3x15", "Rows 3x15", "Leg Raises 3x15"]]],
    3: [["Lundi - HIIT", ["Burpees 4x15", "Jump Squats 3x20", "Mountain Climbers 3x30"]], ["Mercredi - Strength", ["Squats 3x15", "Push-Ups 3x15", "Rows 3x15", "Lunges 3x15", "Plank 3x1min"]], ["Vendredi - Cardio", ["Running 40min", "Jump Rope 15min", "Stretching 10min"]]],
    4: [["Lundi - HIIT", ["Burpees 4x15", "Jump Squats 3x20", "Mountain Climbers 3x30"]], ["Mardi - Upper", ["Push-Ups 3x15", "Rows 3x15", "Shoulder Press 3x12", "Triceps Dips 3x12"]], ["Jeudi - Lower", ["Squats 3x15", "Lunges 3x15", "Glute Bridges 3x15", "Calf Raises 3x20"]], ["Vendredi - Cardio", ["Cycling 45min", "Jump Rope 10min"]]],
    5: [["Lundi - HIIT", ["Burpees 4x15", "Jump Squats 3x20", "Mountain Climbers 3x30"]], ["Mardi - Full Body", ["Squats 3x15", "Push-Ups 3x15", "Rows 3x15", "Lunges 3x15"]], ["Mercredi - Cardio", ["Running 45min", "Stretching 10min"]], ["Jeudi - HIIT", ["Jumping Jacks 4x30", "High Knees 3x30", "Plank 3x1min"]], ["Vendredi - Core", ["Plank 3x1min", "Leg Raises 3x15", "Russian Twist 3x20", "Yoga 20min"]]],
    6: [["Lundi - HIIT", ["Burpees 4x15", "Jump Squats 3x20", "Mountain Climbers 3x30"]], ["Mardi - Strength", ["Squats 3x15", "Push-Ups 3x15", "Rows 3x15", "Lunges 3x15"]], ["Mercredi - Cardio", ["Running 40min", "Jump Rope 10min"]], ["Jeudi - HIIT", ["Jumping Jacks 4x30", "High Knees 3x30", "Plank 3x1min"]], ["Vendredi - Full Body", ["Squats 3x15", "Push-Ups 3x15", "Rows 3x15", "Leg Raises 3x15"]], ["Samedi - Recovery", ["Walking 60min", "Stretching 15min"]]],
    7: [["Lundi - HIIT", ["Burpees 4x15", "Jump Squats 3x20", "Mountain Climbers 3x30"]], ["Mardi - Strength", ["Squats 3x15", "Push-Ups 3x15", "Rows 3x15", "Lunges 3x15"]], ["Mercredi - Cardio", ["Running 45min"]], ["Jeudi - HIIT", ["Jumping Jacks 4x30", "High Knees 3x30", "Plank 3x1min"]], ["Vendredi - Full Body", ["Squats 3x15", "Push-Ups 3x15", "Rows 3x15", "Leg Raises 3x15"]], ["Samedi - Cardio", ["Cycling 40min", "Jump Rope 10min"]], ["Dimanche - Recovery", ["Yoga 30min", "Walking 30min"]]]
  },
  maintain: {
    1: [["Full Body", ["Squats 3x12", "Push-Ups 3x12", "Rows 3x12", "Plank 3x1min", "Stretching 10min"]]],
    2: [["Lundi - Strength", ["Squats 3x12", "Push-Ups 3x12", "Rows 3x12", "Shoulder Press 3x12"]], ["Jeudi - Cardio", ["Running 30min", "Plank 3x1min", "Leg Raises 3x15", "Stretching 10min"]]],
    3: [["Lundi - Full Body", ["Squats 3x12", "Push-Ups 3x12", "Rows 3x12", "Lunges 3x12"]], ["Mercredi - Cardio", ["Running 35min", "Jump Rope 10min"]], ["Vendredi - Maintenance", ["Bodyweight 3x15", "Plank 3x1min", "Stretching 15min"]]],
    4: [["Lundi - Upper", ["Push-Ups 3x12", "Rows 3x12", "Shoulder Press 3x12", "Triceps Dips 3x12"]], ["Mardi - Lower", ["Squats 3x12", "Lunges 3x12", "Glute Bridges 3x15", "Calf Raises 3x15"]], ["Jeudi - Cardio", ["Cycling 40min", "Stretching 10min"]], ["Vendredi - Core", ["Plank 3x1min", "Leg Raises 3x15", "Yoga 20min"]]],
    5: [["Lundi - Strength", ["Squats 3x12", "Push-Ups 3x12", "Rows 3x12", "Shoulder Press 3x12"]], ["Mardi - Cardio", ["Running 35min"]], ["Mercredi - Maintenance", ["Bodyweight 3x15", "Plank 3x1min"]], ["Jeudi - Cardio", ["Cycling 35min", "Jump Rope 10min"]], ["Vendredi - Recovery", ["Walking 45min", "Stretching 15min"]]],
    6: [["Lundi - Strength", ["Squats 3x12", "Push-Ups 3x12", "Rows 3x12"]], ["Mardi - Cardio", ["Running 35min"]], ["Mercredi - Maintenance", ["Bodyweight 3x15", "Plank 3x1min"]], ["Jeudi - Cardio", ["Cycling 35min"]], ["Vendredi - Light", ["Lunges 3x12", "Push-Ups 3x12", "Rows 3x12"]], ["Samedi - Recovery", ["Walking 60min", "Yoga 20min"]]],
    7: [["Lundi - Strength", ["Squats 3x12", "Push-Ups 3x12", "Rows 3x12"]], ["Mardi - Cardio", ["Running 30min"]], ["Mercredi - Maintenance", ["Bodyweight 3x15", "Plank 3x1min"]], ["Jeudi - Cardio", ["Cycling 30min"]], ["Vendredi - Light", ["Lunges 3x12", "Push-Ups 3x12", "Rows 3x12"]], ["Samedi - Recovery", ["Walking 45min", "Stretching 15min"]], ["Dimanche - Rest", ["Complete Rest"]]]
  }
};

const meals = {
  gain: `<div class="meal-plan-content"><div class="meal-time"><h4>🍳 Petit-déjeuner</h4><ul><li>Œufs (2-3)</li><li>Pain complet 80g</li><li>Banane</li><li>Lait 250ml</li></ul></div><div class="meal-time"><h4>🥛 Collation</h4><ul><li>Shaker protéiné</li><li>Amandes 20g</li><li>Fruit</li></ul></div><div class="meal-time"><h4>🍗 Déjeuner</h4><ul><li>Poulet 150g</li><li>Riz complet 100g</li><li>Légumes vapeur</li></ul></div><div class="meal-time"><h4>🥤 Après-training</h4><ul><li>Yaourt grec 150g</li><li>Miel</li><li>Fruits secs 30g</li></ul></div><div class="meal-time"><h4>🐟 Dîner</h4><ul><li>Pâtes 100g</li><li>Thon 100g</li><li>Salade</li></ul></div></div>`,
  lose: `<div class="meal-plan-content"><div class="meal-time"><h4>🍳 Petit-déjeuner</h4><ul><li>Yaourt 150g</li><li>Baies 100g</li><li>Thé vert</li><li>Fruit</li></ul></div><div class="meal-time"><h4>🥗 Collation</h4><ul><li>Pomme/poire</li><li>Noix</li><li>Eau</li></ul></div><div class="meal-time"><h4>🐟 Déjeuner</h4><ul><li>Poisson 150g</li><li>Légumes 150g</li><li>Quinoa 80g</li></ul></div><div class="meal-time"><h4>🥒 Collation</h4><ul><li>Carotte/concombre</li><li>Hoummos</li><li>Thé vert</li></ul></div><div class="meal-time"><h4>🍲 Dîner</h4><ul><li>Soupe légumes</li><li>2 œufs durs</li><li>Salade</li></ul></div></div>`,
  maintain: `<div class="meal-plan-content"><div class="meal-time"><h4>🍳 Petit-déjeuner</h4><ul><li>Pain complet</li><li>Fromage 30g</li><li>Œuf</li><li>Café</li></ul></div><div class="meal-time"><h4>🥜 Collation</h4><ul><li>Noix</li><li>Fruit</li><li>Eau</li></ul></div><div class="meal-time"><h4>🍗 Déjeuner</h4><ul><li>Viande 150g</li><li>Riz 100g</li><li>Légumes</li></ul></div><div class="meal-time"><h4>🥛 Collation</h4><ul><li>Yaourt 150g</li><li>Miel</li><li>Fruit</li></ul></div><div class="meal-time"><h4>🥗 Dîner</h4><ul><li>Salade 150g</li><li>2 œufs durs</li><li>Légumes grillés</li></ul></div></div>`
};

const goalText = {gain: 'Prendre du muscle', lose: 'Perdre du poids', maintain: 'Maintenir'};

function calculateCalories(w, h, a, s, g, sess) {
  let bmr = (10 * w) + (6.25 * h) - (5 * a) + (s === 'male' ? 5 : -161);
  const af = {1:1.2,2:1.375,3:1.55,4:1.725,5:1.9,6:2.0,7:2.2}[sess]||1.55;
  let maint = Math.round(bmr * af);
  let target = maint + {gain:300,lose:-500,maintain:0}[g];
  return {
    bmr: Math.round(bmr),
    maintenance: maint,
    target: target,
    protein: Math.round(w * 1.8),
    carbs: Math.round(target * 0.5 / 4),
    fat: Math.round(target * 0.25 / 9)
  };
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const w = parseFloat(document.getElementById('weight').value);
  const h = parseFloat(document.getElementById('height').value);
  const a = parseInt(document.getElementById('age').value);
  const s = document.getElementById('sex').value;
  const g = document.getElementById('goal').value;
  const sess = parseInt(document.getElementById('sessions').value);

  const bmi = (w / ((h / 100) ** 2)).toFixed(1);
  const cals = calculateCalories(w, h, a, s, g, sess);

  summary.innerHTML = `<div class="calories-summary"><p><strong>Poids:</strong> ${w} kg | <strong>Taille:</strong> ${h} cm | <strong>IMC:</strong> ${bmi}</p><p><strong>Objectif:</strong> ${goalText[g]} | <strong>Séances:</strong> ${sess}</p><div class="calories-box"><h4>📊 CALORIES</h4><p><strong>Métabolisme:</strong> ${cals.bmr} kcal</p><p><strong>Maintenance:</strong> ${cals.maintenance} kcal</p><p><strong>Objectif:</strong> <span class="highlight">${cals.target} kcal/jour</span></p><p><strong>Protéines:</strong> ${cals.protein}g | <strong>Glucides:</strong> ${cals.carbs}g | <strong>Lipides:</strong> ${cals.fat}g</p></div></div>`;

  const wp = programs[g][sess] || programs[g][3];
  workoutPlan.innerHTML = `<ul>${wp.map(day => `<li><strong>${day[0]}:</strong><ul>${day[1].map(ex => `<li>${ex}</li>`).join('')}</ul></li>`).join('')}</ul>`;

  mealPlan.innerHTML = meals[g];
  results.classList.remove('hidden');
  setTimeout(() => results.classList.add('show'), 50);
});