export class LocalDocumentationDto {
    entity: string;
    entityId: number;
    documentType: string;
    fileName: string;
    externalId: number;
    /**
     *
     */
    constructor(entity: string,
        entityId: number,
        documentType: string,
        fileName: string,
        externalId: number) {
        this.entity = entity;
        this.entityId = entityId;
        this.documentType = documentType;
        this.fileName = fileName;
        this.externalId = externalId;
    }
}