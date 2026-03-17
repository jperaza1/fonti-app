export class LegStatusTypeEnum {
    public static Unscheduled: number = 1;
    public static Open: number = 2;
    public static Hot: number = 3;
    public static Dispatched: number = 4;
    public static InTransit: number = 5;
    public static Completed: number = 6;
    public static None: number = 7;
    public static GetStringValue(status: number): string {
        switch (status) {
            case LegStatusTypeEnum.Unscheduled:
                return "ALL";
            case LegStatusTypeEnum.Open:
                return "PENDING";
            case LegStatusTypeEnum.Hot:
                return "PENDING";
            case LegStatusTypeEnum.Dispatched:
                return "DISPATCHED";
            case LegStatusTypeEnum.InTransit:
                return "IN TRANSIT";
            case LegStatusTypeEnum.Completed:
                return "COMPLETED";
            default:
                return "CUSTOM FILTER";
        }
    }
}