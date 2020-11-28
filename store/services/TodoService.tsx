import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../../component/TodoList/TodoList';

class TodoServiceController {
  nextId = 3;

  // initial data
  TodoInitData: Todo[] = [
    {
      id: 1,
      text: 'Rxjs',
      done: false,
    },
    {
      id: 2,
      text: 'Nextjs',
      done: true,
    },
  ];

  private data: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(this.TodoInitData);

  readonly todoData: Observable<Todo[]> = this.data.asObservable();

  // add Todo
  addTodo(text: string): void {
    this.TodoInitData = this.TodoInitData.concat({ text, id: this.nextId, done: false });
    this.data.next(this.TodoInitData);
    this.nextId += 1;
  }

  // delete Todo
  deleteTodo(id: number): void {
    this.TodoInitData = this.TodoInitData.filter((v) => v.id !== id);
    this.data.next(this.TodoInitData);
  }

  // Toggle Todo
  toggleTodo(id: number, done: boolean): void {
    this.TodoInitData = this.TodoInitData.map((v) => ({
      id: v.id,
      text: v.text,
      done: v.id === id ? !v.done : v.done,
    }));
    this.data.next(this.TodoInitData);
  }

  // 해당 State가 필요없을때 실행
  dispose(): void {
    this.data.complete();
  }
}

export const TodoService = new TodoServiceController();