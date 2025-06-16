import { UserAnswers, CalculationResults } from '@/types/calculator';

interface SavedProgress {
  currentQuestionIndex: number;
  userAnswers: UserAnswers;
  timestamp: number;
}

interface SavedResults {
  results: CalculationResults;
  userAnswers: UserAnswers;
  timestamp: number;
}

export function saveProgress(currentQuestionIndex: number, userAnswers: UserAnswers): void {
  const data: SavedProgress = {
    currentQuestionIndex,
    userAnswers,
    timestamp: Date.now()
  };
  
  localStorage.setItem('lifeCalc_progress', JSON.stringify(data));
}

export function loadSavedProgress(): SavedProgress | null {
  const saved = localStorage.getItem('lifeCalc_progress');
  if (!saved) return null;
  
  try {
    const data: SavedProgress = JSON.parse(saved);
    // Only load if saved within last 24 hours
    if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
      return data;
    }
  } catch (error) {
    console.error('Error loading saved progress:', error);
  }
  
  return null;
}

export function saveResults(results: CalculationResults, userAnswers: UserAnswers): void {
  const data: SavedResults = {
    results,
    userAnswers,
    timestamp: Date.now()
  };
  
  localStorage.setItem('lifeCalc_results', JSON.stringify(data));
}

export function loadSavedResults(): SavedResults | null {
  const saved = localStorage.getItem('lifeCalc_results');
  if (!saved) return null;
  
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error('Error loading saved results:', error);
    return null;
  }
}

export function clearProgress(): void {
  localStorage.removeItem('lifeCalc_progress');
}

export function exportResults(results: CalculationResults): void {
  // Create a comprehensive HTML document for PDF conversion
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Life Expectancy Assessment Results</title>
      <style>
        body {
          font-family: 'Roboto', Arial, sans-serif;
          margin: 0;
          padding: 40px;
          background: white;
          color: #333;
          line-height: 1.6;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 2px solid #1976d2;
          padding-bottom: 20px;
        }
        .header h1 {
          color: #1976d2;
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .header p {
          color: #666;
          margin: 10px 0 0 0;
          font-size: 16px;
        }
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .result-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #1976d2;
        }
        .result-card h3 {
          margin: 0 0 8px 0;
          color: #1976d2;
          font-size: 14px;
          text-transform: uppercase;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        .result-card .value {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }
        .result-card .unit {
          color: #666;
          font-size: 14px;
          margin-top: 4px;
        }
        .section {
          margin-bottom: 40px;
        }
        .section h2 {
          color: #1976d2;
          font-size: 20px;
          margin: 0 0 20px 0;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 8px;
        }
        .risk-factor, .recommendation {
          background: #f8f9fa;
          padding: 16px;
          margin-bottom: 12px;
          border-radius: 6px;
          border-left: 4px solid #ff9800;
        }
        .risk-factor.high {
          border-left-color: #f44336;
        }
        .risk-factor.moderate {
          border-left-color: #ff9800;
        }
        .risk-factor.low {
          border-left-color: #4caf50;
        }
        .recommendation {
          border-left-color: #4caf50;
        }
        .risk-factor h4, .recommendation h4 {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
        }
        .risk-factor p, .recommendation p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
        .confidence-range {
          background: #e3f2fd;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 30px;
        }
        .confidence-range h3 {
          margin: 0 0 15px 0;
          color: #1976d2;
        }
        .range-display {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 400px;
          margin: 0 auto;
        }
        .range-value {
          font-weight: 700;
          font-size: 18px;
        }
        .range-bar {
          flex: 1;
          height: 8px;
          background: #ddd;
          margin: 0 20px;
          border-radius: 4px;
          position: relative;
        }
        .range-bar::after {
          content: '';
          position: absolute;
          left: 20%;
          width: 60%;
          height: 100%;
          background: linear-gradient(to right, #4caf50, #1976d2);
          border-radius: 4px;
        }
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        @media print {
          body { padding: 20px; }
          .header { margin-bottom: 30px; }
          .section { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Life Expectancy Assessment Results</h1>
        <p>Generated on ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>

      <div class="results-grid">
        <div class="result-card">
          <h3>Remaining Life Expectancy</h3>
          <div class="value">${results.remainingYears}</div>
          <div class="unit">years remaining</div>
        </div>
        <div class="result-card">
          <h3>Expected Age</h3>
          <div class="value">${results.expectedAge}</div>
          <div class="unit">years old</div>
        </div>
        <div class="result-card">
          <h3>Remaining Heartbeats</h3>
          <div class="value">${results.remainingHeartbeats.toLocaleString()}</div>
          <div class="unit">estimated beats</div>
        </div>
      </div>

      <div class="confidence-range">
        <h3>95% Confidence Interval</h3>
        <div class="range-display">
          <div class="range-value">${results.confidenceLow} years</div>
          <div class="range-bar"></div>
          <div class="range-value">${results.confidenceHigh} years</div>
        </div>
        <p style="margin-top: 10px; color: #666;">±15% confidence interval</p>
      </div>

      ${results.riskFactors.length > 0 ? `
      <div class="section">
        <h2>Risk Factor Analysis</h2>
        ${results.riskFactors.map(factor => `
          <div class="risk-factor ${factor.severity}">
            <h4>${factor.factor}</h4>
            <p>${factor.description}</p>
            <p style="margin-top: 8px; font-weight: 500;">Impact: ${factor.impact}</p>
          </div>
        `).join('')}
      </div>
      ` : `
      <div class="section">
        <h2>Risk Factor Analysis</h2>
        <div class="risk-factor low">
          <h4>No Major Risk Factors</h4>
          <p>Your assessment shows no significant risk factors that would negatively impact your life expectancy.</p>
        </div>
      </div>
      `}

      <div class="section">
        <h2>Personalized Recommendations</h2>
        ${results.recommendations.map(rec => `
          <div class="recommendation">
            <h4>${rec.title}</h4>
            <p>${rec.description}</p>
          </div>
        `).join('')}
      </div>

      <div class="footer">
        <p>This assessment is based on scientific research and validated risk factors. Results should not replace professional medical advice.</p>
        <p>Life Expectancy Calculator • Generated using Cox proportional hazards model</p>
      </div>
    </body>
    </html>
  `;

  // Create and trigger download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `life-expectancy-results-${new Date().toISOString().split('T')[0]}.html`;
  link.click();
  
  URL.revokeObjectURL(url);
  
  // Also trigger print dialog for PDF conversion
  setTimeout(() => {
    const printWindow = window.open(url);
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    }
  }, 100);
}

export async function shareResults(results: CalculationResults): Promise<boolean> {
  const shareText = `My Life Expectancy Assessment Results:

• Remaining Life Expectancy: ${results.remainingYears} years
• Expected Age: ${results.expectedAge} years
• Confidence Range: ${results.confidenceLow} - ${results.confidenceHigh} years

Calculated using a comprehensive health assessment.`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'My Life Expectancy Results',
        text: shareText
      });
      return true;
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
  
  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(shareText);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
}
