import React from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import ItemAddForm from '../item-add-form'

import './app.css'

export default class App extends React.Component {
	maxId = 100

	state = {
		todoData: [
			{ label: 'Drink Coffee', important: false, id: 1 },
			{ label: 'Make Awesome App', important: true, id: 2 },
			{ label: 'Have a lunch', important: false, id: 3 },
		],
	}

	deleteItem = (id) => {
		// setState - метод реакта. добавляет в очередь изменения состояния компоненты и указывает что его дочерние элементы и сам компонент должны быть повторно отрендерены
		this.setState(({ todoData }) => {
			// переменная idx - получили уникальный id по которому делаем удаление
			const idx = todoData.findIndex((el) => el.id === id)
			// newArray - новый массив, в котором мы удалили не нужный нам item по idx
			const newArray = [
				...todoData.slice(0, idx),
				...todoData.slice(idx + 1),
			]
			// заменили в объекте стэйт исходный массив данных на новый с удалением ненужного элемента
			return {
				todoData: newArray,
			}
		})
	}

	addItem = (text) => {
		// generate id
		const newItem = {
			label: text,
			important: false,
			id: this.maxId++,
		}
		// add element in arr
		this.setState(({todoData}) => {
			const newArr = [...todoData, newItem]

			return {
				todoData: newArr,
			}
		})
	}

	render() {
		return (
			<div className='todo-app'>
				<AppHeader toDo={1} done={3} />
				<div className='top-panel d-flex'>
					<SearchPanel />
					<ItemStatusFilter />
				</div>

				<TodoList
					// todos - state прокидываем наверх
					todos={this.state.todoData}
					// onDeleted - прокидываем функцию удаления элема вверх
					onDeleted={this.deleteItem}
				/>

				<ItemAddForm onItemAdded={this.addItem} />
			</div>
		)
	}
}
