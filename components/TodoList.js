const TodoList = observer(({ store }) => {
	const onNewTodo = () => {
		store.addTodo(prompt("Enter a new todo:", "coffee plz"));
	};

	return (
		<div>
			{store.report}
			<ul>
				{store.todos.map((todo, idx) => (
					<TodoView todo={todo} key={idx} />
				))}
			</ul>
			{store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null}
			<button onClick={onNewTodo}>New Todo</button>
			<small> (double-click a todo to edit)</small>
			<RenderCounter />
		</div>
	);
});
