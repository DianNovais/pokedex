import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Avatar, Card, Space, Tag } from "antd";

import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

type PokemonPropsType = {
  url: string;
};

const PokemonsCard: React.FC<PokemonPropsType> = ({ url }) => {

  const { data, isLoading } = useQuery(url, async () => {
    return axios.get(url).then((response) => response.data);
  });

  const { Meta } = Card;

  return (
    <>
      {!isLoading && (
        <Card
        
          style={{ width: 200, height: 350, alignItems: 'center'}}
          cover={
            <img
                style={{width: 180, height: 180, objectFit: 'cover', margin: 'auto auto'}}
              alt={data.name}
              src={data.sprites.other.dream_world.front_default}
            />
          }
          actions={[<EllipsisOutlined style={{display: 'flex', justifyContent: "center", margin: 'auto auto', width: '80%', height: 40, background: 'rgb(49, 59, 68)', color: 'white', borderRadius: '7px'}} key="ellipsis" />]}
        >
          <Meta
            avatar={
              <Avatar src={data.sprites.front_default} />
            }
            title={data.name}
          />

          <Space size={[0, 8]} style={{margin: '4px 4px'}} wrap>
            <Tag color="magenta">magenta</Tag>
        </Space>
        </Card>
      )}
    </>
  );
};

export default PokemonsCard;
