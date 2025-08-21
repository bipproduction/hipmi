import { Prisma } from "@prisma/client";

export type ISticker = Prisma.StickerGetPayload<{
  select: {
    id: true;
    name: true;
    fileId: true;
    emotions: true;
  };
  include: {
    MasterEmotions: {
      select: {
        value: true;
      };
    };
  };
}>;