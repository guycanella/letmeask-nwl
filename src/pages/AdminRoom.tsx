import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "src/components/Button";
import RoomCode from "src/components/RoomCode";
import Question from "src/components/Question";
import { useAuth } from "src/hooks/useAuth";
import { useRoom } from "src/hooks/useRoom";
import { database } from "src/services/firebase";

import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";

type RoomParamsProps = {
	id: string;
};

export const AdminRoom = () => {
	const [newQuestion, setNewQuestion] = useState("");
	const params = useParams<RoomParamsProps>();
	const { user } = useAuth();
	const roomId = params.id;

	const { questions, title } = useRoom(roomId!);

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
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined>Encerrar sala</Button>
					</div>
				</div>
			</header>

			<main className="content">
				<div className="room-title">
					<h1>Sala {title}</h1>
					{questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
				</div>

				{questions.map((question, idx) => {
					return (
						<Question
							key={idx}
							content={question.content}
							author={question.author}
						/>
					);
				})}
			</main>
		</div>
	);
};
