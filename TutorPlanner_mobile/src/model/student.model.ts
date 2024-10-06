type StudentDTO = {
    id: number;
    firstname: string;
    surename: string;
    class: string | null;
    extendedMath: boolean | null;
    description: string | null;
    defaultPrice: number | null;
};

type StudentsDTO = {
    data: StudentDTO[];
    size: number;
    error?: string;
};

export type { StudentDTO, StudentsDTO };
