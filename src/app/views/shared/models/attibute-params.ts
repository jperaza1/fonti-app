export class AttributeParams {
    id: number;
    attributeId: number;
    attribute: string;
    constructor(id: number, attributeId: number, attribute: string) {
        this.id = id;
        this.attribute = attribute;
        this.attributeId = attributeId;
    }
}