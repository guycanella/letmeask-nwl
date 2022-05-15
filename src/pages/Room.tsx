import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'src/components/Button'
import RoomCode from 'src/components/RoomCode'
import { useAuth } from 'src/hooks/useAuth'
import { database } from 'src/services/firebase'

import logoImg from '../assets/images/logo.svg'

import '../styles/room.scss'

type RoomParamsProps = {
	id: string
}

export const Room = () => {
	const [newQuestion, setNewQuestion] = useState('')
	const params = useParams<RoomParamsProps>()
	const { user } = useAuth()
	const roomId = params.id

	useEffect(() => {
		const roomRef = database.ref(`rooms/${roomId}`)

		roomRef.once('value', (room) => {
			// const parsedQuestions = Object.entries(room.questions)
			console.log(room)
		})
	}, [roomId])

	const handleSendQuestion = async (event: FormEvent) => {
		event.preventDefault()

		if (newQuestion.trim() === '') return

		if (!user) throw new Error('Você precisa estar logado.')

		const question = {
			content: newQuestion,
			author: {
				name: user.name,
				avatar: user.avatar,
			},
			isHighlighted: false,
			isAnswered: false
		}

		await database.ref(`rooms/${roomId}/questions`).push(question)
		setNewQuestion('')
	}

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
					<h1>Sala React</h1>
					<span>4 perguntas</span>
				</div>
				<form onSubmit={handleSendQuestion}>
					<textarea
						placeholder='O que você quer perguntar?'
						onChange={event => setNewQuestion(event.target.value)}
						value={newQuestion}
					/>
					<div className="form-footer">
						{user ? (
							<div className='user-info'>
								<img src={user.avatar} alt={user.name} />
								<span>{user.name}</span>
							</div>
						) : (
							<span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
						)}
						<Button type='submit' disabled={!user} >Enviar pergunta</Button>
					</div>
				</form>
			</main>
		</div>
	)
}
