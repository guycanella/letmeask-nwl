import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Illustration from 'src/assets/images/illustration.svg'
import LogoImg from 'src/assets/images/logo.svg'
import Button from 'src/components/Button'
import { useAuth } from 'src/hooks/useAuth'
import { database } from 'src/services/firebase'

export const NewRoom = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [newRoom, setNewRoom] = useState('')

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault()

    if (newRoom.trim() === '') return

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    navigate(`/rooms/${firebaseRoom.key}`, { replace: true })
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
        <h2>Crie uma nova sala</h2>
        <form onSubmit={handleCreateRoom}>
					<input
            type="text"
            className="neonBorder"
            placeholder='Nome da sala'
            onChange={event => setNewRoom(event.target.value)}
            value={newRoom}
          />
					<Button type='submit' className="custom-btn">
						Criar sala
					</Button>
				</form>
				<p>
					Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
				</p>
      </main>
    </div>
  )
}
