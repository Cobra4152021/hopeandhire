'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';

type Question = {
  id: number;
  text: string;
  type: 'single' | 'multiple' | 'scale';
  options?: string[];
};

const questions: Question[] = [
  {
    id: 1,
    text: 'Which of the following computer skills are you comfortable with?',
    type: 'multiple',
    options: [
      'Basic email and internet browsing',
      'Microsoft Word/Google Docs',
      'Microsoft Excel/Google Sheets',
      'Presentation software (PowerPoint, etc.)',
      'Database management',
      'Social media platforms',
    ],
  },
  {
    id: 2,
    text: 'How would you rate your communication skills?',
    type: 'scale',
    options: ['1 (Needs Improvement)', '2', '3', '4', '5 (Excellent)'],
  },
  {
    id: 3,
    text: 'Which of these best describes your previous work experience?',
    type: 'single',
    options: [
      'Customer service/retail',
      'Food service',
      'Warehouse/logistics',
      'Office/administrative',
      'Construction/trades',
      'Manufacturing',
      'Other',
    ],
  },
  {
    id: 4,
    text: 'Which of these soft skills do you consider your strengths?',
    type: 'multiple',
    options: [
      'Teamwork',
      'Problem-solving',
      'Time management',
      'Adaptability',
      'Leadership',
      'Attention to detail',
    ],
  },
  {
    id: 5,
    text: 'What type of work environment do you prefer?',
    type: 'single',
    options: [
      'Fast-paced and dynamic',
      'Structured and predictable',
      'Collaborative team setting',
      'Independent work with minimal supervision',
      'Mix of teamwork and independent tasks',
    ],
  },
];

export default function SkillsAssessmentTool() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSingleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleMultipleAnswer = (value: string, checked: boolean) => {
    const currentAnswers = (answers[question.id] as string[]) || [];

    if (checked) {
      setAnswers({
        ...answers,
        [question.id]: [...currentAnswers, value],
      });
    } else {
      setAnswers({
        ...answers,
        [question.id]: currentAnswers.filter((item) => item !== value),
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isAnswered = () => {
    if (!answers[question.id]) return false;

    if (question.type === 'multiple') {
      return (answers[question.id] as string[])?.length > 0;
    }

    return true;
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'single':
        return (
          <RadioGroup
            value={(answers[question.id] as string) || ''}
            onValueChange={handleSingleAnswer}
          >
            <div className="space-y-3">
              {question.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'multiple':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={((answers[question.id] as string[]) || []).includes(option)}
                  onCheckedChange={(checked) => handleMultipleAnswer(option, checked as boolean)}
                />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </div>
        );

      case 'scale':
        return (
          <RadioGroup
            value={(answers[question.id] as string) || ''}
            onValueChange={handleSingleAnswer}
            className="flex justify-between space-x-2"
          >
            {question.options?.map((option) => (
              <div key={option} className="flex flex-col items-center space-y-1">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-xs text-center">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    // In a real app, this would analyze the answers and provide personalized results
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-teal mb-2">Assessment Complete!</h3>
          <p className="text-gray-600">
            Based on your responses, we&apos;ve identified the following strengths and
            opportunities:
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Your Key Strengths:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Communication skills</li>
              <li>Adaptability</li>
              <li>Computer proficiency</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Recommended Job Categories:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Customer Service Representative</li>
              <li>Administrative Assistant</li>
              <li>Retail Sales Associate</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Suggested Skill Development:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Advanced Excel skills</li>
              <li>Project management basics</li>
              <li>Professional communication</li>
            </ul>
          </div>
        </div>

        <div className="bg-light-bg p-4 rounded-lg">
          <h4 className="font-medium mb-2">Next Steps:</h4>
          <p className="text-gray-700 mb-4">
            We recommend exploring our training resources for the skills listed above and browsing
            job listings that match your strengths.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-teal text-white hover:bg-teal-dark">View Recommended Jobs</Button>
            <Button
              variant="outline"
              className="border-teal text-teal hover:bg-teal hover:text-white"
            >
              Explore Training Programs
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Skills Assessment</CardTitle>
        <CardDescription>
          Answer the following questions to help us identify your strengths and career
          opportunities.
        </CardDescription>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      <CardContent>
        {!isComplete ? (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p className="text-gray-700 mb-4">{question.text}</p>
            {renderQuestion()}
          </div>
        ) : (
          renderResults()
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isComplete ? (
          <>
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isAnswered()}
              className="bg-teal text-white hover:bg-teal-dark"
            >
              {currentQuestion < questions.length - 1 ? 'Next' : 'Complete Assessment'}
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setIsComplete(false);
            }}
            variant="outline"
            className="ml-auto"
          >
            Start Over
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
