const job = ["Cashier", "Stocker", "Janitor"];

function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    const selectedJob = document.getElementsByName("job");

    let hasSelected = false;
    let selectedJobTitle = null;

    for (const job of selectedJob) {
        if (job.checked) {
            hasSelected = true;
            selectedJobTitle = job.value;
            break;
        }
    }

    if (hasSelected) {
        alert("Thank you for applying to be a " + selectedJobTitle + "!");
    }
    else {
        alert("Please select a job!");
    }
}