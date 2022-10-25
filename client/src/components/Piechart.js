import * as React from 'react';
import { ResponsivePie } from '@nivo/pie';

const Piechart = ({ tokens, priceObject }) => {
  const handle = {
    padClick: (data) => {
      console.log(data);
    },

    legendClick: (data) => {
      console.log(data);
    },
  };

  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div style={{ width: '550px', height: '375px', margin: '0' }}>
      <ResponsivePie
        isInteractive={false}
        /**
         * chart에 사용될 데이터
         */
        data={[
          {
            id: tokens[0].name,
            value: tokens[0].count * priceObject[tokens[0].id]?.usd,
          },
          {
            id: tokens[1].name,
            value: tokens[1].count * priceObject[tokens[1].id]?.usd,
          },
          {
            id: tokens[2].name,
            value: tokens[2].count * priceObject[tokens[2].id]?.usd,
          },
          {
            id: tokens[3].name,
            value: tokens[3].count * priceObject[tokens[3].id]?.usd,
          },
        ]}
        /**
         * chart margin
         */
        margin={{ top: 40, right: 0, bottom: 80, left: 40 }}
        /**
         * chart 중간 빈공간 반지름
         */
        innerRadius={0.5}
        // 표시형식
        valueFormat=" >-$,"
        /**
         * pad 간격
         */
        padAngle={1.8}
        /**
         * pad radius 설정 (pad별 간격이 있을 시 보임)
         */
        cornerRadius={8}
        /**
         * chart 색상
         */
        colors={{ scheme: 'yellow_orange_red' }} // 커스터하여 사용할 때
        // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
        /**
         * pad border 두께 설정
         */
        borderWidth={2}
        /**
         * link label skip할 기준 각도
         */
        arcLinkLabelsSkipAngle={0}
        /**
         * link label 색상
         */
        arcLinkLabelsTextColor="#000000"
        /**
         * link label 연결되는 선 두께
         */
        arcLinkLabelsThickness={2}
        /**
         * link label 연결되는 선 색상
         */
        arcLinkLabelsColor={{ from: 'color' }} // pad 색상에 따라감
        /**
         * label (pad에 표현되는 글씨) skip할 기준 각도
         */
        arcLabelsSkipAngle={10}
        theme={{
          /**
           * label style (pad에 표현되는 글씨)
           */
          labels: {
            text: {
              fontSize: 12,
              fill: '#000000',
            },
          },
          /**
           * legend style (default로 하단에 있는 색상별 key 표시)
           */
          legends: {
            text: {
              fontSize: 12,
              fill: '#000000',
            },
          },
        }}
        /**
         * pad 클릭 이벤트
         */
        onClick={handle.padClick}
        /**
         * legend 설정 (default로 하단에 있는 색상별 key 표시)
         */
        legends={[
          {
            anchor: 'bottom', // 위치
            direction: 'row', // item 그려지는 방향
            justify: false, // 글씨, 색상간 간격 justify 적용 여부
            translateX: 0, // chart와 X 간격
            translateY: 56, // chart와 Y 간격
            itemsSpacing: 0, // item간 간격
            itemWidth: 100, // item width
            itemHeight: 18, // item height
            itemDirection: 'left-to-right', // item 내부에 그려지는 방향
            itemOpacity: 1, // item opacity
            symbolSize: 18, // symbol (색상 표기) 크기
            symbolShape: 'square', // symbol (색상 표기) 모양
            effects: [
              {
                // 추가 효과 설정 (hover하면 textColor를 olive로 변경)
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
            onClick: handle.legendClick, // legend 클릭 이벤트
          },
        ]}
      />
    </div>
  );
};

export default Piechart;
