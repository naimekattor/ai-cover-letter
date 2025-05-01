import CoverLetterGenerator from "@/components/cover-letter-generator";

export const metadata = {
  title: "Cover Letter Generator",
  description:
    "Generate professional cover letters based on your resume and job description",
};

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold text-center mb-2">
        Cover Letter Generator
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Create professional cover letters tailored to your resume and job
        description
      </p>
      <CoverLetterGenerator />
    </main>
  );
}
