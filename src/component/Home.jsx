import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import axios from "axios";

export default function Home({ tkn }) {
  useEffect(() => {
    async function fetchData() {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://front-intern.appssquare.com/api/admin/statistics",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tkn}`,
        },
      };
      try {
        
        const response = await axios.request(config);
        const data = response.data.data;
        console.log(JSON.stringify(response.data));

        const options = {
          chart: {
            height: 280,
            type: "area",
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: true,
          },
          series: [
            {
              name: "Partners Count",
              data: [data.partners_count],
            },
            {
              name: "Order_status",
              data: data.orders.map((item) => item.order_status),
            },
            {
              name: "sum_price",
              data: data.orders.map((item) => item.sum_price),
            },
            {
              name: "Order_count",
              data: data.visits.map((item) => item.order_count),
            },
            {
              name: "Order_count",
              data: data.visits.map((item) => item.sum_price),
            },
          
          ],
          stroke: {
            curve: "smooth",
          },
          fill: {
            type: "smooth",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100],
            },
          },
          xaxis: {
            categories: ["Partners", "Patients", "Order_status", "Order_count"],
          },
          yaxis: {
            max: 1600,
          },
        };
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
        chart.updateSeries(options.series);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [tkn]);

  return (
    <>
    <h1 className="text-center text-info">MediCare Statistics</h1>
      <div id="chart" className="p-5 mt-5"></div>;
    </>
  );
}
