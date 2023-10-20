import { EllipsisOutlined } from "@ant-design/icons";

import "./PokemonsCard.css";

import { Avatar, Card, Flex, Modal, Space } from "antd";

import React, { useState } from "react";

import { useQuery } from "react-query";
import axios from "axios";
import { colorsTypes } from "../../helpers/colorsTypes";
import ProgressBar from "../ProgressBar/ProgressBar";

type PokemonPropsType = {
  url: string;
};

type typeObject = {
  name: string;
  url: string;
};

interface ItemTypeInterface {
  type: typeObject;
}

const PokemonsCard: React.FC<PokemonPropsType> = ({ url }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const { data, isLoading } = useQuery(url, async () => {
    return axios.get(url).then((response) => response.data);
  });

  const { Meta } = Card;

  return (
    <>
      {!isLoading && (
        <>
          <Card
            className="ColdAdjust"
            style={{
              width: 200,
              height: 350,
              alignItems: "center",
              border: "1px solid #263238",
            }}
            cover={
              <img
                style={{
                  width: 180,
                  height: 180,
                  margin: "auto auto",
                }}
                alt={data.name}
                src={data.sprites.other.dream_world.front_default}
              />
            }
            actions={[
              <EllipsisOutlined
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto auto",
                  width: "80%",
                  height: 40,
                  background: "rgb(49, 59, 68)",
                  color: "white",
                  borderRadius: "7px",
                }}
                key="ellipsis"
                onClick={showModal}
              />,
            ]}
          >
            <Meta
              avatar={<Avatar src={data.sprites.front_default} />}
              title={data.name}
            />

            <Space size={[0, 8]} style={{ margin: "4px 4px" }} wrap>
              {data.types.map((item: ItemTypeInterface) => {
                return colorsTypes(item.type.name, data.name);
              })}
            </Space>
          </Card>

          <Modal title={data && data.name} open={open} onCancel={hideModal}>
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
        </>
      )}
    </>
  );
};

export default PokemonsCard;
