'use client';

import React, { useState } from 'react';

export default function IncomeForm(){

    const [income, setIncome] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
    }

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full flex flex-col items-center">
            <h1 className='text-xl'>Your savings</h1>
            <div>
                <form className="flex flex-col gap-3" onSubmit={ handleSubmit }>
                    <div className="flex items-center gap-2 pt-3">
                        <input
                        type="string"
                        placeholder="$1000, 20%"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
