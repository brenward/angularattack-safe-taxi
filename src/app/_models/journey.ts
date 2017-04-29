import { Driver } from "../../../app/_models/driver";
import { Passenger } from "../../../app/_models/passenger";

export class Journey {
  constructor(
    journeyId: number,
    dateOfJourney: string,
    origin: string,
    destination: string,
    cost: number,
    passengers:Passenger[],
    driver:Driver
  ) {  }
}