import React from 'react'
import './item-add-form.css'

export default class ItemAddForm extends React.Component {
	// в переменную state в значение ключа label кладем данные из инпута
	state = { label: '' }
	// функция, отправляющая значение инпута в стэйт
	onLabelChange = (e) => {
		this.setState({
			label: e.target.value,
		})
	}
	// функция рендера новый тудушки
	onSubmit = (e) => {
		// preventDefault() - дословно означает, что действие по умолчанию (в нашем случае перезагрузка страницы) выполнять не нужно
		e.preventDefault()
		// onItemAdded передан через пропсы из app компонента
		this.props.onItemAdded(this.state.label)
		this.setState({label: ''})
	}
	render() {
		return (
			// рендер нового элемента добавлять в form в onSubmit чтобы можно было через Enter его отправлять
			<form className='item-add-form d-flex' onSubmit={this.onSubmit}>
				<input
					type='text'
					placeholder='What needs to be done?'
					className='form-control'
					// onChange - получает текущее событие инпута
					onChange={this.onLabelChange}
					// value - значение инпута
					value={this.state.label}
				/>
				<button className='btn btn-outline-secondary'>Add Item</button>
			</form>
		)
	}
}
