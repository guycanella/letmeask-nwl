import { useEffect, useState } from "react";
import { database } from "src/services/firebase"
import { useAuth } from "./useAuth";

type QuestionProps = {
	id: string;
	author: {
		name: string;
		avatar: string;
	};
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
	likeCount: number
	likeId: string | undefined
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
		likes: Record<string, {
			authorId: string
		}>
	}
>;

export const useRoom = (roomId: string) => {
	const [questions, setQuestions] = useState<QuestionProps[]>([]);
	const [title, setTitle] = useState("");
	const { user } = useAuth()

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
						likeCount: Object.values(value.likes ?? {}).length,
						likeId: Object.entries(value.likes ?? {}).find(([key, like]) => {
							return like.authorId === user?.id
						})?.[0]
					};
				}
			);

			setTitle(databaseRoom.title);
			setQuestions(parsedQuestions);
		});

		return () => {
			roomRef.off('value')
		}
	}, [roomId, user?.id]);

	return { questions, title }
}