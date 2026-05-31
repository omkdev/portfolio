import CountUpModule from 'react-countup'

const CountUp = CountUpModule.default?.default ?? CountUpModule.default ?? CountUpModule

export default function MetricCounter({ value, decimals = 0, prefix = '', suffix = '' }) {
  return (
    <span className="font-heading text-3xl font-bold text-accent">
      {prefix}
      <CountUp
        end={value}
        decimals={decimals}
        duration={2}
        enableScrollSpy
        scrollSpyOnce
      />
      {suffix}
    </span>
  )
}
