import { OrderOperationType } from './order-operation-type.enum';

export class LegTypeEnum {
    public static None: number = 0;
    public static ChassisOnly: number = 1;
    public static EmptyDelivery: number = 2;
    public static EmptyReturn: number = 3;
    public static LoadedDelivery: number = 4;
    public static LoadedReturn: number = 16;
    public static OffHire: number = 5;
    public static PartialEmptyDelivery: number = 6;
    public static PartialLoadedDelivery: number = 7;
    public static PierPass: number = 8;
    public static PrePullEmpty: number = 9;
    public static PrePullLoaded: number = 10;
    public static Repositioning: number = 11;
    public static StopOff: number = 12;
    public static YardStop: number = 13;
    public static YardStopEmpty: number = 14;
    public static YardStopLoaded: number = 15;
    public static TrailerMove: number = 17;

    public static getLegTypeByOperationType(operationType: number, firstLeg: boolean): number {
        switch (operationType) {
            case OrderOperationType.Import:
                return firstLeg === true ? LegTypeEnum.LoadedDelivery : LegTypeEnum.EmptyReturn;
            case OrderOperationType.Export:
                return firstLeg === true ? LegTypeEnum.EmptyDelivery : LegTypeEnum.LoadedReturn;
            default:
                return LegTypeEnum.None;
        }
    }
    public static getLoadedTypes(): number[] {
        return [
            LegTypeEnum.LoadedDelivery,
            LegTypeEnum.LoadedReturn,
            LegTypeEnum.PartialLoadedDelivery,
            LegTypeEnum.PrePullLoaded,
            LegTypeEnum.YardStopLoaded
        ];
    }
    public static exludeRightSeal(): number[] {
        return [
            LegTypeEnum.EmptyDelivery,
            LegTypeEnum.EmptyReturn,
            LegTypeEnum.PartialEmptyDelivery,
            LegTypeEnum.PrePullEmpty,
            LegTypeEnum.YardStopEmpty,
            LegTypeEnum.ChassisOnly
        ];
    }
}
