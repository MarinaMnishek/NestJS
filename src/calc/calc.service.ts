import { Injectable } from '@nestjs/common';
import {Calc} from "./dto/calc.dto";
import {News} from "../api/dto/news.dto";

const calc: Calc[] = [];


@Injectable()
export class CalcService {

    async getCalcItems(): Promise<Calc[]> {
        console.log(calc);
        return calc;
    }

    async createCalcItems(data: Calc): Promise<Calc> {
        calc.push(data);
        return data;
    }

    async calculate(): Promise<Calc[]> {
        calc.forEach(item => {
            switch (item.operation) {
                case '+':
                    item.result = Number(item.firstItem) + Number(item.secondItem)
                    break;
                case '-':
                    item.result = Number(item.firstItem) - Number(item.secondItem)
                    break;
                case '*':
                    item.result = Number(item.firstItem) * Number(item.secondItem)
                    break;
                case '/':
                    item.result = Number(item.firstItem) / Number(item.secondItem)
                    break;
                default:
                    item.result = 'You made a mistake somewhere when entering data'
            }
        })

        console.log('calc', calc)
        return calc;
    }



}
