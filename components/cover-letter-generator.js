"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, FileText, Briefcase, CheckCircle } from "lucide-react";
import { Steps } from "@/components/steps";
import { CoverLetterTemplate } from "@/components/cover-letter-template";
import { FinalCoverLetter } from "@/components/final-cover-letter";
//import { generateCoverLetters } from "@/lib/generate-cover-letter";

export default function CoverLetterGenerator() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [currentStep, setCurrentStep] = useState("input");
  const [isGenerating, setIsGenerating] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [finalCoverLetter, setFinalCoverLetter] = useState("");

  const handleGenerate = async () => {
    if (!jobDescription || !resume) return;

    setIsGenerating(true);

    try {
      const generatedTemplates = await generateCoverLetters(
        jobDescription,
        resume
      );
      setTemplates(generatedTemplates);
      setCurrentStep("templates");
    } catch (error) {
      console.error("Error generating cover letters:", error);
      alert(
        `Error generating cover letters: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectTemplate = (index) => {
    setSelectedTemplate(index);
    setFinalCoverLetter(templates[index]);
    setCurrentStep("final");
  };

  const handleReset = () => {
    setCurrentStep("input");
    setSelectedTemplate(null);
    setFinalCoverLetter("");
  };

  const handleBack = () => {
    if (currentStep === "templates") {
      setCurrentStep("input");
    } else if (currentStep === "final") {
      setCurrentStep("templates");
    }
  };

  return (
    <div className="space-y-8">
      <Steps
        steps={[
          {
            id: "input",
            label: "Input Details",
            icon: FileText,
            status: currentStep === "input" ? "current" : "complete",
          },
          {
            id: "templates",
            label: "Select Template",
            icon: Briefcase,
            status:
              currentStep === "templates"
                ? "current"
                : currentStep === "final"
                ? "complete"
                : "upcoming",
          },
          {
            id: "final",
            label: "Final Cover Letter",
            icon: CheckCircle,
            status: currentStep === "final" ? "current" : "upcoming",
          },
        ]}
      />

      {currentStep === "input" && (
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="job-description" className="text-sm font-medium">
                Job Description
              </label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here..."
                className="min-h-[200px]"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="resume" className="text-sm font-medium">
                Your Resume
              </label>
              <Textarea
                id="resume"
                placeholder="Paste your resume content here..."
                className="min-h-[200px]"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={!jobDescription || !resume || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Cover Letters...
                </>
              ) : (
                "Generate Cover Letters"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {currentStep === "templates" && (
        <div className="space-y-6">
          <Tabs defaultValue="template-0" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="template-0">Template 1</TabsTrigger>
              <TabsTrigger value="template-1">Template 2</TabsTrigger>
            </TabsList>
            {templates.map((template, index) => (
              <TabsContent
                key={`template-${index}`}
                value={`template-${index}`}
              >
                <CoverLetterTemplate
                  content={template}
                  index={index}
                  onSelect={handleSelectTemplate}
                />
              </TabsContent>
            ))}
          </Tabs>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          </div>
        </div>
      )}

      {currentStep === "final" && (
        <div className="space-y-6">
          <FinalCoverLetter content={finalCoverLetter} />
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
