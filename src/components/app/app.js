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
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Have a luch'),
		],
	}

	// при стрелочной функции код ломается
	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++,
		}
	}

	// удаляем элемент
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

	// добавляем элемент
	addItem = (text) => {
		// generate id
		const newItem = this.createTodoItem(text)

		// add element in arr
		this.setState(({ todoData }) => {
			const newArr = [...todoData, newItem]

			return {
				todoData: newArr,
			}
		})
	}

	// функция, которая зачеркивает и выделяет голубым
	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el) => el.id === id)
		// 1 обновляем объект
		const oldItem = arr[idx]
		// в newItem меняем значения done
		const newItem = { ...oldItem, [propName]: !oldItem[propName] }
		// 2 конструируем новый массив
		return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
	}

	// подчеркиваем голубым
	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important'),
			}
		})
	}

	// зачеркиваем
	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done'),
			}
		})
	}

	render() {
		// деструктуризация стейта
		const { todoData } = this.state
		// счетчик выполненных задач
		const doneCount = todoData.filter((el) => el.done).length
		// счетчик общего количества задач
		const todoCount = todoData.length - doneCount
		return (
			<div className='todo-app'>
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className='top-panel d-flex'>
					<SearchPanel />
					<ItemStatusFilter />
				</div>

				<TodoList
					// todos - state прокидываем наверх
					todos={todoData}
					// onDeleted - прокидываем функцию удаления элема вверх
					onDeleted={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}
				/>

				<ItemAddForm onItemAdded={this.addItem} />
			</div>
		)
	}
}
