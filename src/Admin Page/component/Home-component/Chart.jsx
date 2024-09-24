import React, { useContext, useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Spinner from '../../../popup box/Spinner';
import { formContext } from '../../../context/AdminContext';
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
    const [pending, setPending] = useState(0)
    const [shipped, setShipped] = useState(0)
    const [deliverd, setDeliverd] = useState(0)
    const {updateStatus, loading, order, isAdmin} = useContext(formContext)

    console.log(order);
    

      useEffect(()=> {
            setPending(order?.data?.filter((item)=> item.status === "pending").length)
            setShipped(order?.data?.filter((item)=> item.status === "Shipped").length)
            setDeliverd(order?.data?.filter((item)=> item.status === "Delivered").length)
            
            
        },[isAdmin,updateStatus,order])
        
        console.log(order?.data?.filter((item)=> item.status === "Delivered"));
        console.log(pending);
        console.log(shipped);
        console.log(deliverd);
      

    const data = {
        labels: ['Pending', 'Shipped', 'Delivered'],
        datasets: [
          {
            label: 'total',
            data: [pending,shipped,deliverd],
            backgroundColor: [
              '#4B6A9B', '#FF7F7F', '#4CAF50', '#FFC107'
            ],
            borderColor: [
              '#4B6A9B', '#FF7F7F', '#4CAF50', '#FFC107'
            ],
            borderWidth: 1,
          },
        ],
      };
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      };

      if (loading) {
        return <div><Spinner /></div>;
      }    

  return (
    <div>
    <h1 className='pieChart'>Pie Chart</h1>
    <Pie className='pieChart-chart' data={data} options={options} />
  </div>
);
};

export default Chart