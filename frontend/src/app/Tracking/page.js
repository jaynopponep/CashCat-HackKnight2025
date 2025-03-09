"use client"
import React, { useState, useEffect } from 'react'
import Transaction from '@/component/Transaction'
import "./transaction.css"
import Header from '@/component/Header'
import { Line, Bar, Pie, Doughnut, Radar, Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  RadialLinearScale
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  RadialLinearScale
);

export default function Tracking() {
    const [transactions, setTransactions] = useState([]);
    const [userAccountId, setUserAccountId] = useState(null);
    const [error, setError] = useState(null);
    const [display, setDisplay] = useState([]);

    useEffect(() => {
        const fetchAccIdWithToken = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("User not logged in");
                return;
            }
            try {
                const response = await fetch("https://cashcat.onrender.com/get_useraccount_id", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    console.log("couldn't get user's username with JWT token", data);
                    return;
                }
                setUserAccountId(data.account_id.account_id);
            } catch (error) {
                console.log("Error retrieving username", error);
            }
        };
        fetchAccIdWithToken();
    }, []);

    useEffect(() => {
        if (userAccountId) {
            fetchTransactions();
        }
    }, [userAccountId]);

    const fetchTransactions = async () => {
      try {
          console.log(userAccountId);
          const response = await fetch(`https://cashcat.onrender.com/nessie_getuserpurchases?user_account_id=${userAccountId}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const data = await response.json();
  
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const extractedTransactions = data.map(transaction => ({
            amount: transaction.amount,
            description: transaction.description || `Transaction ${transaction.id}`, // Fallback for missing descriptions
          }));
          setDisplay(extractedTransactions);

          // Aggregate transactions with the same description
          const transactionMap = new Map();
          data.forEach(transaction => {
              const description = transaction.description || `Transaction ${transaction.id}`; // Fallback for missing descriptions
              if (transactionMap.has(description)) {
                  transactionMap.set(description, transactionMap.get(description) + transaction.amount);
              } else {
                  transactionMap.set(description, transaction.amount);
              }
          });
  
          // Convert aggregated map to array
          const aggregatedTransactions = Array.from(transactionMap.entries()).map(([description, amount]) => ({
              description,
              amount,
          }));
  
          setTransactions(aggregatedTransactions);
      } catch (error) {
          setError('Error fetching data');
          console.error('Error:', error);
      }
  };

  const labels = transactions.map(t => t.description);
  const amounts = transactions.map(t => t.amount);
  
  const chartData = {
      labels,
      datasets: [
          {
              label: 'Transaction Amount ($)',
              data: amounts,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
          }
      ]
  };
  
  const barChartData = {
      labels,
      datasets: [
          {
              label: 'Transaction Amount ($)',
              data: amounts,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
          }
      ]
  };
  
  const pieChartData = {
      labels,
      datasets: [
          {
              data: amounts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          }
      ]
  };
  
  const doughnutChartData = {
      labels,
      datasets: [
          {
              data: amounts,
              backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD'],
          }
      ]
  };
  

    return (
        <div className='tracking'>
            <Header />
            <div className='tracking-container'>
                <div className='tracking-transaction'>
                    <h2>Transaction History</h2>
                    <div>
                        {error && <p>{error}</p>}
                        {display.length > 0 ? (
                            display.map((purchase, key) => (
                                <Transaction
                                    key={key}
                                    info={{ amount: purchase.amount, description: purchase.description }}
                                />
                            ))
                        ) : (
                            <p>No transactions found</p>
                        )}
                    </div>
                </div>

                <div className='tracking-graphs'>
                    <h2>Dashboard</h2>

                    <div className='chart-wrapper'>
                        <h3>Transaction Trend</h3>
                        <Line data={chartData} />
                    </div>

                    <div className='chart-wrapper'>
                        <h3>Transaction Breakdown</h3>
                        <Bar data={barChartData} />
                    </div>

                    <div className='chart-wrapper'>
                        <h3>Transaction Distribution</h3>
                        <Pie data={pieChartData} />
                    </div>

                    <div className='chart-wrapper'>
                        <h3>Transaction Category Breakdown</h3>
                        <Doughnut data={doughnutChartData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
