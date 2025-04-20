// Handle Calculate Button
document.getElementById("btnSubmit").addEventListener("click", () => {
    // Get input values
    const amount = parseFloat(document.getElementById("amount").value);
    const interest = parseFloat(document.getElementById("interest").value);
    const months = parseInt(document.getElementById("months").value);

    // Validate inputs
    if (isNaN(amount) || isNaN(interest) || isNaN(months) || amount <= 0 || interest < 0 || months <= 0) {
        showError("Please enter valid numbers for all fields.");
        return;
    }

    clearError();
    calculateLoan(amount, interest, months);
});

// Clear everything on reset
document.getElementById("btnReset").addEventListener("click", () => {
    document.getElementById("loan_info").innerHTML = "";
    document.getElementById("tablehtml").innerHTML = "";
    clearError();
});

// Loan calculation
const calculateLoan = (principal, interestRate, months) => {
    const monthlyRate = (interestRate / 100) / 12;
    const monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    // Show summary
    const info = `
        <h5 class="mb-3">Loan Summary</h5>
        <ul class="list-group">
            <li class="list-group-item">Monthly Payment: <strong>$${monthlyPayment.toFixed(2)}</strong></li>
            <li class="list-group-item">Total Payment: <strong>$${totalPayment.toFixed(2)}</strong></li>
            <li class="list-group-item">Total Interest: <strong>$${totalInterest.toFixed(2)}</strong></li>
        </ul>
    `;
    document.getElementById("loan_info").innerHTML = info;

    // Generate amortization table
    generateAmortizationTable(principal, monthlyRate, monthlyPayment, months);
};

// Amortization Table
const generateAmortizationTable = (principal, rate, payment, months) => {
    let balance = principal;
    let rows = "";

    for (let i = 1; i <= months; i++) {
        const interest = balance * rate;
        const principalPaid = payment - interest;
        balance -= principalPaid;

        rows += `
            <tr>
                <td>${i}</td>
                <td>$${payment.toFixed(2)}</td>
                <td>$${principalPaid.toFixed(2)}</td>
                <td>$${interest.toFixed(2)}</td>
                <td>$${balance > 0 ? balance.toFixed(2) : '0.00'}</td>
            </tr>
        `;
    }

    const table = `
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

// Show error message
const showError = (message) => {
    clearError();
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger mt-3";
    errorDiv.textContent = message;
    document.querySelector(".card-body").prepend(errorDiv);
};

// Clear error message
const clearError = () => {
    const existingError = document.querySelector(".alert-danger");
    if (existingError) {
        existingError.remove();
    }
};
