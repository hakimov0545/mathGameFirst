import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const randomNumber = (start: number, end: number): number => {
	return Math.floor(Math.random() * (end - start + 1)) + start;
};

const makeQuestions = () => {
	const sign = ["+", "-", "x", "/"];

	const question =
		randomNumber(1, 10) +
		` ${sign[randomNumber(0, 3)]} ` +
		randomNumber(1, 10);

	let trueAnswer = eval(question.replace("x", "*"));

	trueAnswer =
		trueAnswer % 1 === 0 ? trueAnswer : trueAnswer.toFixed(2);
	let falseAnswer = eval(
		trueAnswer +
			["+", "-"][randomNumber(0, 1)] +
			randomNumber(1, 10)
	);
	falseAnswer =
		falseAnswer % 1 === 0 ? falseAnswer : falseAnswer.toFixed(2);

	const isTrue = randomNumber(1, 10) % 2;

	return { question, trueAnswer, falseAnswer, isTrue };
};

function App() {
	const refLaughAudio = useRef<HTMLAudioElement>(null);
	const [count, setCount] = useState(1);
	const [trueCount, setTrueCount] = useState(0);
	const [falseCount, setFalseCount] = useState(0);
	const [questions, setQuestions] = useState(
		new Array(10).fill(0).map((item) => makeQuestions())
	);
	const [lossGame, setLossGame] = useState(false);

	const question = questions[count - 1];

	const checkAnswer = (isGreen: boolean) => {
		if (!!question.isTrue == isGreen) setTrueCount(trueCount + 1);
		else setFalseCount(falseCount + 1);

		setCount(count + 1);
	};

	const startGame = () => {
		setQuestions(
			new Array(10).fill(0).map((item) => makeQuestions())
		);
		setCount(1);
		setFalseCount(0);
		setTrueCount(0);
		setLossGame(false);
	};

	useEffect(() => {
		if (falseCount >= 5) {
			setLossGame(true);

			refLaughAudio.current?.play();
		}
	}, [falseCount]);

	return (
		<div className="flex justify-center items-center bg-slate-200 h-[100vh]">
			<div className="bg-white rounded p-5 text-center font-bold min-w-[300px]">
				{!lossGame && question ? (
					<>
						<p className="text-gray-500">
							{count} / {questions.length}
						</p>
						<p className="flex justify-center gap-10 my-4">
							<span className="text-green-600">
								{trueCount}
							</span>
							<span className="text-red-600">
								{falseCount}
							</span>
						</p>
						<p className="text-3xl my-14">
							{question.question} ={" "}
							{question.isTrue
								? question.trueAnswer
								: question.falseAnswer}
						</p>
						<div className="flex justify-center gap-4 my-4">
							<Button
								className="bg-red-500 p-4"
								onClick={() => {
									checkAnswer(false);
								}}
							>
								<IoClose />
							</Button>
							<Button
								className="bg-green-500 p-4"
								onClick={() => {
									checkAnswer(true);
								}}
							>
								<FaCheck />
							</Button>
						</div>
					</>
				) : !lossGame ? (
					<div>
						<p className="flex justify-center gap-10 my-4">
							<span className="text-green-600">
								{trueCount}
							</span>
							<span className="text-red-600">
								{falseCount}
							</span>
						</p>
						<p className="text-4xl mt-8">
							{(trueCount / questions.length) * 100} %
						</p>
						<Button
							onClick={startGame}
							className="my-10 px-6"
						>
							Qaytadan o'ynash
						</Button>
					</div>
				) : (
					<div>
						<p className="text-4xl mt-8">
							Omadingiz kelmadi
						</p>
						<Button
							onClick={startGame}
							className="my-10 px-6"
						>
							Qaytadan o'ynash
						</Button>
					</div>
				)}
			</div>
			<audio
				src="/laugh.wav"
				controls
				ref={refLaughAudio}
				className="hidden"
			></audio>
		</div>
	);
}

export default App;
