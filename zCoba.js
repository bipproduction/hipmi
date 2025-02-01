const data = [
  {
    authorId: "clx8pl7r90005su4mldioo0v1",
    Donasi: {
      id: "clyr304q0000410ljvzms3mag",
      title: "Donasi Bencana Alam Aceh",
    },
  },
  {
    authorId: "clx8pl7r90005su4mldioo0v1",
    Donasi: {
      id: "clyr304q0000410ljvzms3mag",
      title: "Donasi Bencana Alam Aceh",
    },
  },
  {
    authorId: "clycka5eu0001ina3i1ssgze9",
    Donasi: {
      id: "clyr304q0000410ljvzms3mag",
      title: "Donasi Bencana Alam Aceh",
    },
  },
];

console.log(new Set(data.map((d) => d.authorId)));
// v003
