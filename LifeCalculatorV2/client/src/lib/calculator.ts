import { AppData, UserAnswers, CalculationResults, AnalyzedRiskFactor, Recommendation } from '@/types/calculator';

export const appData: AppData = {
  lifeExpectancyBaselines: {
    "US": { "male": 75.8, "female": 81.1 }
  },
  countries: [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "UK", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "JP", name: "Japan" }
  ],
  riskFactors: {
    smoking: {
      current: { beta: 0.588, hr: 1.80, impact: "-8 to -10 years" },
      former: { beta: 0.223, hr: 1.25, impact: "-3 to -4 years" },
      never: { beta: 0.0, hr: 1.0, impact: "baseline" }
    },
    diabetes: {
      yes: { beta: 0.405, hr: 1.50, impact: "-5 to -7 years" },
      no: { beta: 0.0, hr: 1.0, impact: "baseline" }
    },
    bloodPressure: {
      high: { beta: 0.262, hr: 1.30, impact: "-3 to -4 years" },
      elevated: { beta: 0.182, hr: 1.20, impact: "-1 to -2 years" },
      normal: { beta: 0.0, hr: 1.0, impact: "baseline" }
    },
    bmi: {
      underweight: { beta: 0.588, hr: 1.80, impact: "-6 to -8 years" },
      normal: { beta: 0.0, hr: 1.0, impact: "baseline" },
      overweight: { beta: 0.095, hr: 1.10, impact: "-1 to -2 years" },
      obese: { beta: 0.336, hr: 1.40, impact: "-4 to -5 years" }
    },
    lifestyle: {
      unhealthy: { beta: 0.531, hr: 1.70, impact: "-7 to -12 years" },
      healthy: { beta: 0.0, hr: 1.0, impact: "baseline" }
    },
    familyHistory: {
      yes: { beta: 0.470, hr: 1.60, impact: "-3 to -5 years" },
      no: { beta: 0.0, hr: 1.0, impact: "baseline" }
    },
    circadianDisruption: {
      severe: { beta: 0.405, hr: 1.50, impact: "-4 to -6 years" },
      moderate: { beta: 0.182, hr: 1.20, impact: "-1 to -3 years" },
      none: { beta: 0.0, hr: 1.0, impact: "baseline" }
    }
  },
  heartbeatConstants: {
    totalLifetimeBeats: 3000000000,
    minutesPerYear: 525600
  },
  questions: [
    {
      id: 1,
      field: "birthYear",
      question: "What year were you born?",
      type: "number",
      placeholder: "e.g., 1990",
      validation: "Minimum age requirement: 16 years"
    },
    {
      id: 2,
      field: "sex",
      question: "What is your sex at birth?",
      type: "radio",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" }
      ]
    },
    {
      id: 3,
      field: "restingHeartRate",
      question: "What is your resting heart rate (beats per minute)?",
      type: "number",
      placeholder: "e.g., 70",
      validation: "Normal range: 60-100 BPM. Athletes may have lower rates."
    },
    {
      id: 4,
      field: "lifestyleQuality",
      question: "How would you describe your overall lifestyle?",
      type: "radio",
      options: [
        { value: "healthy", label: "Healthy", description: "Regular exercise, balanced diet, adequate sleep, stress management" },
        { value: "unhealthy", label: "Unhealthy", description: "Sedentary lifestyle, poor diet, inadequate sleep, high stress" }
      ]
    },
    {
      id: 5,
      field: "chronicConditions",
      question: "Do you currently have any chronic medical conditions?",
      type: "checkbox",
      options: [
        { value: "heartDisease", label: "Heart Disease" },
        { value: "cancer", label: "Cancer" },
        { value: "lungDisease", label: "Lung Disease" },
        { value: "kidneyDisease", label: "Kidney Disease" },
        { value: "stroke", label: "Previous Stroke" },
        { value: "none", label: "None of the above" }
      ]
    },
    {
      id: 6,
      field: "familyHistoryPremature",
      question: "Has a parent or sibling died before age 60 from heart disease, stroke, diabetes, or cancer?",
      type: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" }
      ]
    },
    {
      id: 7,
      field: "bmiCategory",
      question: "What is your current body mass index (BMI) category?",
      type: "radio",
      options: [
        { value: "underweight", label: "Underweight (BMI < 18.5)" },
        { value: "normal", label: "Normal (BMI 18.5-24.9)" },
        { value: "overweight", label: "Overweight (BMI 25-29.9)" },
        { value: "obese", label: "Obese (BMI ≥ 30)" }
      ]
    },
    {
      id: 8,
      field: "smokingStatus",
      question: "Do you currently smoke cigarettes?",
      type: "radio",
      options: [
        { value: "never", label: "Never smoked" },
        { value: "former", label: "Former smoker (quit)" },
        { value: "current", label: "Current smoker" }
      ]
    },
    {
      id: 9,
      field: "diabetes",
      question: "Have you been diagnosed with diabetes (Type 1 or Type 2)?",
      type: "radio",
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" }
      ]
    },
    {
      id: 10,
      field: "systolicBP",
      question: "What is your usual systolic blood pressure (mmHg)?",
      type: "number",
      placeholder: "e.g., 120",
      validation: "Normal: <120, Elevated: 120-129, High: ≥130 mmHg"
    },
    {
      id: 11,
      field: "zipCode",
      question: "What is your residential ZIP code?",
      type: "text",
      placeholder: "e.g., 10001",
      validation: "Used for geographic health risk assessment"
    },
    {
      id: 12,
      field: "country",
      question: "In which country do you reside?",
      type: "select"
    },
    {
      id: 13,
      field: "circadianDisruption",
      question: "Do you experience circadian rhythm disruption?",
      type: "radio",
      description: "This is particularly important for musicians, nightclub workers, and shift workers",
      options: [
        { value: "none", label: "No disruption", description: "Regular sleep schedule, normal day/night pattern" },
        { value: "moderate", label: "Moderate disruption", description: "Occasional shift work or irregular schedules" },
        { value: "severe", label: "Severe disruption", description: "Daily night work for 2+ years (musicians, nightclub workers)" }
      ]
    }
  ]
};

export function calculateLifeExpectancy(userAnswers: UserAnswers): CalculationResults {
  const currentYear = new Date().getFullYear();
  const age = currentYear - parseInt(userAnswers.birthYear as string);
  const sex = userAnswers.sex as string;
  const country = userAnswers.country as string || 'US';
  
  // Get baseline life expectancy
  let baseLifeExpectancy = appData.lifeExpectancyBaselines[country]?.[sex as 'male' | 'female'] || appData.lifeExpectancyBaselines.US[sex as 'male' | 'female'];
  
  // Calculate remaining life expectancy at current age
  let remainingYears = baseLifeExpectancy - age;
  
  // Apply risk factors using Cox proportional hazards model
  let totalBeta = 0;
  const appliedRiskFactors: AnalyzedRiskFactor[] = [];
  
  // Smoking
  const smokingStatus = userAnswers.smokingStatus as string;
  if (smokingStatus && smokingStatus !== 'never') {
    const smokingRisk = appData.riskFactors.smoking[smokingStatus];
    totalBeta += smokingRisk.beta;
    appliedRiskFactors.push({
      factor: 'Smoking',
      description: smokingStatus === 'current' ? 'Current smoker' : 'Former smoker',
      impact: smokingRisk.impact,
      severity: smokingStatus === 'current' ? 'high' : 'moderate'
    });
  }
  
  // Diabetes
  if (userAnswers.diabetes === 'yes') {
    const diabetesRisk = appData.riskFactors.diabetes.yes;
    totalBeta += diabetesRisk.beta;
    appliedRiskFactors.push({
      factor: 'Diabetes',
      description: 'Diagnosed with diabetes',
      impact: diabetesRisk.impact,
      severity: 'high'
    });
  }
  
  // Blood Pressure
  const systolicBP = parseInt(userAnswers.systolicBP as string);
  let bpCategory = 'normal';
  if (systolicBP >= 130) {
    bpCategory = 'high';
  } else if (systolicBP >= 120) {
    bpCategory = 'elevated';
  }
  
  if (bpCategory !== 'normal') {
    const bpRisk = appData.riskFactors.bloodPressure[bpCategory];
    totalBeta += bpRisk.beta;
    appliedRiskFactors.push({
      factor: 'Blood Pressure',
      description: `${bpCategory === 'high' ? 'High' : 'Elevated'} blood pressure (${systolicBP} mmHg)`,
      impact: bpRisk.impact,
      severity: bpCategory === 'high' ? 'high' : 'moderate'
    });
  }
  
  // BMI
  const bmiCategory = userAnswers.bmiCategory as string;
  if (bmiCategory && bmiCategory !== 'normal') {
    const bmiRisk = appData.riskFactors.bmi[bmiCategory];
    totalBeta += bmiRisk.beta;
    appliedRiskFactors.push({
      factor: 'Body Mass Index',
      description: `${bmiCategory.charAt(0).toUpperCase() + bmiCategory.slice(1)} BMI`,
      impact: bmiRisk.impact,
      severity: bmiCategory === 'obese' || bmiCategory === 'underweight' ? 'high' : 'moderate'
    });
  }
  
  // Lifestyle
  if (userAnswers.lifestyleQuality === 'unhealthy') {
    const lifestyleRisk = appData.riskFactors.lifestyle.unhealthy;
    totalBeta += lifestyleRisk.beta;
    appliedRiskFactors.push({
      factor: 'Lifestyle',
      description: 'Unhealthy lifestyle patterns',
      impact: lifestyleRisk.impact,
      severity: 'high'
    });
  }
  
  // Family History
  if (userAnswers.familyHistoryPremature === 'yes') {
    const familyRisk = appData.riskFactors.familyHistory.yes;
    totalBeta += familyRisk.beta;
    appliedRiskFactors.push({
      factor: 'Family History',
      description: 'Family history of premature death',
      impact: familyRisk.impact,
      severity: 'moderate'
    });
  }
  
  // Circadian Disruption
  const circadianDisruption = userAnswers.circadianDisruption as string;
  if (circadianDisruption && circadianDisruption !== 'none') {
    const circadianRisk = appData.riskFactors.circadianDisruption[circadianDisruption];
    totalBeta += circadianRisk.beta;
    appliedRiskFactors.push({
      factor: 'Circadian Disruption',
      description: `${circadianDisruption.charAt(0).toUpperCase() + circadianDisruption.slice(1)} circadian disruption`,
      impact: circadianRisk.impact,
      severity: circadianDisruption === 'severe' ? 'high' : 'moderate'
    });
  }
  
  // Apply Cox proportional hazards adjustment
  const hazardRatio = Math.exp(totalBeta);
  const adjustedRemainingYears = remainingYears / hazardRatio;
  
  // Calculate heartbeats
  const restingHeartRate = parseInt(userAnswers.restingHeartRate as string);
  const totalMinutesRemaining = adjustedRemainingYears * appData.heartbeatConstants.minutesPerYear;
  const remainingHeartbeats = Math.round(totalMinutesRemaining * restingHeartRate);
  
  // Calculate confidence intervals (±15%)
  const confidenceMargin = adjustedRemainingYears * 0.15;
  const confidenceLower = Math.max(0, adjustedRemainingYears - confidenceMargin);
  const confidenceUpper = adjustedRemainingYears + confidenceMargin;
  
  return {
    remainingYears: Math.round(adjustedRemainingYears * 10) / 10,
    expectedAge: Math.round((age + adjustedRemainingYears) * 10) / 10,
    confidenceLow: Math.round(confidenceLower * 10) / 10,
    confidenceHigh: Math.round(confidenceUpper * 10) / 10,
    remainingHeartbeats: remainingHeartbeats,
    riskFactors: appliedRiskFactors,
    recommendations: generateRecommendations(userAnswers)
  };
}

function analyzeRiskFactors(userAnswers: UserAnswers): AnalyzedRiskFactor[] {
  const factors: AnalyzedRiskFactor[] = [];
  
  if (userAnswers.smokingStatus === 'current') {
    factors.push({
      factor: 'Current Smoking',
      impact: 'High Risk',
      description: 'Smoking significantly reduces life expectancy',
      severity: 'high'
    });
  }
  
  if (userAnswers.diabetes === 'yes') {
    factors.push({
      factor: 'Diabetes',
      impact: 'Moderate Risk',
      description: 'Diabetes can reduce life expectancy if not well managed',
      severity: 'moderate'
    });
  }
  
  if (userAnswers.bmiCategory === 'obese') {
    factors.push({
      factor: 'Obesity',
      impact: 'Moderate Risk',
      description: 'Obesity increases risk of various health conditions',
      severity: 'moderate'
    });
  }
  
  if (userAnswers.lifestyleQuality === 'unhealthy') {
    factors.push({
      factor: 'Lifestyle Factors',
      impact: 'High Risk',
      description: 'Poor lifestyle choices significantly impact longevity',
      severity: 'high'
    });
  }
  
  return factors;
}

function generateRecommendations(userAnswers: UserAnswers): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  if (userAnswers.smokingStatus === 'current') {
    recommendations.push({
      title: 'Quit Smoking',
      description: 'Smoking cessation is the single most important step to improve your life expectancy.',
      priority: 'high',
      icon: 'smoke_free'
    });
  }
  
  if (userAnswers.lifestyleQuality === 'unhealthy') {
    recommendations.push({
      title: 'Improve Lifestyle',
      description: 'Focus on regular exercise, balanced nutrition, adequate sleep, and stress management.',
      priority: 'high',
      icon: 'fitness_center'
    });
  }
  
  if (userAnswers.bmiCategory === 'obese' || userAnswers.bmiCategory === 'overweight') {
    recommendations.push({
      title: 'Weight Management',
      description: 'Achieving and maintaining a healthy weight reduces disease risk.',
      priority: 'moderate',
      icon: 'monitor_weight'
    });
  }
  
  recommendations.push({
    title: 'Regular Health Checkups',
    description: 'Schedule regular medical checkups for early detection and prevention.',
    priority: 'moderate',
    icon: 'medical_services'
  });
  
  return recommendations;
}

export function validateAnswer(field: string, value: string | number): { isValid: boolean; error?: string } {
  if (!value) {
    return { isValid: false, error: 'Please provide an answer to continue' };
  }
  
  switch (field) {
    case 'birthYear':
      const year = parseInt(value as string);
      const currentYear = new Date().getFullYear();
      const age = currentYear - year;
      
      if (year < 1900 || year > currentYear) {
        return { isValid: false, error: 'Please enter a valid birth year' };
      }
      
      if (age < 16) {
        return { isValid: false, error: 'You must be at least 16 years old to use this calculator' };
      }
      break;
      
    case 'restingHeartRate':
      const rate = parseInt(value as string);
      if (rate < 40 || rate > 150) {
        return { isValid: false, error: 'Please enter a heart rate between 40 and 150 BPM' };
      }
      break;
      
    case 'systolicBP':
      const bp = parseInt(value as string);
      if (bp < 80 || bp > 250) {
        return { isValid: false, error: 'Please enter a blood pressure between 80 and 250 mmHg' };
      }
      break;
  }
  
  return { isValid: true };
}
