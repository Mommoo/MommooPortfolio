import {Project} from '../../../../../../data/http/http-data-structure';

export interface PortfolioCard extends Project.Simple {
  columnSpan:number;
}

//TODO need to be changed
const temp = 8;
const kwakiDayProjectNumber = 2;

export const wideCardProjectNumberList = [kwakiDayProjectNumber, temp];
