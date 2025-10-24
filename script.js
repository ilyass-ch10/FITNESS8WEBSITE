// Mettre l'année automatiquement
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('userForm');
const results = document.getElementById('results');
const summary = document.getElementById('summary');
const workoutPlan = document.getElementById('workoutPlan');
const mealPlan = document.getElementById('mealPlan');

// IMAGES LOCALES pour chaque exercice
const exerciseImages = {
  "Squats": {
    image: "images/exercises/squats.gif",
    description: "Pieds écartés largeur épaules, descendez comme pour vous asseoir en gardant le dos droit, remontez en poussant sur les talons."
  },
  "Bench Press": {
    image: "images/exercises/bench-press.gif",
    description: "Allongé sur le banc, saisissez la barre plus large que les épaules. Descendez vers la poitrine, puis poussez vers le haut."
  },
  "Pull-Ups": {
    image: "images/exercises/pull-ups.gif",
    description: "Suspendu à la barre, tirez votre corps vers le haut jusqu'au menton au-dessus de la barre. Redescendez lentement."
  },
  "Shoulder Press": {
    image: "images/exercises/shoulder-press.gif",
    description: "Debout ou assis, poussez les haltères au-dessus de la tête jusqu'à extension complète des bras."
  },
  "Deadlifts": {
    image: "images/exercises/deadlifts.webp",
    description: "Dos droit, saisissez la barre. Soulevez en poussant avec les jambes, gardez la barre près du corps."
  },
  "Lunges": {
    image: "images/exercises/lunges.gif",
    description: "Grand pas en avant, descendez jusqu'à ce que le genou arrière touche presque le sol. Poussez pour revenir."
  },
  "Push-Ups": {
    image: "images/exercises/push-ups.gif",
    description: "Position planche, mains sous les épaules. Descendez le corps en gardant le dos droit, remontez."
  },
  "Rows": {
    image: "images/exercises/rows.gif",
    description: "Penché en avant dos droit, tirez la barre vers le torse en contractant les dorsaux."
  },
  "Biceps Curl": {
    image: "images/exercises/biceps-curl.gif",
    description: "Debout, coudes collés au corps, fléchissez les bras pour amener les haltères vers les épaules."
  },
  "Triceps Dips": {
    image: "images/exercises/triceps-dip.gif",
    description: "Sur banc ou barres parallèles, descendez le corps en fléchissant les coudes, remontez."
  },
  "Plank": {
    image: "images/exercises/plank.gif",
    description: "Position planche sur avant-bras, corps gainé et droit. Maintenez la position."
  },
  "Burpees": {
    image: "images/exercises/burpees.gif",
    description: "Squat → Planche → Pompe → Saut → Répétition. Mouvement complet et explosif."
  },
  "Leg Raises": {
    image: "images/exercises/leg-raises.webp",
    description: "Allongé sur le dos, levez les jambes droites vers le plafond, redescendez avec contrôle."
  },
  "Russian Twist": {
    image: "images/exercises/russian-twist.webp",
    description: "Assis, jambes relevées, tournez le torse de gauche à droite en contractant les obliques."
  },
  "Calf Raises": {
    image: "images/exercises/calf-raises.webp",
    description: "Debout, montez sur la pointe des pieds en contractant les mollets, redescendez lentement."
  },
  "Mountain Climbers": {
    image: "images/exercises/mountain-climbers.webp",
    description: "Position planche, ramenez alternativement les genoux vers la poitrine rapidement."
  },
  "Jump Squats": {
    image: "images/exercises/jump-squats.webp",
    description: "Squat suivi d'un saut explosif, atterrissez en douceur et enchaînez."
  },
  "Jumping Jacks": {
    image: "images/exercises/jumping-jacks.webp",
    description: "Sauts avec écarts simultanés des jambes et des bras. Excellent pour le cardio."
  },
  "Running": {
    image: "images/exercises/running.gif",
    description: "Course à pied pour améliorer l'endurance cardiovasculaire et brûler des calories."
  },
  "Cycling": {
    image: "images/exercises/cycling.webp",
    description: "Vélo pour un cardio à faible impact sur les articulations."
  }
};

// Programmes d'entraînement
const programs = {
  gain: {
    1: [["Full Body", ["Squats 4x12", "Bench Press 4x12", "Pull-Ups 3x10", "Shoulder Press 3x12", "Plank 3x1min"]]],
    2: [["Upper Body", ["Bench Press 4x12", "Rows 4x12", "Shoulder Press 3x12", "Biceps Curl 3x15"]], ["Lower Body", ["Squats 4x15", "Deadlifts 3x10", "Lunges 3x15", "Calf Raises 3x20"]]],
    3: [["Chest & Triceps", ["Bench Press 4x12", "Push-Ups 3x15", "Triceps Dips 3x12"]], ["Back & Biceps", ["Pull-Ups 3x10", "Rows 4x12", "Biceps Curl 3x15"]], ["Legs & Shoulders", ["Squats 4x15", "Shoulder Press 3x12", "Lunges 3x15"]]],
    4: [["Chest", ["Bench Press 4x12", "Push-Ups 3x15"]], ["Back", ["Pull-Ups 3x10", "Rows 4x12"]], ["Shoulders", ["Shoulder Press 3x12"]], ["Legs", ["Squats 4x15", "Lunges 3x15"]]],
    5: [["Chest", ["Bench Press 4x12"]], ["Back", ["Pull-Ups 3x10"]], ["Shoulders", ["Shoulder Press 3x12"]], ["Legs", ["Squats 4x15"]], ["Arms", ["Biceps Curl 3x15", "Triceps Dips 3x12"]]],
    6: [["Chest", ["Bench Press 4x12"]], ["Back", ["Pull-Ups 3x10"]], ["Shoulders", ["Shoulder Press 3x12"]], ["Legs", ["Squats 4x15"]], ["Arms", ["Biceps Curl 3x15"]], ["Cardio", ["Running 30min"]]],
    7: [["Chest", ["Bench Press 4x12"]], ["Back", ["Pull-Ups 3x10"]], ["Shoulders", ["Shoulder Press 3x12"]], ["Legs", ["Squats 4x15"]], ["Arms", ["Biceps Curl 3x15"]], ["Core", ["Plank 3x1min", "Leg Raises 3x15"]], ["Rest", ["Recovery Day"]]]
  },
  lose: {
    1: [["Full Body HIIT", ["Burpees 4x15", "Jump Squats 3x20", "Push-Ups 3x15", "Plank 3x1min"]]],
    2: [["Cardio & Core", ["Running 30min", "Plank 3x1min", "Mountain Climbers 3x30"]], ["Full Body", ["Squats 3x15", "Push-Ups 3x15", "Lunges 3x15"]]],
    3: [["HIIT", ["Burpees 4x15", "Jumping Jacks 3x30"]], ["Strength", ["Squats 3x15", "Push-Ups 3x15"]], ["Cardio", ["Running 40min"]]],
    4: [["HIIT", ["Burpees 4x15"]], ["Upper Body", ["Push-Ups 3x15", "Rows 3x15"]], ["Lower Body", ["Squats 3x15", "Lunges 3x15"]], ["Cardio", ["Cycling 45min"]]],
    5: [["HIIT", ["Burpees 4x15"]], ["Full Body", ["Squats 3x15", "Push-Ups 3x15"]], ["Cardio", ["Running 45min"]], ["HIIT", ["Jumping Jacks 4x30"]], ["Core", ["Plank 3x1min", "Russian Twist 3x20"]]],
    6: [["HIIT", ["Burpees 4x15"]], ["Strength", ["Squats 3x15", "Push-Ups 3x15"]], ["Cardio", ["Running 40min"]], ["HIIT", ["Jumping Jacks 4x30"]], ["Full Body", ["Squats 3x15", "Push-Ups 3x15"]], ["Recovery", ["Walking 60min"]]],
    7: [["HIIT", ["Burpees 4x15"]], ["Strength", ["Squats 3x15", "Push-Ups 3x15"]], ["Cardio", ["Running 45min"]], ["HIIT", ["Jumping Jacks 4x30"]], ["Full Body", ["Squats 3x15", "Push-Ups 3x15"]], ["Cardio", ["Cycling 40min"]], ["Recovery", ["Yoga 30min"]]]
  },
  maintain: {
    1: [["Full Body", ["Squats 3x12", "Push-Ups 3x12", "Rows 3x12", "Plank 3x1min"]]],
    2: [["Strength", ["Squats 3x12", "Push-Ups 3x12"]], ["Cardio", ["Running 30min", "Plank 3x1min"]]],
    3: [["Full Body", ["Squats 3x12", "Push-Ups 3x12", "Rows 3x12"]], ["Cardio", ["Running 35min"]], ["Maintenance", ["Bodyweight 3x15", "Plank 3x1min"]]],
    4: [["Upper Body", ["Push-Ups 3x12", "Rows 3x12"]], ["Lower Body", ["Squats 3x12", "Lunges 3x12"]], ["Cardio", ["Cycling 40min"]], ["Core", ["Plank 3x1min", "Leg Raises 3x15"]]],
    5: [["Strength", ["Squats 3x12", "Push-Ups 3x12"]], ["Cardio", ["Running 35min"]], ["Maintenance", ["Bodyweight 3x15"]], ["Cardio", ["Cycling 35min"]], ["Recovery", ["Walking 45min"]]],
    6: [["Strength", ["Squats 3x12", "Push-Ups 3x12"]], ["Cardio", ["Running 35min"]], ["Maintenance", ["Bodyweight 3x15"]], ["Cardio", ["Cycling 35min"]], ["Light", ["Lunges 3x12", "Push-Ups 3x12"]], ["Recovery", ["Walking 60min"]]],
    7: [["Strength", ["Squats 3x12", "Push-Ups 3x12"]], ["Cardio", ["Running 30min"]], ["Maintenance", ["Bodyweight 3x15"]], ["Cardio", ["Cycling 30min"]], ["Light", ["Lunges 3x12", "Push-Ups 3x12"]], ["Recovery", ["Walking 45min"]], ["Rest", ["Complete Rest"]]]
  }
};

// Plans alimentaires
const meals = {
  gain: `
    <div class="meal-plan-content">
      <div class="meal-section">
        <h3>🍳 Petit-déjeuner</h3>
        <ul>
          <li>Œufs (2-3)</li>
          <li>Pain complet</li>
          <li>Lait 250ml</li>
          <li>Banane</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🥛 Collation</h3>
        <ul>
          <li>Shaker protéiné</li>
          <li>Amandes 20g</li>
          <li>Fruit frais</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🍗 Déjeuner</h3>
        <ul>
          <li>Poulet 150g</li>
          <li>Riz complet 100g</li>
          <li>Légumes vapeur</li>
          <li>Huile d'olive</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🥤 Après-training</h3>
        <ul>
          <li>Yaourt grec 150g</li>
          <li>Miel</li>
          <li>Fruits secs 30g</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🐟 Dîner</h3>
        <ul>
          <li>Pâtes 100g</li>
          <li>Thon 100g</li>
          <li>Salade</li>
          <li>Fromage blanc</li>
        </ul>
      </div>
    </div>
  `,
  lose: `
    <div class="meal-plan-content">
      <div class="meal-section">
        <h3>🍳 Petit-déjeuner</h3>
        <ul>
          <li>Yaourt 150g</li>
          <li>Baies 100g</li>
          <li>Thé vert</li>
          <li>1 fruit frais</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🥗 Collation</h3>
        <ul>
          <li>Pomme ou poire</li>
          <li>Poignée de noix</li>
          <li>Eau abondante</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🐟 Déjeuner</h3>
        <ul>
          <li>Poisson 150g</li>
          <li>Légumes 150g</li>
          <li>Quinoa 80g</li>
          <li>Salade verte</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🥒 Collation</h3>
        <ul>
          <li>Carotte/concombre</li>
          <li>Hoummos 2 cuillères</li>
          <li>Thé vert</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🍲 Dîner</h3>
        <ul>
          <li>Soupe légumes</li>
          <li>2 œufs durs</li>
          <li>Salade verte</li>
          <li>Pas de féculents</li>
        </ul>
      </div>
    </div>
  `,
  maintain: `
    <div class="meal-plan-content">
      <div class="meal-section">
        <h3>🍳 Petit-déjeuner</h3>
        <ul>
          <li>Pain complet 2 tranches</li>
          <li>Fromage 30g</li>
          <li>1 œuf</li>
          <li>Café</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🥜 Collation</h3>
        <ul>
          <li>Poignée de noix</li>
          <li>Fruit frais</li>
          <li>Eau</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🍗 Déjeuner</h3>
        <ul>
          <li>Viande 150g</li>
          <li>Riz 100g</li>
          <li>Légumes 100g</li>
          <li>Yaourt nature</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🥛 Collation</h3>
        <ul>
          <li>Yaourt 150g</li>
          <li>Miel 1 cuillère</li>
          <li>Fruit</li>
        </ul>
      </div>
      <div class="meal-section">
        <h3>🥗 Dîner</h3>
        <ul>
          <li>Salade 150g</li>
          <li>2 œufs durs</li>
          <li>Légumes grillés</li>
          <li>Fromage blanc</li>
        </ul>
      </div>
    </div>
  `
};

const goalText = {
  gain: 'Prendre du muscle', 
  lose: 'Perdre du poids', 
  maintain: 'Maintenir'
};

// Fonction pour calculer les calories
function calculateCalories(w, h, a, s, g, sess) {
  let bmr = (10 * w) + (6.25 * h) - (5 * a) + (s === 'male' ? 5 : -161);
  const activityFactors = {1:1.2, 2:1.375, 3:1.55, 4:1.725, 5:1.9, 6:2.0, 7:2.2};
  const activityFactor = activityFactors[sess] || 1.55;
  
  let maintenanceCalories = Math.round(bmr * activityFactor);
  let targetCalories = maintenanceCalories + {gain:300, lose:-500, maintain:0}[g];
  
  return {
    bmr: Math.round(bmr),
    maintenance: maintenanceCalories,
    target: targetCalories,
    protein: Math.round(w * 1.8),
    carbs: Math.round(targetCalories * 0.5 / 4),
    fat: Math.round(targetCalories * 0.25 / 9)
  };
}

// Créer la modal pour les images
function createExerciseModal() {
  const modal = document.createElement('div');
  modal.className = 'exercise-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <h3 class="exercise-name-modal" id="modalExerciseName"></h3>
      <div class="exercise-image-container">
        <img class="exercise-image" id="modalExerciseImage" src="" alt="Exercise demonstration" onerror="this.src='https://via.placeholder.com/400x300/00ffb3/1a1a1a?text=Image+Non+Disponible'">
      </div>
      <p class="exercise-description" id="modalExerciseDescription"></p>
    </div>
  `;
  document.body.appendChild(modal);

  // Fermer la modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-close')) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });

  return modal;
}

const exerciseModal = createExerciseModal();

// Afficher l'image de l'exercice
function showExerciseImage(exerciseName) {
  const exerciseData = exerciseImages[exerciseName];
  if (exerciseData) {
    document.getElementById('modalExerciseName').textContent = exerciseName;
    document.getElementById('modalExerciseImage').src = exerciseData.image;
    document.getElementById('modalExerciseDescription').textContent = exerciseData.description;
    exerciseModal.classList.add('active');
  } else {
    // Fallback pour exercices non trouvés
    document.getElementById('modalExerciseName').textContent = exerciseName;
    document.getElementById('modalExerciseImage').src = "https://via.placeholder.com/400x300/00ffb3/1a1a1a?text=Image+Non+Disponible";
    document.getElementById('modalExerciseDescription').textContent = "Exercice de musculation - exécutez avec contrôle et bonne forme.";
    exerciseModal.classList.add('active');
  }
}

// Extraire le nom de l'exercice
function extractExerciseName(fullText) {
  return fullText.replace(/\s*\d+x\d+\s*/, '')
                .replace(/\s*\d+min\s*/, '')
                .replace(/\s*\d+sec\s*/, '')
                .replace(/\s*\d+\s*/, '')
                .trim();
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
  const calories = calculateCalories(weight, height, age, sex, goal, sessions);

  // Afficher le résumé
  summary.innerHTML = `
    <div class="calories-summary">
      <p><strong>Poids:</strong> ${weight} kg | <strong>Taille:</strong> ${height} cm | <strong>IMC:</strong> ${bmi}</p>
      <p><strong>Objectif:</strong> ${goalText[goal]} | <strong>Séances/semaine:</strong> ${sessions}</p>
      <div class="calories-box">
        <h4>📊 BESOINS CALORIQUES</h4>
        <p><strong>Métabolisme de base:</strong> ${calories.bmr} kcal/jour</p>
        <p><strong>Maintenance:</strong> ${calories.maintenance} kcal/jour</p>
        <p><strong>Objectif ${goalText[goal]}:</strong> <span class="highlight">${calories.target} kcal/jour</span></p>
        <p><strong>Protéines:</strong> ${calories.protein}g | <strong>Glucides:</strong> ${calories.carbs}g | <strong>Lipides:</strong> ${calories.fat}g</p>
      </div>
    </div>
  `;

  // Générer le programme d'entraînement
  const workoutProgram = programs[goal][sessions] || programs[goal][3];
  
  workoutPlan.innerHTML = `
    <div class="workout-plan">
      ${workoutProgram.map(day => `
        <div class="workout-day">
          <h3 class="workout-day-title">${day[0]}</h3>
          <ul class="exercise-list">
            ${day[1].map(ex => `
              <li class="exercise-item" data-exercise="${extractExerciseName(ex)}">
                <span class="exercise-text">${ex}</span>
                <button class="exercise-btn" title="Voir la démonstration">
                  <span class="exercise-icon">🖼️</span>
                  Voir
                </button>
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  `;

  // Ajouter les événements de clic pour les exercices
  const exerciseBtns = workoutPlan.querySelectorAll('.exercise-btn');
  exerciseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const exerciseItem = btn.closest('.exercise-item');
      const exerciseName = exerciseItem.getAttribute('data-exercise');
      showExerciseImage(exerciseName);
    });
  });

  // Afficher le plan alimentaire
  mealPlan.innerHTML = meals[goal];
  
  // Afficher les résultats
  results.classList.remove('hidden');
  setTimeout(() => {
    results.classList.add('show');
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
});