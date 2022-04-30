import { Link } from 'react-router-dom'
import Illustration from 'src/assets/images/illustration.svg'
import LogoImg from 'src/assets/images/logo.svg'
import Button from 'src/components/Button'

export const NewRoom = () => {

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
        <form>
					<input type="text" className="neonBorder" placeholder='Nome da sala' />
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
