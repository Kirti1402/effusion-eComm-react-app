import React from 'react'

export default function RangeFilter({ min, max, onRangeChange }) {

    const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  return (
    <div>RangeFilter</div>
  )
}
