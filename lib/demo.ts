import type { ClientData, FileItem, Message } from "./notion";

export const DEMO_CLIENT: ClientData = {
  token: "demo",
  name: "Marie Dupont",
  email: "marie@maisondup.fr",
  projectName: "Brand Film — Maison Dupont",
  status: "V1 prête",
  progress: 60,
  deliveryDate: "2026-05-28",
  freelanceMessage:
    "Bonjour Marie ! Votre V1 est disponible sur Frame.io. Laissez vos retours directement sur la vidéo — c'est la façon la plus efficace. Je reste disponible ici si vous avez des questions.",
  frameioUrl: "https://app.frame.io/reviews/demo",
  figmaUrl: null,
  notionUrl: null,
};

export const DEMO_FILES: FileItem[] = [
  { id: "1", name: "Brand_Film_Maison_Dupont_V1.mp4", url: "#", type: "Livrable", date: "2026-05-13", size: "2.4 Go" },
  { id: "2", name: "Facture_001_MaisonDupont.pdf",     url: "#", type: "Facture",  date: "2026-05-10", size: "48 Ko" },
  { id: "3", name: "Contrat_Prestation_2026.pdf",      url: "#", type: "Contrat",  date: "2026-05-05", size: "120 Ko" },
];

export const DEMO_MESSAGES: Message[] = [
  { id: "1", content: "Bonjour ! Le tournage s'est très bien passé, j'ai sélectionné les meilleurs plans. Montage en cours 🎬", author: "Monteur", date: "2026-05-10T09:00:00Z" },
  { id: "2", content: "Super nouvelles ! Vous avez une idée du rendu pour la séquence d'ouverture ?", author: "Client",  date: "2026-05-10T11:30:00Z" },
  { id: "3", content: "J'ai opté pour une ouverture en plan large avec un ralenti — ça pose bien l'atmosphère de la maison. Vous verrez ça dans la V1 !", author: "Monteur", date: "2026-05-11T08:15:00Z" },
  { id: "4", content: "La V1 est en ligne sur Frame.io, j'attends vos retours 👆", author: "Monteur", date: "2026-05-13T14:00:00Z" },
];
