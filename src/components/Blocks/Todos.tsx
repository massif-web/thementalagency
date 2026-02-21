import { Check } from "lucide-react";
import { cn } from "@/utilities/ui";

export type Props = {
  todos: string;
  className?: string;
};

export const Todos: React.FC<Props> = ({ todos, className }) => {
  return (
    <ul className={cn("flex flex-col space-y-2", className)}>
      {todos.split("\n").map((todo, index) => {
        const key = `todo-${todo}-${index}`;
        return (
          <li
            key={key}
            className="inline-flex items-center space-x-2 px-2 py-1 border border-accent text-accent text-xsmall leading-none"
          >
            <Check className="w-3.25" strokeWidth={4} />
            <span>{todo.trim()}</span>
          </li>
        );
      })}
    </ul>
  );
};
