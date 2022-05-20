import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "src/components/Button";
import RoomCode from "src/components/RoomCode";
import { useAuth } from "src/hooks/useAuth";
import { database } from "src/services/firebase";

import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";

type RoomParamsProps = {
	id: string;
};

type FirebaseQuestionsProps = Record<
	string,
	{
		author: {
			name: string;
			avatar: string;
		};
		content: string;
		isAnswered: boolean;
		isHighlighted: boolean;
	}
>;

type QuestionProps = {
	id: string;
	author: {
		name: string;
		avatar: string;
	};
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
};

export const Room = () => {
	const [newQuestion, setNewQuestion] = useState("");
	const [questions, setQuestions] = useState<QuestionProps[]>([]);
	const [title, setTitle] = useState("");
	const params = useParams<RoomParamsProps>();
	const { user } = useAuth();
	const roomId = params.id;

	useEffect(() => {
		const roomRef = database.ref(`rooms/${roomId}`);

		roomRef.on("value", (room) => {
			const databaseRoom = room.val();
			const firebaseQuestions: FirebaseQuestionsProps =
				databaseRoom.questions ?? {};

			const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(
				([key, value]) => {
					return {
						id: key,
						content: value.content,
						author: value.author,
						isHighlighted: value.isHighlighted,
						isAnswered: value.isAnswered,
					};
				}
			);

			setTitle(databaseRoom.title);
			setQuestions(parsedQuestions);
		});
	}, [roomId]);

	const handleSendQuestion = async (event: FormEvent) => {
		event.preventDefault();

		if (newQuestion.trim() === "") return;

		if (!user) throw new Error("Você precisa estar logado.");

		const question = {
			content: newQuestion,
			author: {
				name: user.name,
				avatar: user.avatar,
			},
			isHighlighted: false,
			isAnswered: false,
		};

		await database.ref(`rooms/${roomId}/questions`).push(question);
		setNewQuestion("");
	};

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="LetMeAsk" />
					<RoomCode code={roomId} />
				</div>
			</header>

			<main className="content">
				<div className="room-title">
					<h1>Sala {title}</h1>
					{questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
				</div>
				<form onSubmit={handleSendQuestion}>
					<textarea
						placeholder="O que você quer perguntar?"
						onChange={(event) => setNewQuestion(event.target.value)}
						value={newQuestion}
					/>
					<div className="form-footer">
						{user ? (
							<div className="user-info">
								<img src={user.avatar} alt={user.name} />
								<span>{user.name}</span>
							</div>
						) : (
							<span>
								Para enviar uma pergunta, <button>faça seu login</button>.
							</span>
						)}
						<Button type="submit" disabled={!user}>
							Enviar pergunta
						</Button>
					</div>
				</form>

				{JSON.stringify(questions)}
			</main>
		</div>
	);
};
