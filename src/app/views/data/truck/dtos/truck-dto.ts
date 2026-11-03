export class TruckDto {
  id: number;
  name: string;
  plate: string;
  truckStatus: number;
  truckStatusName: string;
  isActive: boolean;
  routeId: number;
  routeName: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.plate = '';
    this.truckStatus = 1;
    this.isActive = true;
    this.routeId = 0;
    this.routeName = '';
  }
}
