

import ProgressBar from '../ProgressBar/ProgressBar'
import { Flex, Modal } from 'antd'

type modalType = {
    data: {
        name: string,
        sprites: {
            versions: {
                'generation-v': {
                    'black-white': {
                        animated: {
                            'front_default': string
                        }
                    }
                }
            }
        },
        height: number,
        stats: []
    },
    enable?: boolean,
    hideModal?: () => void
}

//antd config 


const ModalCustom = ({data, enable, hideModal}: modalType) => {
  return (
    <Modal title={data && data.name} open={enable} onCancel={hideModal} footer={null}>
            <Flex vertical align="center" justify="center">
              <img
                style={{ width: 200, height: 200 }}
                alt={data && data.name}
                src={
                  data.sprites.versions?.["generation-v"]?.["black-white"]
                    .animated?.["front_default"]
                }
              ></img>
              <Flex vertical align="left" style={{marginTop: 20, width: '100%'}}>
                  <ProgressBar height={data?.height} stats={data.stats}></ProgressBar>
              </Flex>
            </Flex>
    </Modal>
  )
}

export default ModalCustom