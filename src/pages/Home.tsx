import { useNavigate } from 'react-router-dom'

import Illustration from 'src/assets/images/illustration.svg'
import LogoImg from 'src/assets/images/logo.svg'
import GoogleImg from 'src/assets/images/google-icon.svg'

import Button from 'src/components/Button'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from 'src/services/firebase'

export const Home = () => {
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')
  const navigate = useNavigate()

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle()
    }

    navigate('/rooms/new', { replace: true })
  }

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault()

    if (roomCode.trim() === '') return

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('A sala não existe.')
      return
    }

    navigate(`rooms/${roomCode}`, { replace: true })
  }

  return (
    <div className="home-container">

      <aside>
        <img src={Illustration} alt="Ilustração de perguntas e respostas" />
				<h2>Crie salas de Q&amp;A ao-vivo</h2>
				<p>Tire as dúvidas da sua audiência em tempo-real</p>
			</aside>
			<main>
        <img src={LogoImg} alt="Logo LetMeAsk" />
        <button className="google-btn" onClick={handleCreateRoom}>
          <img src={GoogleImg} alt="Logo do Google" />
          Crie sua sala com Google
        </button>
        <div className="separator">ou entre em uma sala</div>
        <form onSubmit={handleJoinRoom}>
          <input
            type="text"
            className="neonBorder"
            placeholder='Digite o código da sala'
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
          />
          <Button type='submit' className="custom-btn">
            Entrar na sala
          </Button>
        </form>
			</main>
    </div>
  )
}
