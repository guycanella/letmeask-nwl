import { useParams, useNavigate } from "react-router-dom";
import Button from "src/components/Button";
import RoomCode from "src/components/RoomCode";
import Question from "src/components/Question";
import { useRoom } from "src/hooks/useRoom";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";

import "../styles/room.scss";
import { database } from "src/services/firebase";

type RoomParamsProps = {
	id: string;
};

export const AdminRoom = () => {
	const params = useParams<RoomParamsProps>();
	const roomId = params.id;

	const { questions, title } = useRoom(roomId!);
	const navigate = useNavigate();

	const handleEndRoom = async () => {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});

		navigate("/", { replace: true });
	};

	const handleDeleteQuestion = async (questionId: string) => {
		if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	};

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="LetMeAsk" />
					<div>
						<RoomCode code={roomId} />
						<Button onClick={handleEndRoom} isOutlined>
							Encerrar sala
						</Button>
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
						>
							<button
								type="button"
								onClick={() => handleDeleteQuestion(question.id)}
							>
								<img src={deleteImg} alt="Remover pergunta" />
							</button>
						</Question>
					);
				})}
			</main>
		</div>
	);
};
