import { Tag } from "antd";
import {
    blue,
    brown, cyan, deepPurple, green, grey, lime, orange, pink, purple, red, yellow
} from '@mui/material/colors'

export const colorsTypes = (type: string, name: string) => {

    let generated: any = {};

    switch(type){
            case "normal":
                generated = brown[100];
                break;
            case "fighting":
                generated = red[800];
                break;
            case "flying":
                generated = purple[300];
                break;
            case "poison":
                generated = purple[500];
                break;
            case "ground":
                generated = brown[300];
                break;
            case "rock":
                generated = brown[500];
                break;
            case "bug":
                generated = lime[500];
                break;
            case "ghost":
                generated = deepPurple[700];
                break;
            case "steel":
                generated = grey[500];
                break;
            case "fire":
                generated = orange[500];
                break;
            case "water":
                generated = blue[500];
                break;
            case "grass":
                generated = green[500];
                break;
            case "electric":
                generated = yellow[700];
                break;
            case "psychic":
                generated = pink[600];
                break;
            case "ice":
                generated = cyan[500];
                break;
            case "dragon":
                generated = deepPurple[500];
                break;
            case "dark":
                generated = grey[800];
                break;
            case "fairy":
                generated = pink[300];
                break;
    }


    return <Tag color={generated} key={name + type}>{type}</Tag>
}