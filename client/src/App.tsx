import { trpc } from "./utils/trpc";

function App() {
  const todos = trpc.todos.getTodos.useQuery();
  const createTodo = trpc.todos.createTodo.useMutation({
    onSuccess: () => {
      console.log("test");
    },
  });

  return (
    <div>
      {todos.isSuccess && todos.data.todos.map((todo) => <p>{todo}</p>)}
      <button
        onClick={() =>
          createTodo.mutate({
            title: "test",
            description: "test",
            userId: "1",
          })
        }
      >
        Create Todo
      </button>
    </div>
  );
}

export default App;
