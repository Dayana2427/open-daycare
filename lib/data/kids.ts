export type AvatarColor = "sky" | "pink" | "green" | "yellow" | "purple";
export type ParentStatus = "active" | "pending";

export interface KidParent {
  name: string;
  relation: string;
  status: ParentStatus;
  statusDetail: string;
  initial: string;
  color: AvatarColor;
}

export interface Kid {
  id: string;
  name: string;
  age: number;
  room: string;
  birthDate: string;
  admittedSince: string;
  allergyTag?: string;
  allergyNote?: string;
  color: AvatarColor;
  parents: KidParent[];
}

export const kids: Kid[] = [
  {
    id: "mateo",
    name: "Mateo Fernández",
    age: 3,
    room: "Soles",
    birthDate: "12 mar 2022",
    admittedSince: "feb 2025",
    allergyTag: "MANÍ",
    allergyNote: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    color: "sky",
    parents: [
      {
        name: "Lucía Fernández",
        relation: "Mamá",
        status: "active",
        statusDetail: "activa",
        initial: "L",
        color: "purple",
      },
      {
        name: "Diego Fernández",
        relation: "Papá",
        status: "pending",
        statusDetail: "invitación enviada",
        initial: "D",
        color: "sky",
      },
    ],
  },
  {
    id: "sofia",
    name: "Sofía Méndez",
    age: 2,
    room: "Soles",
    birthDate: "14 ago 2023",
    admittedSince: "mar 2025",
    color: "pink",
    parents: [
      {
        name: "Paula Méndez",
        relation: "Mamá",
        status: "active",
        statusDetail: "activa",
        initial: "P",
        color: "green",
      },
    ],
  },
  {
    id: "benjamin",
    name: "Benjamín Ruiz",
    age: 3,
    room: "Soles",
    birthDate: "25 nov 2022",
    admittedSince: "feb 2025",
    color: "green",
    parents: [
      {
        name: "Camila Ruiz",
        relation: "Mamá",
        status: "active",
        statusDetail: "activa",
        initial: "C",
        color: "pink",
      },
      {
        name: "Ignacio Ruiz",
        relation: "Papá",
        status: "pending",
        statusDetail: "invitación enviada",
        initial: "I",
        color: "yellow",
      },
    ],
  },
  {
    id: "valentina",
    name: "Valentina Soto",
    age: 2,
    room: "Soles",
    birthDate: "3 ene 2024",
    admittedSince: "may 2025",
    color: "yellow",
    parents: [],
  },
  {
    id: "tomas",
    name: "Tomás Díaz",
    age: 3,
    room: "Soles",
    birthDate: "19 abr 2022",
    admittedSince: "feb 2025",
    allergyTag: "LACTOSA",
    allergyNote: "Alergia a la lactosa. Ofrecer alternativas sin lácteos en las comidas.",
    color: "purple",
    parents: [
      {
        name: "Andrea Díaz",
        relation: "Mamá",
        status: "active",
        statusDetail: "activa",
        initial: "A",
        color: "sky",
      },
    ],
  },
  {
    id: "emma",
    name: "Emma Castro",
    age: 2,
    room: "Soles",
    birthDate: "7 sep 2023",
    admittedSince: "abr 2025",
    color: "pink",
    parents: [
      {
        name: "Rodrigo Castro",
        relation: "Papá",
        status: "pending",
        statusDetail: "invitación enviada",
        initial: "R",
        color: "purple",
      },
    ],
  },
  {
    id: "lucas",
    name: "Lucas Romero",
    age: 3,
    room: "Soles",
    birthDate: "30 may 2022",
    admittedSince: "mar 2025",
    color: "sky",
    parents: [
      {
        name: "Fernanda Romero",
        relation: "Mamá",
        status: "active",
        statusDetail: "activa",
        initial: "F",
        color: "yellow",
      },
    ],
  },
  {
    id: "olivia",
    name: "Olivia Vega",
    age: 2,
    room: "Soles",
    birthDate: "21 oct 2023",
    admittedSince: "may 2025",
    color: "green",
    parents: [
      {
        name: "Daniela Vega",
        relation: "Mamá",
        status: "active",
        statusDetail: "activa",
        initial: "D",
        color: "pink",
      },
    ],
  },
];

export function getKidById(id: string): Kid | undefined {
  return kids.find((kid) => kid.id === id);
}
