import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, AnalysisType, Repository } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeRepository = async (
  repo: Repository,
  type: AnalysisType
): Promise<AnalysisResult> => {
  const modelId = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are an expert Senior Software Engineer and Code Auditor. 
    Your job is to analyze software repositories based on their description, language, and simulated content context.
    You strictly output data in JSON format compliant with the schema provided.
    Currency context: The user paid in Kwanza (KZ).
  `;

  const prompt = `
    Analyze the following repository context:
    Name: ${repo.name}
    Language: ${repo.language}
    Description: ${repo.description}
    
    Perform a comprehensive static analysis simulation.
    Calculate scores for Security, Maintainability, and Reliability (0-100).
    Estimate Technical Debt ratio (0-100%).
    
    Generate a realistic list of 4 to 6 specific issues (Bugs, Vulnerabilities, or Code Smells) that would typically be found in a ${repo.language} project with this description. Invent realistic file names and line numbers.
    
    If the analysis type is PREMIUM, provide a snippet of code fixing a critical vulnerability.
    
    Provide a professional summary in Portuguese (PT-AO).
    Provide 3 actionable recommendations in Portuguese.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            securityScore: { type: Type.INTEGER },
            maintainabilityScore: { type: Type.INTEGER },
            reliabilityScore: { type: Type.INTEGER },
            technicalDebtRatio: { type: Type.NUMBER },
            bugsCount: { type: Type.INTEGER },
            vulnerabilitiesCount: { type: Type.INTEGER },
            codeSmellsCount: { type: Type.INTEGER },
            duplications: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            suggestedFixes: { type: Type.STRING, nullable: true },
            issues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['bug', 'vulnerability', 'code_smell'] },
                  severity: { type: Type.STRING, enum: ['critical', 'major', 'minor'] },
                  message: { type: Type.STRING },
                  file: { type: Type.STRING },
                  line: { type: Type.INTEGER }
                },
                required: ['id', 'type', 'severity', 'message', 'file', 'line']
              }
            }
          },
          required: [
            "securityScore", "maintainabilityScore", "reliabilityScore", 
            "technicalDebtRatio", "bugsCount", "vulnerabilitiesCount", 
            "codeSmellsCount", "duplications", "summary", "recommendations", "issues"
          ]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");

    const result: AnalysisResult = {
      ...data,
      chartData: [
        { name: 'Segurança', score: data.securityScore, fullMark: 100 },
        { name: 'Manutenibilidade', score: data.maintainabilityScore, fullMark: 100 },
        { name: 'Confiabilidade', score: data.reliabilityScore, fullMark: 100 },
        { name: 'Performance', score: 100 - data.technicalDebtRatio, fullMark: 100 },
      ]
    };

    return result;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fallback mock data
    return {
      securityScore: 75,
      maintainabilityScore: 60,
      reliabilityScore: 80,
      technicalDebtRatio: 25.5,
      bugsCount: 12,
      vulnerabilitiesCount: 3,
      codeSmellsCount: 45,
      duplications: 12.5,
      summary: "Análise simulada (Erro na API): O código apresenta boa estrutura base, mas requer atenção em sanitização de inputs.",
      recommendations: ["Atualizar dependências", "Remover logs de debug", "Otimizar loops aninhados"],
      issues: [
        { id: '1', type: 'vulnerability', severity: 'critical', message: 'SQL Injection potential in login query', file: 'src/auth/login.ts', line: 45 },
        { id: '2', type: 'bug', severity: 'major', message: 'Unhandled promise rejection', file: 'src/api/client.ts', line: 120 },
        { id: '3', type: 'code_smell', severity: 'minor', message: 'Function complexity too high', file: 'src/utils/helpers.ts', line: 15 },
      ],
      chartData: [
        { name: 'Segurança', score: 75, fullMark: 100 },
        { name: 'Manutenibilidade', score: 60, fullMark: 100 },
        { name: 'Confiabilidade', score: 80, fullMark: 100 },
        { name: 'Performance', score: 70, fullMark: 100 },
      ]
    };
  }
};