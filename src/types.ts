export type Quote = {
  id: string;
  content: string;
};

export type DropResult = {
  source: {
    index: number;
    droppableId: string;
  };
  destination?: {
    index: number;
    droppableId: string;
  };
};
