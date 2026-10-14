export type PostKind = "achievement" | "activity" | "announcement";

export interface Post {
  id: string;
  kind: PostKind;
  authorName: string;
  authorInitial: string;
  time: string;
  audience: string;
  body: string;
  photoLabel?: string;
  likes: number;
  comments: number;
}

export interface CurrentUser {
  name: string;
  role: string;
  initial: string;
  greeting: string;
  roomSummary: string;
}

export const currentUser: CurrentUser = {
  name: "Caro Giménez",
  role: "Maestra · Soles",
  initial: "C",
  greeting: "Buenas, Caro",
  roomSummary: "12 niños · martes 17 jun",
};

export const posts: Post[] = [
  {
    id: "mateo-potty-milestone",
    kind: "achievement",
    authorName: "Mateo",
    authorInitial: "M",
    time: "14:20",
    audience: "Para: familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "mateo-tempera-painting",
    kind: "activity",
    authorName: "Mateo",
    authorInitial: "M",
    time: "09:40",
    audience: "Para: familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photoLabel: "Foto · pintando con témperas",
    likes: 5,
    comments: 2,
  },
  {
    id: "room-park-trip",
    kind: "announcement",
    authorName: "Anuncio general",
    authorInitial: "",
    time: "07:50",
    audience: "Para: toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];
