import { useAppSelector } from "../../app/store/store";
import { chartSelectors } from "../../service";
import { Filter } from "./components/Filter";
import { CreateCharts } from "./components/CreateCharts";

export const ControlPanel = () => {
  const data = useAppSelector(chartSelectors.data);

  const isSorting = data.length > 0;

  return (
    <div className={`py-4 flex justify-between`}>
      {isSorting && <Filter />}
      <CreateCharts />
    </div>
  );
};
