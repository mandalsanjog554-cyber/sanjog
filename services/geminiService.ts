
import { GoogleGenAI, Type } from "@google/genai";
import { DPR, Project, Invoice } from "../types";

export const getProjectInsights = async (project: Project, dprs: DPR[]) => {
  try {
    // Moved initialization inside to ensure most up-to-date API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      As an Industrial Solutions Architect, analyze this project data for Makana Industries:
      Project: ${project.name}
      Client: ${project.client}
      Progress: ${project.currentInchDia} / ${project.totalInchDia} inch-dia
      Daily Average: ${dprs.reduce((acc, d) => acc + d.inchDiaToday, 0) / (dprs.length || 1)} inch-dia
      
      Provide a brief summary of:
      1. Estimated Completion Date based on current rate.
      2. Compliance risk (High/Medium/Low).
      3. One efficiency recommendation.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Unable to generate insights at this time.";
  }
};

/**
 * AI-Powered OCR Engine
 * Extracts invoice details from image base64 data.
 */
export const processInvoiceOCR = async (base64Image: string): Promise<Partial<Invoice>> => {
  try {
    // Moved initialization inside to ensure most up-to-date API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: "Extract invoice details: Vendor name, Date, Total Amount, Tax/GST Amount, and Line Items. Return as JSON."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vendor: { type: Type.STRING },
            date: { type: Type.STRING },
            amount: { type: Type.NUMBER },
            tax: { type: Type.NUMBER },
            gstin: { type: Type.STRING },
            category: { type: Type.STRING },
            lineItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  desc: { type: Type.STRING },
                  qty: { type: Type.NUMBER },
                  rate: { type: Type.NUMBER },
                  total: { type: Type.NUMBER }
                }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("OCR Error:", error);
    throw error;
  }
};

/**
 * Natural Language Query Interface (NLQI)
 * Answers financial questions based on current state.
 */
export const queryFinancialData = async (query: string, context: any) => {
  try {
    // Moved initialization inside to ensure most up-to-date API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      You are an AI Fintech Architect for Makana Industries. 
      Answer this query using the following financial context: ${JSON.stringify(context)}
      User Query: "${query}"
      Provide a clear, professional answer. If it's about burn rate or cash flow, be precise.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    return "I'm having trouble accessing the ledgers right now.";
  }
};

/**
 * Proactive Financial Insights
 */
export const generateFinancialPulse = async (invoices: Invoice[], txns: any[]) => {
  try {
    // Moved initialization inside to ensure most up-to-date API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Analyze these invoices and transactions for Makana Industries. 
      Generate 3 proactive financial insights:
      1. A warning if cash flow looks tight in the next 15-30 days.
      2. A tax saving suggestion (VAT/GST).
      3. A positive performance highlight.
      Format: Return a JSON array of objects with { type, title, message, impact }.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              title: { type: Type.STRING },
              message: { type: Type.STRING },
              impact: { type: Type.STRING }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    return [];
  }
};
