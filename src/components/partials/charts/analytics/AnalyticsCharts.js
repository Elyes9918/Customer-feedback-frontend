import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { VectorMap } from "react-jvectormap";
import {
  analyticOvData,
  analyticAuData,
  worldMap,
  analyticOvDataSet2,
  analyticOvDataSet3,
  TrafficChannelDoughnutData,
  TrafficChannelDoughnutData2,
  TrafficChannelDoughnutData3,
  TrafficChannelDoughnutData4,
  deviceStatusData,
  deviceStatusDataSet2,
  deviceStatusDataSet3,
  deviceStatusDataSet4,
} from "./AnalyticsData";
import { useTranslation } from "react-i18next";

export const AudienceLineChart = ({ state }) => {
  const [data, setData] = useState(analyticOvData);
  useEffect(() => {
    let object;
    if (state === "day-7") {
      object = analyticOvDataSet2;
    } else {
      object = analyticOvDataSet3;
    }
    setData(object);
  }, [state]);
  return (
    <Line
      className="analytics-line-large"
      data={data}
      options={{
        legend: {
          display: false,
          labels: {
            boxWidth: 12,
            padding: 20,
            fontColor: "#6783b8",
          },
        },
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          backgroundColor: "#fff",
          borderColor: "#eff6ff",
          borderWidth: 2,
          titleFontSize: 13,
          titleFontColor: "#6783b8",
          titleMarginBottom: 6,
          bodyFontColor: "#9eaecf",
          bodyFontSize: 12,
          bodySpacing: 4,
          yPadding: 10,
          xPadding: 10,
          footerMarginTop: 0,
          displayColors: false,
        },
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                fontSize: 12,
                fontColor: "#9eaecf",
                padding: 8,
                stepSize: 2400,
              },
              gridLines: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132,0.2)",
              },
            },
          ],
          xAxes: [
            {
              display: false,
              ticks: {
                fontSize: 12,
                fontColor: "#9eaecf",
                source: "auto",
                padding: 0,
              },
              gridLines: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "transparent",
                offsetGridLines: true,
              },
            },
          ],
        },
      }}
    ></Line>
  );
};

export const ActiveUserBarChart = () => {
  return (
    <Bar
      data={analyticAuData}
      options={{
        legend: {
          display: false,
          labels: false,
        },
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            title: function (tooltipItem, data) {
              return false; //data['labels'][tooltipItem[0]['index']];
            },
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex]["data"][tooltipItem["index"]];
            },
          },
          backgroundColor: "#eff6ff",
          titleFontSize: 9,
          titleFontColor: "#6783b8",
          titleMarginBottom: 6,
          bodyFontColor: "#9eaecf",
          bodyFontSize: 9,
          bodySpacing: 4,
          yPadding: 6,
          xPadding: 6,
          footerMarginTop: 0,
          displayColors: false,
        },
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: false,
                fontSize: 12,
                fontColor: "#9eaecf",
                padding: 0,
                display: false,
                stepSize: 300,
              },
              gridLines: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          ],
          xAxes: [
            {
              display: false,
              ticks: {
                fontSize: 12,
                fontColor: "#9eaecf",
                source: "auto",
                padding: 0,
              },
              gridLines: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "transparent",
                offsetGridLines: true,
              },
            },
          ],
        },
      }}
    ></Bar>
  );
};

export const WPCharts = ({ data, className }) => {
  return (
    <Line
      className={className}
      data={data}
      options={{
        legend: {
          display: false,
          labels: {
            boxWidth: 12,
            padding: 20,
            fontColor: "#6783b8",
          },
        },
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            title: function (tooltipItem, data) {
              return false; //data['labels'][tooltipItem[0]['index']];
            },
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex]["data"][tooltipItem["index"]];
            },
          },
          backgroundColor: "#eff6ff",
          titleFontSize: 9,
          titleFontColor: "#6783b8",
          titleMarginBottom: 6,
          bodyFontColor: "#9eaecf",
          bodyFontSize: 9,
          bodySpacing: 4,
          yPadding: 6,
          xPadding: 6,
          footerMarginTop: 0,
          displayColors: false,
        },
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: false,
                fontSize: 12,
                fontColor: "#9eaecf",
                padding: 0,
                stepSize: 300,
              },
              gridLines: {
                color: "rgba(82, 100, 132, 0.2)",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132, 0.2)",
              },
            },
          ],
          xAxes: [
            {
              display: false,
              ticks: {
                fontSize: 12,
                fontColor: "#9eaecf",
                source: "auto",
                padding: 0,
              },
              gridLines: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "rgba(82, 100, 132,0.2)",
                offsetGridLines: true,
              },
            },
          ],
        },
      }}
    ></Line>
  );
};

export const TCDoughnut = ({ state, className }) => {
  const [data, setData] = useState(TrafficChannelDoughnutData);
  useEffect(() => {
    if (state === "7") {
      setData(TrafficChannelDoughnutData2);
    } else if (state === "15") {
      setData(TrafficChannelDoughnutData3);
    } else {
      setData(TrafficChannelDoughnutData4);
    }
  }, [state]);
  return (
    <Doughnut
      className={className}
      data={data}
      options={{
        legend: {
          display: false,
        },
        rotation: -1.5,
        cutoutPercentage: 70,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          backgroundColor: "#fff",
          borderColor: "#eff6ff",
          borderWidth: 2,
          titleFontSize: 13,
          titleFontColor: "#6783b8",
          titleMarginBottom: 6,
          bodyFontColor: "#9eaecf",
          bodyFontSize: 12,
          bodySpacing: 4,
          yPadding: 10,
          xPadding: 10,
          footerMarginTop: 0,
          displayColors: false,
        },
      }}
    ></Doughnut>
  );
};

export const SessionDoughnut = ({  className,openP,waitingP,closedP,ClosedP1 }) => {

  const {t}= useTranslation();


   var ProjectData = {
    labels: [`${t('dashboard.Open')}`, `${t('dashboard.Waiting')}`, `${t('dashboard.Closed')}`],
    dataUnit: "People",
    legend: false,
    datasets: [
      {
        borderColor: "#fff",
        backgroundColor: ["#9cabff", "#b8acff", "#7de1f8"],
        data: [openP, waitingP,closedP],
      },
    ],
  };

  const [data, setData] = useState(ProjectData);

  useEffect(()=>{

  },[openP,waitingP,closedP])

  return (
    <Doughnut
      className={className}
      data={data}
      options={{
        legend: {
          display: false,
        },
        rotation: -1.5,
        cutoutPercentage: 70,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          backgroundColor: "#fff",
          borderColor: "#eff6ff",
          borderWidth: 2,
          titleFontSize: 13,
          titleFontColor: "#6783b8",
          titleMarginBottom: 6,
          bodyFontColor: "#9eaecf",
          bodyFontSize: 12,
          bodySpacing: 4,
          yPadding: 10,
          xPadding: 10,
          footerMarginTop: 0,
          displayColors: false,
        },
      }}
    ></Doughnut>
  );
};

export const FeedbackDoughnut = ({  className,open,inProgress,toReview,completed }) => {

  const {t}= useTranslation();


  var ProjectData = {
   labels: [`${t('dashboard.Open')}`, `${t('dashboard.InProgress')}`, `${t('dashboard.ToReview')}`,`${t('dashboard.Completed')}`],
   dataUnit: "People",
   legend: false,
   datasets: [
     {
       borderColor: "#fff",
       backgroundColor: ["#9cabff", "#b8acff", "#7de1f8","#2596be"],
       data: [open, inProgress,toReview,completed],
     },
   ],
 };

 const [data, setData] = useState(ProjectData);

 useEffect(()=>{

 },[open,inProgress,toReview,completed])

 return (
   <Doughnut
     className={className}
     data={data}
     options={{
       legend: {
         display: false,
       },
       rotation: -1.5,
       cutoutPercentage: 70,
       maintainAspectRatio: false,
       tooltips: {
         enabled: true,
         backgroundColor: "#fff",
         borderColor: "#eff6ff",
         borderWidth: 2,
         titleFontSize: 13,
         titleFontColor: "#6783b8",
         titleMarginBottom: 6,
         bodyFontColor: "#9eaecf",
         bodyFontSize: 12,
         bodySpacing: 4,
         yPadding: 10,
         xPadding: 10,
         footerMarginTop: 0,
         displayColors: false,
       },
     }}
   ></Doughnut>
 );
};

export const Map = ({ set }) => {
  return (
    <VectorMap
      map={"world_mill"}
      backgroundColor="transparent"
      borderColor="#dee6ed"
      borderOpacity={1}
      height={250}
      borderWidth={1}
      color="#ccd7e2"
      containerClassName="vector-map"
      zoomButtons={false}
      zoomOnScroll={false}
      tooltip={true}
      regionStyle={{
        initial: {
          fill: "#e4e4e4",
          "fill-opacity": 0.9,
          stroke: "none",
          "stroke-width": 0,
          "stroke-opacity": 0,
        },
        hover: {
          "fill-opacity": 0.8,
          hoverColor: "#9cabff",
          hoverOpacity: null,
          cursor: "pointer",
        },
        selectedHover: {},
      }}
      series={{
        regions: [
          {
            values: set === "30" ? worldMap.data2 : set === "7" ? worldMap.data3 : worldMap.data4,
            scale: ["#ccd7e2", "#798bff"],
            normalizeFunction: "polynomial",
          },
        ],
      }}
    ></VectorMap>
  );
};
