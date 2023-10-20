import { Flex, Progress } from 'antd'
import React from 'react'

type propsType = {
    data: number
}

const ProgressBarLine: React.FC<propsType> = ({data}) => {
  return (
    <Flex>
        
        <Progress
          size={"default"}
          percent={data}
          showInfo={false}
          status="active"
          strokeColor={{ from: "#108ee9", to: "#87d068" }}
          
        />
        <h3>{data}</h3>
      </Flex>
  )
}

export default ProgressBarLine