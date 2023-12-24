type Identifier = string;

interface Entity {
    id: Identifier;
    createdAt: Date;
    updatedAt: Date;
    removedAt: Date | null;
}

interface PartSort {
    part: string;
    sort: string;
}

interface DocEntity extends Entity, PartSort {}

export type { DocEntity, Identifier };
