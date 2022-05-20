import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isOutlined?: boolean;
};

const Button = ({ isOutlined = false, ...props }: ButtonProps) => {
	return (
		<button
			className={`custom-btn ${isOutlined ? "outlined" : ""}`}
			{...props}
		/>
	);
};

export default Button;
