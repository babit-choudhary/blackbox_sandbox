import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({
  type = 'line',
  data,
  options = {},
  height = 300,
  width = '100%',
  className = ''
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    chartInstance.current = new Chart(ctx, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...options
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div
      style={{ height, width }}
      className={className}
    >
      <canvas ref={chartRef} />
    </div>
  );
};

// Line Chart
export const LineChart = ({
  data,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  smooth = false,
  ...props
}) => {
  const defaultOptions = {
    scales: {
      x: {
        grid: {
          display: showGrid
        }
      },
      y: {
        grid: {
          display: showGrid
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'top'
      },
      tooltip: {
        enabled: showTooltip
      }
    },
    elements: {
      line: {
        tension: smooth ? 0.4 : 0
      }
    }
  };

  return (
    <ChartComponent
      type="line"
      data={data}
      options={defaultOptions}
      {...props}
    />
  );
};

// Bar Chart
export const BarChart = ({
  data,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  stacked = false,
  ...props
}) => {
  const defaultOptions = {
    scales: {
      x: {
        stacked,
        grid: {
          display: showGrid
        }
      },
      y: {
        stacked,
        grid: {
          display: showGrid
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'top'
      },
      tooltip: {
        enabled: showTooltip
      }
    }
  };

  return (
    <ChartComponent
      type="bar"
      data={data}
      options={defaultOptions}
      {...props}
    />
  );
};

// Pie/Doughnut Chart
export const PieChart = ({
  data,
  showLegend = true,
  showTooltip = true,
  doughnut = false,
  cutout = 50,
  ...props
}) => {
  const defaultOptions = {
    plugins: {
      legend: {
        display: showLegend,
        position: 'top'
      },
      tooltip: {
        enabled: showTooltip
      }
    },
    cutout: doughnut ? `${cutout}%` : 0
  };

  return (
    <ChartComponent
      type={doughnut ? 'doughnut' : 'pie'}
      data={data}
      options={defaultOptions}
      {...props}
    />
  );
};

// Area Chart
export const AreaChart = ({
  data,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  smooth = false,
  stacked = false,
  ...props
}) => {
  // Convert data to include fill
  const areaData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      fill: true
    }))
  };

  const defaultOptions = {
    scales: {
      x: {
        grid: {
          display: showGrid
        }
      },
      y: {
        stacked,
        grid: {
          display: showGrid
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'top'
      },
      tooltip: {
        enabled: showTooltip
      }
    },
    elements: {
      line: {
        tension: smooth ? 0.4 : 0
      }
    }
  };

  return (
    <ChartComponent
      type="line"
      data={areaData}
      options={defaultOptions}
      {...props}
    />
  );
};

// Example usage:
/*
import Chart, {
  LineChart,
  BarChart,
  PieChart,
  AreaChart
} from './components/Chart';

// Line Chart
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales 2023',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)'
    }
  ]
};

<LineChart
  data={lineData}
  smooth
  height={400}
/>

// Bar Chart
const barData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
      ]
    }
  ]
};

<BarChart
  data={barData}
  stacked
  height={300}
/>

// Pie Chart
const pieData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ]
    }
  ]
};

<PieChart
  data={pieData}
  doughnut
  cutout={70}
  height={250}
/>

// Area Chart
const areaData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)'
    }
  ]
};

<AreaChart
  data={areaData}
  smooth
  stacked
  height={350}
/>

// Custom Chart
const customData = {
  // Your custom chart data
};

const customOptions = {
  // Your custom chart options
};

<Chart
  type="radar"
  data={customData}
  options={customOptions}
  height={400}
/>
*/

export default ChartComponent;