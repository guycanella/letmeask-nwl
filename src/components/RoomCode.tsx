import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
	code: string | undefined
}

const RoomCode = (props: RoomCodeProps) => {

	const copyRoomCodeToClipBoard = () => {
		navigator.clipboard.writeText(props.code as string)
	}

	return (
		<button className="room-code" onClick={copyRoomCodeToClipBoard}>
			<div>
				<img src={copyImg} alt="Copy room code" />
			</div>
			<span>Sala #{props.code}</span>
		</button>
	)
}

export default RoomCode
