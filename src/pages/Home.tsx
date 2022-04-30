import Illustration from 'src/assets/images/illustration.svg'
import LogoImg from 'src/assets/images/logo.svg'
import GoogleImg from 'src/assets/images/google-icon.svg'

export const Home = () => {
  return (
    <div className="home-container">
      <aside>
        <img src={Illustration} alt="Ilustração de perguntas e respostas" />
				<h2>Crie salas de Q&amp;A ao-vivo</h2>
				<p>Tire as dúvidas da sua audiência em tempo-real</p>
			</aside>
			<main>
        <img src={LogoImg} alt="Logo LetMeAsk" />
        <button className="google-btn">
          <img src={GoogleImg} alt="Logo do Google" />
          Crie sua sala com o Google
        </button>
        <div className="separator">ou entre em uma sala</div>
        <input type="text" className="neonBorder" placeholder='Digite o código da sala' />
        <button type='submit' className="custom-btn">
          <img src="" alt="" />
          Entrar na sala
        </button>
			</main>
    </div>
  )
}
