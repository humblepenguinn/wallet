import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS,  CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface Data {
  labels: string[];
  datasets: DataSet[];
}

interface DataSet {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  fill?: boolean;
}

export default function Chart() {
  const [data, setData] = useState<Data>({
    labels: [],
    datasets: []
  });

  const [options, setOptions] = useState<any>({});

  useEffect(() => {
    setData({
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [
        {
          label: 'Odyssey Coin Value',
          data: [5000, 5500, 6000, 5800, 6200, 6100, 6300],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192, 0.4)',
          fill: true,
        },
      ]
    });

    setOptions({
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'Odyssey Coin Value',
          },
        },
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Odyssey Coin Value Over Time (not real values)'
        }
      },
      maintainAspectRatio: false,
      responsive: true
    });
  }, []);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <Line data={data} options={options} />
      </div>
    </>
  );
}
