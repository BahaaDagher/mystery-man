import React from 'react';
import { Colors } from '../../../Theme';
import { getColorBasedOnPercentage } from '../../../utils/colorPercentageUtils';

const X_TICKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const HorizontalBarChart = ({ steps, profileData }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div style={{ width: '100%', marginTop: '40px', fontFamily: "'Tajawal', sans-serif", direction: 'ltr' }}>

      {/* Bars area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '8px' }}>
        {steps.map((step, index) => {
          const value = parseFloat(step.rate?.replace(',', '.') || 0);
          const color = getColorBasedOnPercentage(value, profileData);

          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Label */}
              <div style={{
                width: '130px',
                minWidth: '130px',
                textAlign: 'right',
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#222',
                lineHeight: '1.3',
                wordBreak: 'break-word',
                direction: 'rtl',
              }}>
                {step.name}
              </div>

              {/* Bar track */}
              <div style={{
                flex: 1,
                height: '46px',
                backgroundColor: 'transparent',
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                {/* Filled portion */}
                <div style={{
                  width: `${value}%`,
                  height: '100%',
                  background: `linear-gradient(to right, ${Colors.main}, #a8bfee)`,
                  borderRadius: '2px',
                }} />
              </div>

              {/* Percentage label */}
              <div style={{
                width: '70px',
                minWidth: '70px',
                textAlign: 'left',
                fontSize: '18px',
                fontWeight: 'bold',
                color: color,
              }}>
                {value}%
              </div>
            </div>
          );
        })}
      </div>

      {/* X Axis */}
      <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '6px', paddingLeft: '142px', paddingRight: '82px' }}>
        {/* Relative positioning container matching the bar width */}
        <div style={{ flex: 1, position: 'relative', height: '24px' }}>
          {X_TICKS.map((tick) => (
            <div
              key={tick}
              style={{
                position: 'absolute',
                left: `${tick}%`,
                transform: 'translateX(-50%)',
                fontSize: '11px',
                color: '#555',
                whiteSpace: 'nowrap',
              }}
            >
              {tick}
            </div>
          ))}
          {/* Axis line */}
          <div style={{
            position: 'absolute',
            top: '-4px',
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: '#ccc',
          }} />
        </div>
      </div>

    </div>
  );
};

export default HorizontalBarChart;
