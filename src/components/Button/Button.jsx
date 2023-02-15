import React from "react";
import s from './Button.module.scss'


const Button = React.memo(({ value, isImg, filled, handler, symbol }) => {

	const callHandler = () => {
		handler(symbol)
	}

	return (
		<div onClick={callHandler} className={`${s.button__container} ${filled ? s.button__container_white : ""}`}>
			<button className={`${s.button} ${filled ? s.button_white : ""}`}>{isImg // на случай если нужно отобразить картинку на кнопке
				? <img src={require("../../assets/Images/" + value)} alt={value} /> : value}</button>
		</div>
	)
}
)


export default Button