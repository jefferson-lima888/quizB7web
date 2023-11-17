import { Question } from "@/types/Question";
import { useState } from "react";

type Props = {
  question: Question;
  count: number;
  onAnswer: (answer: number) => void;
};

export const QuestionItem = ({ question, count, onAnswer }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const checkQuestion = (key: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(key);

      //aqui vai aguardar 2 segundos para executar a função onAnswer e depois limpar o selectedAnswer
      setTimeout(() => {
        onAnswer(key);
        setSelectedAnswer(null);
      }, 2000);
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-5">
        {count}. {question.question}
      </div>
      <div>
        {question.options.map((item, key) => (
          <div
            key={key}
            className={`border px-3 py-2 rounded-md text-lg mb-4 bg-blue-100 border-blue-300 ${
              selectedAnswer !== null
                ? "cursor-auto "
                : "hover:opacity-60 cursor-pointer"
            }
            ${
              selectedAnswer !== null &&
              selectedAnswer === question.answer &&
              selectedAnswer === key &&
              "bg-green-200 border-green-300"
            }
            ${
              selectedAnswer !== null &&
              selectedAnswer !== question.answer &&
              selectedAnswer === key &&
              "bg-red-200 border-red-300"
            }
            `}
            onClick={() => checkQuestion(key)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
