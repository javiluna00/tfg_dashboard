import React from 'react'
import Chart from 'react-apexcharts'

const RevenueBarChart = ({ height = 400, statistics }) => {
  const { earnsByMonthLastSixMonths, soldBeatsByMonthLastSixMonths } = statistics

  const currentMonth = new Date().getMonth()
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  const series = [
    {
      name: 'Ingresos totales',
      data: earnsByMonthLastSixMonths
    },
    {
      name: 'Beats',
      data: soldBeatsByMonthLastSixMonths
    }
  ]
  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '45%'
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '12px',
      fontFamily: 'Inter',
      offsetY: -30,
      markers: {
        width: 8,
        height: 8,
        offsetY: -1,
        offsetX: -5,
        radius: 12
      },
      labels: {
        colors: '#475569'
      },
      itemMargin: {
        horizontal: 18,
        vertical: 0
      }
    },
    title: {
      text: 'Gráfico detallado por mes',
      align: 'left',

      offsetX: 0,
      offsetY: 13,
      floating: false,
      style: {
        fontSize: '20px',
        fontWeight: '500',
        fontFamily: 'Inter',
        color: '#0f172a'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    yaxis: {
      opposite: false,
      labels: {
        style: {
          colors: '#475569',
          fontFamily: 'Inter'
        }
      }
    },
    xaxis: {
      categories: Array.from({ length: 6 }, (_, i) => labels[(currentMonth - i + 12) % 12]).reverse(),
      labels: {
        style: {
          colors: '#475569',
          fontFamily: 'Inter'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },

    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        }
      }
    },
    colors: ['#4669FA', '#0CE7FA', '#FA916B'],
    grid: {
      show: true,
      borderColor: '#E2E8F0',
      strokeDashArray: 10,
      position: 'back'
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          legend: {
            position: 'bottom',
            offsetY: 8,
            horizontalAlign: 'center'
          },
          plotOptions: {
            bar: {
              columnWidth: '80%'
            }
          }
        }
      }
    ]
  }
  return (
    <div>
      <Chart options={options} series={series} type='bar' height={height} />
    </div>
  )
}

export default RevenueBarChart
