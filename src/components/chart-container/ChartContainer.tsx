import { FC, ReactNode } from "react";

interface Props {
  date: Date;
  children: ReactNode;
}

export const ChartContainer: FC<Props> = ({ date, children }) => {
  const formattedDate = new Intl.DateTimeFormat("ru", {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  }).format(date);

  return (
    <div className="p-4 shadow-md border rounded-lg h-60">
      <div className="mb-2 text-sm font-mono font-semibold">
        Created: {formattedDate}
      </div>
      <div className="h-48">{children}</div>
    </div>
  );
};