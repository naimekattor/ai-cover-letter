"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function CoverLetterTemplate({ content, index, onSelect }) {
  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="prose max-w-none dark:prose-invert">
          {content.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onSelect(index)}>Select This Template</Button>
      </CardFooter>
    </Card>
  );
}
