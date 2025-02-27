import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import Counter from "./counterComponent";
import { useEffect, useState } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    const [counterValue, setCounterValue] = useState(() => {
      return parseInt(localStorage.getItem("count"), 10) || 0;
    });
  
    // Function to update both state and localStorage
    const updateCounter = (newValue) => {
      setCounterValue(newValue);
      localStorage.setItem("count", newValue);
    };
  
    useEffect(() => {
      const handleStorageChange = () => {
        const updatedValue = parseInt(localStorage.getItem("count"), 10) || 0;
        setCounterValue(updatedValue);
      };
  
      window.addEventListener("storage", handleStorageChange);
  
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }, []);
  
    const formCount = useSelector((state) => state?.users?.users?.length) || 0;
  
    const data = {
        labels: ["Counter", "Forms Submitted"],
        datasets: [
          {
            label: "Count",
            data: [counterValue, formCount], // Both values in a single dataset
            backgroundColor: ["#3B82F6", "#F87171"], // Different colors for each bar
            borderColor: ["#2563EB", "#DC2626"],
            borderWidth: 1,
          },
        ],
      };
      
  
      const options = {
        maintainAspectRatio: false, 
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
        plugins: {
          legend: {
            position: "top",
          },
        },
        barPercentage: 0.6, // Adjusts the width of bars
        categoryPercentage: 0.6, // Brings bars closer together
      };
  
    return (
      <div className="flex flex-col md:flex-row p-6 justify-between gap-6 md:h-[80vh]">
        
        {/* Pass state and update function to Counter */}
        <Counter count={counterValue} updateCounter={updateCounter} />
  
        <div className=" max-w-[80%] md:w-2/3 bg-white p-6 shadow-lg rounded-xl flex justify-center items-center">
          <div className="w-full h-[300px] md:h-[250px]">
            <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">Statistics</h2>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    );
  };
  
  

export default Dashboard;

