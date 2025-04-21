// Arrow function to handle the click event and get values
document.getElementById("btnSubmit").addEventListener("click", () => {
    console.log('Calculating...');
    
    // Get input values from the user
    let amount = document.getElementById('amount');
    let interest = document.getElementById('interest');
    let months = document.getElementById('months');

    // Parse the numbers
    amount = parseFloat(amount.value);
    interest = parseFloat(interest.value);
    months = parseFloat(months.value);
    //Input validation
    if(isNaN(amount) || isNaN(interest) || isNaN(months) || amount <= 0 || interest < 0 || months <= 0) {
        showError("Please enter valid numbers for all fields");
        return;
    }

    clearError();
    calculateLoan(amount, interest, months);
     
});


// Arrow function for calculation
const calculateLoan = (principal, interestRate, months)  => {
    const monthlyRate = (interestRate / 100) / 12;
    const monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;
   

    //show summary
    const info = `
         <h5 class="mb-3">Loan Summary</h5>
        <ul class="list-group">
            <li class="list-group-item">Monthly Payment: <strong>$${monthlyPayment.toFixed(2)}</strong></li>
            <li class="list-group-item">Total Payment: <strong>$${totalPayment.toFixed(2)}</strong></li>
            <li class="list-group-item">Total Interest: <strong>$${totalInterest.toFixed(2)}</strong></li>
        </ul>
    `
    document.getElementById("loan_info").innerHTML = info;

    // Generate amortization table
    generateAmortizationTable(principal, monthlyRate, monthlyPayment, months);

};

// Arrow function to generate amortization schedule
const generateAmortizationTable = (principal, rate, payment, months) => {
    let balance = principal;
    let rows = "";

    for (let i = 1; i <= months; i++) {
        const interest = balance * rate;
        const principalPaid = payment - interest;
        balance -= principalPaid;

        const row = `
            <tr>
                <td>${i}</td>
                <td>$${payment.toFixed(2)}</td>
                <td>$${principalPaid.toFixed(2)}</td>
                <td>$${interest.toFixed(2)}</td>
                <td>$${balance > 0 ? balance.toFixed(2) : '0.00'}</td>
            </tr>
        `;
        rows += row; // ✅ Append each row
    }
    const table =`
        <h5 class="mb-3">Amortization Schedule</h5>
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="table-dark">
                    <tr>
                        <th>Month</th>
                        <th>Payment</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
    document.getElementById("tablehtml").innerHTML = table;
};

document.getElementById("btnReset").addEventListener("click", () => {
    document.getElementById("loan_info").innerHTML = "";
    document.getElementById("tablehtml").innerHTML = "";
    clearError();
});

// Arrow function to show errors
const showError = (error) => {
    // Create an error div
    clearError();
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger mt-3";
    errorDiv.textContent = error;
    document.querySelector(".card-body").prepend(errorDiv);
};

// Arrow function to clear the error
const clearError = () => { 
   const existingError = document.querySelector(".alert-danger");
   if(existingError) {
    existingError.remove();
   }
};