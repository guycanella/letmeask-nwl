import { useParams } from "react-router-dom";
import Button from "src/components/Button";
import RoomCode from "src/components/RoomCode";
import Question from "src/components/Question";
import { useRoom } from "src/hooks/useRoom";

import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";

type RoomParamsProps = {
	id: string;
};

export const AdminRoom = () => {
	const params = useParams<RoomParamsProps>();
	const roomId = params.id;

	const { questions, title } = useRoom(roomId!);

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
