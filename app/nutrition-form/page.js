"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import Image from 'next/image';

const ObjectiveCards = ({ selectedItem, setSelectedItem, setCurrentStep }) => {
  const objectives = [
    {
      title: "Perder peso",
      description: "Quemar grasa y definir mi cuerpo",
      icon: "﹀"
    },
    {
      title: "Ganar masa",
      description: "Aumentar músculo y fuerza",
      icon: "︿"
    },
    {
      title: "Mantener salud",
      description: "Equilibrar mi alimentación",
      icon: "‒"
    },
    {
      title: "Mejorar rendimiento",
      description: "Optimizar para deportes",
      icon: "☱"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {objectives.map((obj) => (
        <button
          key={obj.title}
          className={`p-4 border-2 rounded-xl text-left transition-all ${selectedItem === obj.title ? 'border-[#06e96c] bg-[#06e96c]/10' : 'border-gray-200 hover:border-[#06e96c]/50'}`}
          onClick={() => {
            setSelectedItem(obj.title);
            setTimeout(() => setCurrentStep(2), 300);
          }}
        >
          <div className="text-3xl mb-2">{obj.icon}</div>
          <h3 className="font-bold text-lg">{obj.title}</h3>
          <p className="text-sm text-gray-600">{obj.description}</p>
        </button>
      ))}
    </div>
  );
};

const ActivityLevelCards = ({ selectedItem, setSelectedItem, setCurrentStep }) => {
  const activityLevels = [
    {
      title: "Sedentario",
      description: "Poco o ningún ejercicio. Trabajo de oficina.",
      icon: "🛋️"
    },
    {
      title: "Ligero",
      description: "Ejercicio 1-3 días/semana. Actividades ligeras.",
      icon: "🚶‍♂️"
    },
    {
      title: "Moderado",
      description: "Ejercicio 3-5 días/semana. Activo en el trabajo.",
      icon: "🚴‍♂️"
    },
    {
      title: "Activo",
      description: "Ejercicio 6-7 días/semana. Entrenamiento regular.",
      icon: "🏋️‍♂️"
    },
    {
      title: "Muy activo",
      description: "Ejercicio intenso diario. Trabajo físico exigente.",
      icon: "🔥"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {activityLevels.map((level) => (
        <button
          key={level.title}
          className={`p-4 border-2 rounded-xl text-left transition-all flex items-start ${selectedItem === level.title ? 'border-[#06e96c] bg-[#06e96c]/10' : 'border-gray-200 hover:border-[#06e96c]/50'}`}
          onClick={() => {
            setSelectedItem(level.title);
            setTimeout(() => setCurrentStep(3), 300);
          }}
        >
          <div className="text-2xl mr-4">{level.icon}</div>
          <div>
            <h3 className="font-bold text-lg">{level.title}</h3>
            <p className="text-sm text-gray-600">{level.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

const calculateBodyFat = ({ gender, neck, waist, hip, height }) => {
  if (gender === 'male') {
    return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
  }
};

const calculateCalories = ({ gender, age, weight, height, activityLevel }) => {
  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  const activityMultipliers = {
    "Sedentario": 1.2,
    "Ligero": 1.375,
    "Moderado": 1.55,
    "Activo": 1.725,
    "Muy activo": 1.9
  };

  return bmr * (activityMultipliers[activityLevel] || 1.2);
};

export default function NutritionForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    objective: '',
    activityLevel: '',
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    neck: '',
    waist: '',
    hip: '',
    sleepHours: ''
  });

  const [results, setResults] = useState(null);

  const handleBack = () => {
    if (currentStep === 1) {
      router.push('/');
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePlan = () => {
    const bodyFat = calculateBodyFat({
      gender: formData.gender,
      neck: parseFloat(formData.neck),
      waist: parseFloat(formData.waist),
      hip: parseFloat(formData.hip),
      height: parseFloat(formData.height)
    });

    const calories = calculateCalories({
      gender: formData.gender,
      age: parseFloat(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      activityLevel: formData.activityLevel
    });

    let proteinRatio, carbRatio, fatRatio;
    if (formData.objective === "Perder peso") {
      proteinRatio = bodyFat > 25 ? 0.35 : 0.3;
      carbRatio = 0.4;
      fatRatio = 0.25;
    } else if (formData.objective === "Ganar masa") {
      proteinRatio = 0.35;
      carbRatio = 0.45;
      fatRatio = 0.2;
    } else {
      proteinRatio = 0.3;
      carbRatio = 0.5;
      fatRatio = 0.2;
    }

    setResults({
      calories: Math.round(calories),
      bodyFat: bodyFat.toFixed(1),
      protein: Math.round(calories * proteinRatio / 4),
      carbs: Math.round(calories * carbRatio / 4),
      fat: Math.round(calories * fatRatio / 9),
      meals: formData.activityLevel === "Muy activo" ? 6 : 5
    });

    setCurrentStep(4);
  };

  const stepContents = [
    // Step 1 - Objective
    <>
      <h2 className="text-xl text-center mb-6 text-gray-700">¿Qué objetivo quieres alcanzar?</h2>
      <ObjectiveCards 
        selectedItem={formData.objective}
        setSelectedItem={(obj) => setFormData(prev => ({ ...prev, objective: obj }))}
        setCurrentStep={setCurrentStep}
      />
    </>,

    // Step 2 - Activity Level
    <>
      <h2 className="text-xl text-center mb-6 text-gray-700">¿Cómo es tu ritmo de actividad diaria?</h2>
      <ActivityLevelCards 
        selectedItem={formData.activityLevel}
        setSelectedItem={(level) => setFormData(prev => ({ ...prev, activityLevel: level }))}
        setCurrentStep={setCurrentStep}
      />
    </>,

    // Step 3 - Personal Info
    <>
      <h2 className="text-xl text-center mb-6 text-gray-700">Cuéntanos más sobre ti</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Nombre</label>
          <input 
            type="text" 
            name="name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06e96c]"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Género</label>
            <select 
              name="gender"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06e96c]"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Edad</label>
            <input 
              type="number" 
              name="age"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06e96c]"
              placeholder="Tu edad"
              min="12"
              max="120"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Peso (kg)</label>
            <input 
              type="number" 
              name="weight"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06e96c]"
              placeholder="Ej: 68.5"
              min="30"
              max="300"
              step="0.1"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Altura (cm)</label>
            <input 
              type="number" 
              name="height"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06e96c]"
              placeholder="Ej: 175"
              min="100"
              max="250"
              value={formData.height}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Cuello (cm)</label>
            <input 
              type="number" 
              name="neck"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06e96c]"
              placeholder="Ej: 38"
              min="20"
              max="60"
              step="0.1"
              value={formData.neck}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Cintura (cm)</label>
            <input 
              type="number" 
              name="waist"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06e96c]"
              placeholder="Ej: 85"
              min="50"
              max="200"
              step="0.1"
              value={formData.waist}
              onChange={handleInputChange}
              required
            />
          </div>
          {formData.gender === 'female' && (
            <div>
              <label className="block text-gray-700 mb-2">Cadera (cm)</label>
              <input 
                type="number" 
                name="hip"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06e96c]"
                placeholder="Ej: 95"
                min="60"
                max="200"
                step="0.1"
                value={formData.hip}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Horas de sueño por noche</label>
          <input 
            type="number" 
            name="sleepHours"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#06e96c]"
            placeholder="Ej: 7"
            min="4"
            max="12"
            value={formData.sleepHours}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="button"
          onClick={generatePlan}
          className="w-full bg-[#06e96c] text-white py-3 rounded-xl hover:bg-[#05d161] transition-colors mt-4"
        >
          Crear Mi Plan
        </button>
      </div>
    </>
  ];

  const stepTitles = [
    "Tu objetivo",
    "Tu actividad",
    "Tus datos",
    "¡Plan listo!"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffde7] to-[#fcdbb5] p-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-1/2">
        <Image
          src="/EXPLOfruits2.png"
          alt="Frutas decorativas"
          layout="fill"
          objectFit="contain"
          objectPosition="bottom center"
          className="opacity-40"
          priority
        />
      </div>

      <div className="relative z-10">
        <div className="max-w-2xl mx-auto mb-8">
          {currentStep <= 3 && (
            <div className="flex justify-center items-center space-x-2 mb-6">
              <button
                onClick={handleBack}
                className="flex items-center text-[#06e96c] mr-2"
              >
                <span className="text-3xl font-bold">◀</span>
              </button>
              
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => currentStep <= 3 && step <= currentStep && setCurrentStep(step)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step <= currentStep ? 'bg-[#06e96c] text-white' : 'bg-gray-200 text-gray-600'
                    } ${step <= currentStep ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
                    disabled={step > currentStep}
                  >
                    {step}
                  </button>
                  {step < 3 && (
                    <div
                      className={`w-8 h-1 ${
                        step < currentStep ? 'bg-[#06e96c]' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg bg-opacity-90">
          <h1 className="text-3xl font-bold text-[#9c7800] mb-6 text-center">
            {stepTitles[currentStep - 1]}
          </h1>

          {currentStep < 4 ? (
            <div className="space-y-6">
              {stepContents[currentStep - 1]}
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-[#9c7800]">¡Tu plan nutricional está listo!</h2>
              <p className="text-gray-600">Basado en tus respuestas, hemos creado un plan perfecto para ti.</p>
              
              <div className="bg-[#f8f8f8] p-6 rounded-lg text-left space-y-4">
                <h3 className="font-bold text-lg text-[#9c7800] border-b pb-2">Resumen de tu plan</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Calorías diarias</p>
                    <p className="text-xl font-bold">{results?.calories || '2,200'} kcal</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Grasa corporal</p>
                    <p className="text-xl font-bold">{results?.bodyFat || '20'}%</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mt-4 mb-2">Macronutrientes diarios:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Proteínas</p>
                      <p className="text-lg font-bold">{results?.protein || '165'}g</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Carbohidratos</p>
                      <p className="text-lg font-bold">{results?.carbs || '220'}g</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Grasas</p>
                      <p className="text-lg font-bold">{results?.fat || '73'}g</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p><span className="font-semibold">Comidas recomendadas:</span> {results?.meals || '5'} al día</p>
                </div>
              </div>

              <button
                onClick={() => router.push('/')}
                className="w-full bg-[#06e96c] text-white py-3 rounded-xl hover:bg-[#05d161] transition-colors mt-6"
              >
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}