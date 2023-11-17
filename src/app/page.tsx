"use client";
import { QuestionItem } from "@/components/QuestionItem";
import { Results } from "@/components/Results";
import { questions } from "@/data/questions";
import { useState } from "react";

export default function Home() {
  const title = "Quiz de conhecimentos gerais";
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const loadNextQuestion = () => {
    if (questions[currentQuestion + 1]) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  //pega a resposta e salva em um novo array com o spread operator e adicionar o novo item no final
  const handleAnswered = (answer: number) => {
    setAnswers([...answers, answer]);
    loadNextQuestion();
  };

  // essa função vai limpar o array de respostas e voltar para a primeira pergunta
  const handleRestartButton = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  return (
    <main className="w-full h-screen flex justify-center items-center bg-blue-600">
      <div className="w-full max-w-xl rounded-md bg-white text-black shadow shadow-black">
        <div className="p-5 font-bold text-2xl border-b border-gray-300">
          {title}
        </div>
        <div className="p-5">
          {!showResult && (
            <QuestionItem
              question={questions[currentQuestion]}
              count={currentQuestion + 1}
              onAnswer={handleAnswered}
            />
          )}
          {showResult && <Results questions={questions} answers={answers} />}
        </div>
        <div className="p-5 text-center border-t border-gray-300">
          {!showResult &&
            `${currentQuestion + 1} de ${questions.length} pergunta ${
              questions.length > 1 && "s"
            }`}
          {/* {currentQuestion + 1} de {questions.length} pergunta
          {questions.length > 1 && "s"} */}

          {showResult && (
            <button
              className="px-3 py-2 rounded-md bg-blue-800 text-white"
              onClick={handleRestartButton}
            >
              Reiniciar Quiz
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
