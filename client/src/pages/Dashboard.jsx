import { useEffect } from 'react';

const Dashboard = () => {
  const fetchData = async () => {
    try {
      // const res = await fetch('/');
      const res = await fetch('http://localhost:5000/api/v1');
      const data = await res.json();
      console.log(`🚀CHECK > data:`, data);
    } catch (error) {
      console.log(`🚀CHECK > error:`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Dashboard Page</div>;
};
export default Dashboard;
