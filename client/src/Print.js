import { Route, Routes } from 'react-router-dom';


function Print() {
    let url = window.location.href;
    let params = (new URL(url)).searchParams;
    const alloy = params.get('alloy');
    const batchNumber = params.get('batchNumber');
    const grossWeight = params.get('grossWeight');
    const netWeight = params.get('netWeight');
    // params.getAll('name') # => ["n1", "n2"]
  return (
    <div>
        <h1>Alloy: {alloy}</h1>
        <h1>Batch number: {batchNumber}</h1>
        <h1>Gross weight: {grossWeight}</h1>
        <h1>Net weight: {netWeight}</h1>
    </div>
  );
}

export default Print;
