import { GoogleGenAI } from "@google/genai";
import { Student, Subject } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateStudentRemark = async (student: Student, subjects: Subject[]): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "AI Service Unavailable (Missing API Key)";

  // Construct a prompt based on student data
  const performanceData = student.results.map(r => {
    const sub = subjects.find(s => s.id === r.subjectId);
    const attendancePct = Math.round((r.attendedClasses / r.totalClasses) * 100);
    return `${sub?.name}: Marks ${r.marksObtained}/${sub?.maxMarks}, Attendance ${attendancePct}%`;
  }).join('\n');

  const prompt = `
    Analyze the following academic performance for student ${student.name} and provide a 2-sentence professional, constructive remark suitable for a report card.
    Focus on strengths and areas for improvement.

    Data:
    ${performanceData}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No remark generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating remark. Please try again later.";
  }
};
