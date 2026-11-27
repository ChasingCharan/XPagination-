import { useState, useEffect } from 'react'
import './App.css'

const API_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
const ROWS_PER_PAGE = 10;

function App() {

  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        alert("failed to fetch data");
        console.error("Error fetching employee data:", error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const totalPages = Math.ceil(employees.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentEmployees = employees.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }   

  return(
    <div className='app'>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span className="page-number">{currentPage}</span>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>

  );
}

export default App
