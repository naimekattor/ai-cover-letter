"use client";

import React, { useState } from "react";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const openaiClient = openai({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export default function CoverLetterGenerator() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [coverLetters, setCoverLetters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateCoverLetterTemplate = async (jobDesc, resumeText, style) => {
    const { text } = await generateText({
      model: openaiClient("gpt-4o"),
      system: `You are a professional cover letter writer. Your task is to create a ${style} cover letter based on the provided resume and job description. 
      The cover letter should:
      1. Be professionally formatted
      2. Highlight relevant skills and experiences from the resume that match the job description
      3. Show enthusiasm for the role and company
      4. Be approximately 300-400 words
      5. Include a proper greeting and closing
      6. Not include the candidate's contact information (that will be added separately)
      7. Be written in first person`,
      prompt: `Job Description:\n${jobDesc}\n\nResume:\n${resumeText}\n\nPlease write a ${style} cover letter for this job application.`,
    });

    return text;
  };

  const generateCoverLetters = async () => {
    setLoading(true);
    setError(null);
    try {
      const styles = [
        "professional and concise",
        "enthusiastic and achievement-focused",
      ];
      const templates = await Promise.all(
        styles.map((style) =>
          generateCoverLetterTemplate(jobDescription, resume, style)
        )
      );
      setCoverLetters(templates);
    } catch (err) {
      console.error(err);
      setError("Failed to generate cover letters.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">AI Cover Letter Generator</h1>

      <textarea
        className="w-full border p-2 mb-4 h-32"
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mb-4 h-32"
        placeholder="Paste your resume here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={generateCoverLetters}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Cover Letters"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {coverLetters.map((letter, index) => (
        <div key={index} className="mt-6 border p-4 rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Cover Letter {index + 1}</h2>
          <pre className="whitespace-pre-wrap">{letter}</pre>
        </div>
      ))}
    </div>
  );
}
