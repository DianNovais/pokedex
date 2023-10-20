
import ProgressBarLine from "../ProgressBarLine/ProgressBarLIne";

type progressType = {
  height: number;
  stats: []
};

interface mapType{
    base_stat: number,
    stat: {
        name: string
    }
}

const ProgressBar: React.FC<progressType> = ({ height, stats }) => {
  return (
    <>
      <h3>height</h3>
      <ProgressBarLine data={height}></ProgressBarLine>
      {stats.map((item: mapType) => (
        <div key={item.stat.name}>
            <h3>{item.stat.name}</h3>
            <ProgressBarLine data={item.base_stat}></ProgressBarLine>
        </div>
      ))}
    </>
  );
};

export default ProgressBar;
