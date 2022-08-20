
import { BarChart } from "recharts";
import {  Tooltip, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';


import { useState, useEffect } from "react";


const StackedChart = (props) => {

    const [chartData , setChartData] = useState([]);
    
    const chilled = props.cleaning.filter(item => item.location.section === 'Chilled');
    const ambient = props.cleaning.filter(item => item.location.section === 'Ambient');
    const frv = props.cleaning.filter(item => item.location.section === 'FRV');
    const bread = props.cleaning.filter(item => item.location.section === 'BreadandCakes');
    const bws = props.cleaning.filter(item => item.location.section === 'BWS');
    const frozen = props.cleaning.filter(item => item.location.section === 'Frozen');
    useEffect(() => {
    const data = [
        {
          name: 'Ambient',
          Scheduled: ambient.filter(item => !item.isOverDue).length,
          Overdue: ambient.filter(item => item.isOverDue).length,
          Bays: props.store.filter(item => item.section === 'Ambient').length,
        },
        {
            name: 'Chilled',
            Scheduled: chilled.filter(item => !item.isOverDue).length,
            Overdue: chilled.filter(item => item.isOverDue).length,
            Bays: props.store.filter(item => item.section === 'Chilled').length,
        },
        {
            name: 'FRV',
            Scheduled: frv.filter(item => !item.isOverDue).length,
            Overdue: frv.filter(item => item.isOverDue).length,
            Bays: props.store.filter(item => item.section === 'FRV').length,
        },
        {
              name: 'Bread and Cakes',
              Scheduled: bread.filter(item => !item.isOverDue).length,
              Overdue: bread.filter(item => item.isOverDue).length,
              Bays: props.store.filter(item => item.section === 'BreadandCakes').length,
        },
        {
            name: 'BWS',
            Scheduled: bws.filter(item => !item.isOverDue).length,
            Overdue: bws.filter(item => item.isOverDue).length,
            Bays: props.store.filter(item => item.section === 'BWS').length,
        },
        {
              name: 'Frozen',
              Scheduled: frozen.filter(item => !item.isOverDue).length,
              Overdue: frozen.filter(item => item.isOverDue).length,
              Bays: props.store.filter(item => item.section === 'FRV').length,
        }
       
      ];
      setChartData(data);
    }, [props.cleaning, props.store]);
    console.log(JSON.stringify(chartData));
    if(props.cleaning.length < 1)
        return(<></>);
    return (
        
        <>
            <ResponsiveContainer width="100%" height={400}>
            <BarChart
            width={950}
            height={350}
            data={chartData}
            margin={{
              top: 50,
              right: 10,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip/>
            <Legend />
            <Bar dataKey="Bays" stackId="a" fill="#55ff99" />
            <Bar dataKey="Overdue" stackId="c" fill="#ff6666" />
            <Bar dataKey="Scheduled" stackId="b" fill="#ffbb99" />
            
          </BarChart>
          </ResponsiveContainer>
          </>
        
       
      );
}


export default StackedChart;
