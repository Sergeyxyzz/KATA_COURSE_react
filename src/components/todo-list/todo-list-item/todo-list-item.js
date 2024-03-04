import React from 'react'

import './todo-list-item.css'

export default class TodoListItem extends React.Component {
	state = {
		done: false,
		important: false,
	}

	render() {
		// получаем пропсы через ДЕСТРУКТУРИЗАЦИЮ
		const {
			label,
			onDeleted,
			onToggleImportant,
			onToggleDone,
			important,
			done,
		} = this.props

		let classNames = 'todo-list-item'

		// при клике добавляем/удаляем класс done
		if (done) {
			classNames += ' done'
		}

		if (important) {
			classNames += ' important'
		}

		return (
			<span className={classNames}>
				<span
					className='todo-list-item-label'
					// пишем this.onLabelClick() тк функция объявлена в этом классе
					onClick={onToggleDone}
				>
					{label}
				</span>

				<button
					type='button'
					className='btn btn-outline-success btn-sm float-right'
					onClick={onToggleImportant}
				>
					<i className='fa fa-exclamation' />
				</button>

				<button
					type='button'
					className='btn btn-outline-danger btn-sm float-right'
					// вызываем просто onDeleted без this тк мы получили эту функцию через пропсы
					onClick={onDeleted}
				>
					<i className='fa fa-trash-o' />
				</button>
			</span>
		)
	}
}
