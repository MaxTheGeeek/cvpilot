'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Upload, CheckCircle2, AlertCircle, RefreshCw, FileText, Search, Brain, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { puter } from '@heyputer/puter.js'

interface AtsScore {
  totalScore: number;
  topics: Array<{
    name: string;
    score: number;
    feedback: string;
  }>;
  overallFeedback: string;
}

const loadingSteps = [
  { id: 1, icon: FileText, title: 'Extracting Data', desc: 'Reading PDF text...' },
  { id: 2, icon: Search, title: 'Scanning Keywords', desc: 'Matching job tags...' },
  { id: 3, icon: Brain, title: 'AI Evaluation', desc: 'Analyzing impact...' },
  { id: 4, icon: CheckCircle2, title: 'Finalizing Score', desc: 'Generating feedback...' },
];

function LoadingAnimation() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev; // Stay on the last step until parent component finishes
      });
    }, 1500); // Advance every 1.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto py-8 sm:px-4">
      <div className="relative flex justify-between">
        {/* Background line */}
        <div className="absolute top-6 left-0 w-full h-[2px] bg-border/60 -z-10" />

        {/* Active progress line */}
        <div 
          className="absolute top-6 left-0 h-[2px] bg-primary -z-10 transition-all duration-500 ease-in-out" 
          style={{ width: `${(activeStep / (loadingSteps.length - 1)) * 100}%` }}
        />

        {loadingSteps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10 w-24">
              <div 
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 bg-background",
                  isActive ? "border-primary text-primary scale-110 shadow-lg shadow-primary/40" : 
                  isCompleted ? "border-primary bg-primary text-primary-foreground" : 
                  "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
              </div>
              <div className="mt-4 text-center">
                <p className={cn("text-xs sm:text-sm font-semibold transition-colors duration-300", isActive || isCompleted ? "text-foreground" : "text-muted-foreground")}>
                  {step.title}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AtsAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AtsScore | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsAnalyzing(true)
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      // 1. Extract text server-side using existing parse-resume endpoint
      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to extract text from PDF.')
      }

      const { text } = await response.json()
      if (!text) {
        throw new Error('The extracted text was empty.')
      }

      toast.info("Analyzing resume with AI ATS...")

      // 2. Query Puter.js on the client for ATS structured feedback
      const prompt = `You are a strict, expert Applicant Tracking System (ATS) evaluator.
Analyze the following resume text and provide a structured JSON response evaluating its quality.

You must return EXACTLY the following JSON format without any markdown wrappers (no \`\`\`json):

{
  "totalScore": <number between 0 and 100>,
  "topics": [
    {
      "name": "Impact & Action Verbs",
      "score": <number between 0 and 100>,
      "feedback": "<brief feedback on action verbs and impact>"
    },
    {
      "name": "Keyword Optimization",
      "score": <number between 0 and 100>,
      "feedback": "<brief feedback on skill keywords>"
    },
    {
      "name": "Clarity & Structure",
      "score": <number between 0 and 100>,
      "feedback": "<brief feedback on how well the text is structured>"
    }
  ],
  "overallFeedback": "<one paragraph summary of the biggest areas for improvement>"
}

Here is the resume text to evaluate:

${text}`

      const aiResponse = await puter.ai.chat(prompt)

      const resultText = typeof aiResponse === 'string' 
        ? aiResponse 
        : (aiResponse as any)?.message?.content?.[0]?.text || (aiResponse as any)?.text || (aiResponse as any)?.toString()

      const cleanJson = resultText.replace(/^```(json)?|```$/gi, '').trim()
      const parsedData = JSON.parse(cleanJson) as AtsScore

      setResult(parsedData)
      toast.success("Analysis complete!")

    } catch (error) {
      console.error(error)
      toast.error("Failed to analyze resume. Please try another file.")
    } finally {
      setIsAnalyzing(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-500'
  }

  return (
    <div className="space-y-8">
      <input 
        type="file" 
        accept="application/pdf"
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      {/* Upload Zone or Loading Animation */}
      {!isAnalyzing ? (
        <div 
          className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-2xl p-12 text-center hover:bg-primary/10 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">
                Upload Resume PDF
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop your PDF here or click to browse
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border shadow-sm p-8 sm:p-12 animate-in fade-in zoom-in-95 duration-500">
          <LoadingAnimation />
        </div>
      )}

      {/* Results Section */}
      {result && (
        <div className="bg-card rounded-2xl border shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
            
            {/* Circular Global Score */}
            <div className="relative shrink-0 w-40 h-40 flex items-center justify-center rounded-full bg-muted border-4 border-border shadow-inner">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
              <div className="text-center">
                <span className={`text-5xl font-bold tracking-tight ${getScoreColor(result.totalScore)}`}>
                  {result.totalScore}
                </span>
                <span className="block text-sm font-medium text-muted-foreground mt-1 uppercase">Overall</span>
              </div>
            </div>

            {/* Overall Feedback */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                {result.totalScore >= 80 ? (
                  <><CheckCircle2 className="h-6 w-6 text-green-500" /> Great Resume</>
                ) : (
                  <><AlertCircle className="h-6 w-6 text-yellow-500" /> Needs Improvement</>
                )}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {result.overallFeedback}
              </p>
            </div>
          </div>

          <div className="h-px bg-border w-full my-8"></div>

          {/* Topic Breakdown */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" /> Detailed Breakdown
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.topics.map((topic, index) => (
                <div key={index} className="bg-muted/50 p-5 rounded-xl border space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-sm text-foreground/80 uppercase tracking-wide">{topic.name}</span>
                    <span className={`font-bold text-lg ${getScoreColor(topic.score)}`}>{topic.score}/100</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        topic.score >= 80 ? 'bg-green-500' : topic.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${topic.score}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-snug">
                    {topic.feedback}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
             <Button size="lg" className="w-full sm:w-auto" onClick={() => fileInputRef.current?.click()}>
               Analyze Another Resume
             </Button>
          </div>
        </div>
      )}
    </div>
  )
}
