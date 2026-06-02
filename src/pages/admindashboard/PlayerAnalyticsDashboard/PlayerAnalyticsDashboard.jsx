import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SkeletionTable from '@/components/skeleton/Table'
import usePlayerAnalytics from '@/hooks/usePlayerAnalytics'
import { useOutletContext } from 'react-router-dom'

// ── Componentes auxiliares ────────────────────────────────────────────────────

const KpiCard = ({ label, value, sub, color = 'text-slate-900' }) => (
  <div className='bg-white rounded-lg shadow-sm border border-slate-100 p-5 flex flex-col gap-1'>
    <p className='text-xs font-semibold uppercase tracking-widest text-slate-400'>{label}</p>
    <p className={`text-3xl font-black ${color}`}>{value}</p>
    {sub && <p className='text-xs text-slate-400'>{sub}</p>}
  </div>
)

const DAYS_OPTIONS = [
  { label: '7 días',   value: 7  },
  { label: '30 días',  value: 30 },
  { label: '90 días',  value: 90 },
  { label: 'Todo',     value: null },
]

const BUCKET_LABELS = [
  '0-9%', '10-19%', '20-29%', '30-39%', '40-49%',
  '50-59%', '60-69%', '70-79%', '80-89%', '90-100%',
]
const RETENTION_LABELS = ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']

// ── Configuraciones ApexCharts ────────────────────────────────────────────────

const retentionChartOptions = (data) => ({
  chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
  stroke: { curve: 'smooth', width: 3 },
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05 } },
  colors: ['#4669FA'],
  xaxis: {
    categories: RETENTION_LABELS,
    labels: { style: { colors: '#94a3b8', fontFamily: 'Inter', fontSize: '11px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    min: 0, max: 100,
    labels: {
      style: { colors: '#94a3b8', fontFamily: 'Inter', fontSize: '11px' },
      formatter: (v) => v + '%',
    },
  },
  tooltip: { y: { formatter: (v) => v + '% retención' } },
  grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
  dataLabels: { enabled: false },
})

const dropOffChartOptions = {
  chart: { type: 'bar', toolbar: { show: false } },
  colors: ['#FA916B'],
  plotOptions: { bar: { borderRadius: 4, columnWidth: '65%' } },
  xaxis: {
    categories: BUCKET_LABELS,
    labels: { style: { colors: '#94a3b8', fontFamily: 'Inter', fontSize: '11px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: { style: { colors: '#94a3b8', fontFamily: 'Inter', fontSize: '11px' } },
  },
  tooltip: { y: { formatter: (v) => v + ' paradas' } },
  grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
  dataLabels: { enabled: false },
}

// ── Tabla por beat ────────────────────────────────────────────────────────────

const SORT_KEYS = ['plays', 'avg_listen_percent', 'completion_rate', 'conversion_rate', 'save_rate']

const BeatsTable = ({ beats }) => {
  const [sortKey, setSortKey] = useState('plays')
  const [asc, setAsc] = useState(false)

  const sorted = [...beats].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey]
    return asc ? diff : -diff
  })

  const handleSort = (key) => {
    if (key === sortKey) setAsc(!asc)
    else { setSortKey(key); setAsc(false) }
  }

  const ThSort = ({ k, label }) => (
    <th
      className='px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-pointer hover:text-slate-600 select-none whitespace-nowrap'
      onClick={() => handleSort(k)}
    >
      {label} {sortKey === k ? (asc ? '↑' : '↓') : ''}
    </th>
  )

  const Bar = ({ pct, color = 'bg-blue-400' }) => (
    <div className='flex items-center gap-2'>
      <div className='flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden'>
        <div className={`h-full ${color} rounded-full`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <span className='text-xs tabular-nums w-10 text-right'>{pct}%</span>
    </div>
  )

  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm'>
        <thead className='bg-slate-50 border-b border-slate-200'>
          <tr>
            <th className='px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400'>Beat</th>
            <ThSort k='plays'              label='Plays' />
            <ThSort k='avg_listen_percent' label='Avg escucha' />
            <ThSort k='completion_rate'    label='Completados' />
            <ThSort k='conversion_rate'    label='Conversión' />
            <ThSort k='save_rate'          label='Guardados' />
            <th className='px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400'>Compras</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100'>
          {sorted.map((beat) => (
            <tr key={beat.id} className='hover:bg-slate-50 transition-colors'>
              <td className='px-4 py-3 font-semibold text-slate-800 max-w-[200px] truncate'>{beat.name}</td>
              <td className='px-4 py-3 tabular-nums font-black text-slate-700'>{beat.plays.toLocaleString()}</td>
              <td className='px-4 py-3 w-36'><Bar pct={beat.avg_listen_percent} color='bg-blue-400' /></td>
              <td className='px-4 py-3 w-36'><Bar pct={beat.completion_rate}    color='bg-green-400' /></td>
              <td className='px-4 py-3 w-36'><Bar pct={beat.conversion_rate}    color='bg-amber-400' /></td>
              <td className='px-4 py-3 w-36'><Bar pct={beat.save_rate}          color='bg-purple-400' /></td>
              <td className='px-4 py-3 tabular-nums text-slate-600'>{beat.conversions}</td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={7} className='px-4 py-10 text-center text-slate-400 text-sm'>
                Sin datos en este período
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function PlayerAnalyticsDashboard () {
  const { AxiosPrivate } = useOutletContext()
  const { analytics, isLoading, loadAnalytics } = usePlayerAnalytics({ AxiosPrivate })
  const [days, setDays] = useState(30)

  useEffect(() => { loadAnalytics(days) }, [days])

  const g  = analytics?.global  ?? {}
  const retention = analytics?.retention ?? []
  const dropOff   = analytics?.drop_off  ?? []
  const beats     = analytics?.beats     ?? []

  return (
    <div className='w-full min-h-screen bg-slate-50 py-10'>
      <div className='container'>

        {/* Header */}
        <div className='flex items-center justify-between mb-8 flex-wrap gap-4'>
          <div>
            <h2 className='text-2xl font-black text-slate-900'>Player Analytics</h2>
            <p className='text-slate-400 text-sm mt-1'>Métricas de conversión basadas en el reproductor</p>
          </div>
          <div className='flex gap-2'>
            {DAYS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDays(opt.value)}
                className={`px-3 py-1.5 text-xs font-bold rounded border transition-colors ${
                  days === opt.value
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading && <SkeletionTable />}

        {!isLoading && analytics && (
          <>
            {/* KPI Cards */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
              <KpiCard
                label='Reproducciones'
                value={g.total_plays?.toLocaleString() ?? '—'}
                sub={`${g.plays_with_data?.toLocaleString() ?? 0} con datos de escucha`}
              />
              <KpiCard
                label='Escucha media'
                value={g.avg_listen_percent ? g.avg_listen_percent + '%' : '—'}
                sub='Porcentaje promedio escuchado'
                color='text-blue-600'
              />
              <KpiCard
                label='Tasa completados'
                value={g.completion_rate ? g.completion_rate + '%' : '—'}
                sub='Escucharon ≥ 90% del beat'
                color='text-green-600'
              />
              <KpiCard
                label='Conversión'
                value={g.conversion_rate ? g.conversion_rate + '%' : '—'}
                sub={`${g.total_conversions ?? 0} compras totales`}
                color='text-amber-600'
              />
            </div>

            {/* Charts */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
              <Card title='Curva de retención'>
                <p className='text-xs text-slate-400 mb-3'>
                  % de reproducciones que llegan a cada punto de la pista
                </p>
                {retention.length > 0
                  ? <Chart
                      options={retentionChartOptions(retention)}
                      series={[{ name: 'Retención', data: retention }]}
                      type='area'
                      height={260}
                    />
                  : <p className='text-slate-400 text-sm py-10 text-center'>Sin datos suficientes</p>
                }
              </Card>

              <Card title='Drop-off distribution'>
                <p className='text-xs text-slate-400 mb-3'>
                  Nº de escuchas que terminaron en cada tramo del beat
                </p>
                {dropOff.some(v => v > 0)
                  ? <Chart
                      options={dropOffChartOptions}
                      series={[{ name: 'Paradas', data: dropOff }]}
                      type='bar'
                      height={260}
                    />
                  : <p className='text-slate-400 text-sm py-10 text-center'>Sin datos suficientes</p>
                }
              </Card>
            </div>

            {/* Per-beat table */}
            <Card title={`Rendimiento por beat — Top ${beats.length}`}>
              <p className='text-xs text-slate-400 mb-4'>
                Haz click en las cabeceras para ordenar. "Conversión" = compras / plays.
              </p>
              <BeatsTable beats={beats} />
            </Card>
          </>
        )}

        {!isLoading && !analytics && (
          <div className='text-center py-20 text-slate-400'>
            No se pudieron cargar los datos de analytics.
          </div>
        )}
      </div>
    </div>
  )
}
