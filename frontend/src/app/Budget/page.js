"use client"
import React from 'react';
import Header from '@/component/Header';
import { Pie, Doughnut, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../style.css';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
    plugins: {
      legend: {
        position: "right", // Moves legend to the right
        labels: {
          boxWidth: 12, // Adjusts the size of the legend box
        },
      },
    },
  };
  
function Budget() {
  // Dummy Income Data
  const incomeData = {
    labels: ['Salary', 'Freelancing', 'Investments', 'Other'],
    datasets: [
      {
        data: [5000, 1200, 800, 500],
        backgroundColor: ['#4CAF50', '#FFC107', '#2196F3', '#FF5722'],
      },
    ],
  };

  // Dummy Expense Data
  const expenseData = {
    labels: ['Rent', 'Food', 'Entertainment', 'Transport', 'Others'],
    datasets: [
      {
        data: [2000, 600, 300, 150, 250],
        backgroundColor: ['#E74C3C', '#3498DB', '#9B59B6', '#F1C40F', '#2ECC71'],
      },
    ],
  };

  // Monthly Budget Trend (Total Income vs Expenses)
  const budgetTrendData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Total Income ($)',
        data: [7500, 6800, 7200],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Total Expenses ($)',
        data: [4500, 4200, 4300],
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
      },
    ],
  };

  // Savings Breakdown Data
  const savingsData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Savings ($)',
        data: [3000, 2600, 2900],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  // Leftover Budget Data (Income - Expenses)
  const leftoverBudgetData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Leftover Budget ($)',
        data: [7500 - 4500, 6800 - 4200, 7200 - 4300], // income - expenses for each month
        backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color for leftover budget
      },
    ],
  };

  return (
    <div className="budget-container">
      <Header />
      <div className="budget-categories">
        <div className="budget-insights">
          <h2>Income Categories</h2>
          <Pie data={incomeData} />
        </div>
        <div className="budget-insights">
          <h2>Expense Categories</h2>
          <Doughnut data={expenseData} />
        </div>
      </div>

      <div className="budget-graphs">
        <div className="budget-wrapper">
          <h2>Monthly Budget Trend</h2>
          <Line data={budgetTrendData} />
        </div>
        <div className="budget-wrapper">
          <h2>Savings Breakdown</h2>
          <Bar data={savingsData} />
        </div>
        <div className="budget-wrapper">
          <h2>Leftover Budget</h2>
          <Bar data={leftoverBudgetData} />
        </div>
      </div>
    </div>
  );
}

export default Budget;
