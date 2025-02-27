import { Button } from "@mui/material";

const Counter = ({ count, updateCounter }) => {
  const increment = () => updateCounter(count + 1);
  const decrement = () => updateCounter(Math.max(count - 1, 0));
  const reset = () => updateCounter(0);

  const maxCount = 10;
  const percentage = Math.min(count / maxCount, 1);
  const colorIntensity = Math.pow(percentage, 1.5);

  const backgroundColor = `linear-gradient(to top, rgba(0,0,0, ${colorIntensity}), rgba(255, 255, 255, 1))`;

  return (
    <div className="flex flex-col items-center justify-center transition-all duration-500" style={{ background: backgroundColor }}>
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Counter: {count}</h1>
        <div className="flex flex-col sm:flex-row gap-5">
          <Button variant="contained" color="primary" onClick={increment} className="!bg-blue-500 !text-white">
            Increment
          </Button>
          <Button variant="contained" color="secondary" onClick={decrement} className="!bg-red-500 !text-white">
            Decrement
          </Button>
          <Button variant="contained" color="error" onClick={reset} className="!bg-gray-500 !text-white">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};


export default Counter;