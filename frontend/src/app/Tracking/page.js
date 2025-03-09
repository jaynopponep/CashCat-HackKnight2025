"use client"
import React, { useState, useEffect } from 'react'
import Transaction from '@/component/Transaction'
import "./transaction.css"
import Header from '@/component/Header'

export default function Tracking() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);  // To handle any errors

    useEffect(() => {
        // Make an API call to fetch transaction data
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("jwt_token");  // Assuming you are storing the JWT in localStorage
                const response = await fetch('/nessie_getuserpurchases?user_account_id=12345', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Add the JWT token to the headers
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTransactions(data);  // Update the state with the fetched transactions
            } catch (error) {
                setError('Error fetching data');
                console.error('Error:', error);
            }
        }

        fetchTransactions();
    }, []);  // Empty dependency array to fetch data only once when the component mounts

    return (
        <div className='tracking'>
            <Header />
            <div className='tracking-container'>
                <div className='tracking-transaction'>
                    <h2>Transaction History</h2>
                    <div>
                        {error && <p>{error}</p>}  {/* Display error if there's an issue */}
                        {transactions.length > 0 ? (
                            transactions.map((purchase, key) => (
                                <Transaction key={key} info={purchase} />
                            ))
                        ) : (
                            <p>No transactions found</p>
                        )}
                    </div>
                </div>

                <div className='tracking-graphs'>
                    <h2>Dashboard</h2>
                    {/* Add other graphing components or statistics here */}
                    
                </div>
            </div>
        </div>
    )
}
