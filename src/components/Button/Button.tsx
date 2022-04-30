import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonProps) => {
    return <button className="custom-btn" {...props} />
}

export default Button
