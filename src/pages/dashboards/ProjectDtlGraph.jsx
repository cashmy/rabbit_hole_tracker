
import React, { Fragment } from 'react'
import { ResponsiveBar } from "@nivo/bar";

import {
  Box,
  Typography
} from '@mui/joy';

export default function ProjectDtlGraph(props) {
  const {data, layout, groupMode, valueScale, reverse, project_name} = props

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: 'center',
          height: '90%'
          // justifyContent: 'center',
        }}
      >

        <Typography level='h3' >{project_name}</Typography>
        <Typography level='h6'>Rabbit Hole Analysis</Typography>
        <ResponsiveBar
          data={data}
          keys={[
            'completed',
            'total',
            'solutions',
          ]}
          indexBy="type_name"
          margin={{ top: 50, right: 150, bottom: 100, left: 130 }}
          padding={0.3}
          layout={layout}
          groupMode={groupMode}
          valueScale={{ type: valueScale }}
          reverse={reverse}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'category10' }}
          borderColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                1.6
              ]
            ]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: `${layout === 'horizontal' ? 'Rabbit Holes' : 'Type'}`,
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: `${layout === 'horizontal' ? 'Type' : 'Rabbit Holes'}`,
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                2
              ]
            ]
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          role="application"
          ariaLabel="Project detail analysis"
          barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in type of: " + e.indexValue }}
        />
      </Box>
    </Fragment>
  )
}
