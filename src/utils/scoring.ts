
import { Dimension, Question, PersonalityResult, Archetype, archetypes, dimensions, facets } from "../types/personality";

// Constants for scaling
const MAX_SCORE = 7; // 7-point Likert scale
const MIN_SCORE = 1;

// Function to calculate raw score for a facet based on user responses
export function calculateFacetScore(
  responses: Record<number, number>,
  questions: Question[],
  facetId: string
): number {
  const facetQuestions = questions.filter(q => q.facet === facetId);
  if (facetQuestions.length === 0) return 0;

  let total = 0;
  let count = 0;

  for (const question of facetQuestions) {
    const response = responses[question.id];
    if (response !== undefined) {
      // If reverse-scored, invert the score
      const score = question.reverse ? (MAX_SCORE + 1) - response : response;
      total += score * question.weight;
      count += question.weight;
    }
  }

  return count > 0 ? total / count : 0;
}

// Function to calculate dimension score based on facet scores
export function calculateDimensionScore(
  facetScores: Record<string, number>,
  dimension: Dimension
): number {
  const dimensionFacets = Object.values(facets).filter(f => f.dimension === dimension);
  if (dimensionFacets.length === 0) return 0;

  let total = 0;
  let count = 0;

  for (const facet of dimensionFacets) {
    const score = facetScores[facet.id];
    if (score !== undefined) {
      total += score;
      count++;
    }
  }

  return count > 0 ? total / count : 0;
}

// Function to convert raw scores to percentiles
// In a production environment, this would use normative data
export function calculatePercentiles(
  dimensionScores: Record<Dimension, number>,
  facetScores: Record<string, number>
): {
  dimensions: Record<Dimension, number>,
  facets: Record<string, number>
} {
  // Placeholder implementation - this would use actual normative data in production
  const dimensionPercentiles: Record<Dimension, number> = {} as Record<Dimension, number>;
  const facetPercentiles: Record<string, number> = {};
  
  // Simple linear transformation for now (this would be replaced with proper normative conversion)
  for (const dimension of dimensions) {
    const rawScore = dimensionScores[dimension];
    // Convert from 1-7 scale to 0-100 percentile (simplified)
    dimensionPercentiles[dimension] = Math.round((rawScore - 1) / 6 * 100);
  }
  
  for (const facetId in facetScores) {
    const rawScore = facetScores[facetId];
    facetPercentiles[facetId] = Math.round((rawScore - 1) / 6 * 100);
  }
  
  return {
    dimensions: dimensionPercentiles,
    facets: facetPercentiles
  };
}

// Function to determine the user's archetype based on scores
export function determineArchetype(
  dimensionPercentiles: Record<Dimension, number>,
  facetPercentiles: Record<string, number>
): {
  archetype: string;
  dominantDimension: Dimension;
  secondaryDimension: Dimension;
  shadowTrait: string;
} {
  // Find dominant dimension (highest percentile)
  let highestScore = -1;
  let dominantDimension: Dimension = "Ouverture";
  
  for (const dimension of dimensions) {
    if (dimensionPercentiles[dimension] > highestScore) {
      highestScore = dimensionPercentiles[dimension];
      dominantDimension = dimension;
    }
  }
  
  // Find secondary dimension (second highest percentile)
  let secondHighestScore = -1;
  let secondaryDimension: Dimension = "Ouverture";
  
  for (const dimension of dimensions) {
    if (dimension !== dominantDimension && dimensionPercentiles[dimension] > secondHighestScore) {
      secondHighestScore = dimensionPercentiles[dimension];
      secondaryDimension = dimension;
    }
  }
  
  // Find shadow trait (lowest facet percentile)
  let lowestScore = 101;
  let shadowTrait = "";
  
  for (const facetId in facetPercentiles) {
    if (facetPercentiles[facetId] < lowestScore) {
      lowestScore = facetPercentiles[facetId];
      shadowTrait = facetId;
    }
  }
  
  // Find matching archetype based on dominant dimension
  const matchingArchetype = archetypes.find(a => a.primaryDimension === dominantDimension) || archetypes[0];
  
  return {
    archetype: matchingArchetype.id,
    dominantDimension,
    secondaryDimension,
    shadowTrait
  };
}

// Main function to process quiz responses and generate results
export function processResponses(
  responses: Record<number, number>,
  questions: Question[]
): PersonalityResult {
  // Calculate facet scores
  const facetScores: Record<string, number> = {};
  
  for (const facetId in facets) {
    facetScores[facetId] = calculateFacetScore(responses, questions, facetId);
  }
  
  // Calculate dimension scores
  const dimensionScores: Record<Dimension, number> = {} as Record<Dimension, number>;
  
  for (const dimension of dimensions) {
    dimensionScores[dimension] = calculateDimensionScore(facetScores, dimension);
  }
  
  // Calculate percentiles
  const percentiles = calculatePercentiles(dimensionScores, facetScores);
  
  // Determine archetype
  const { archetype, dominantDimension, secondaryDimension, shadowTrait } = determineArchetype(
    percentiles.dimensions,
    percentiles.facets
  );
  
  return {
    dimensionScores,
    facetScores,
    percentiles,
    dominantDimension,
    secondaryDimension,
    shadowTrait,
    archetype,
    timestamp: Date.now()
  };
}

// Function to save results to localStorage
export function saveResults(result: PersonalityResult): void {
  const storageKey = 'prismPersona_results';
  
  // Store in localStorage
  try {
    localStorage.setItem(storageKey, JSON.stringify(result));
  } catch (error) {
    console.error('Failed to save results to localStorage:', error);
  }
}

// Function to load results from localStorage
export function loadResults(): PersonalityResult | null {
  const storageKey = 'prismPersona_results';
  
  try {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      return JSON.parse(savedData) as PersonalityResult;
    }
  } catch (error) {
    console.error('Failed to load results from localStorage:', error);
  }
  
  return null;
}

// Function to export results as JSON file
export function exportResultsAsJson(result: PersonalityResult): void {
  const dataStr = JSON.stringify(result, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
  
  const exportFileDefaultName = `prismPersona_result_${new Date().toISOString().slice(0, 10)}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}
