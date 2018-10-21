import {Project} from '../../../../../../server/data-types';

export interface SimpleProjectCard extends Project.Simple{
  columnSpan:number;
}

//TODO need to be changed
const temp = 8;
const kwakiDayProjectNumber = 2;

export const wideCardProjectNumberList = [kwakiDayProjectNumber, temp];
