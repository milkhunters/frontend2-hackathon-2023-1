export const getAllDialogs = async () => {
  return [
    null,
    [
      {
        id: "1",
        name: "serg",
        jobTitle: "Killer",
        avatar: "http://www.test.com/",
        department: "sales",
        role: 0,
      },
      {
        id: "2",
        name: "andew",
        jobTitle: "DeathEater",
        avatar: "http://www.test.com/",
        department: "fishing",
        role: 1,
      },
    ],
  ];
};

export const getDialogHistory = async (dialogId) => {
  return [
    null,
    {
      1: [
        {
          id: "0",
          createdAt: "2023-01-11",
          from: "you",
          text: "hello",
          fileName: "http://www.test.com/",
        },
      ],
      2: [
        {
          id: "1",
          createdAt: "2023-01-11",
          from: "name",
          text: "there",
          fileName: "http://www.com",
        },
      ],
    }[dialogId],
  ];
};

export const sendMessage = async (dialogId, message) => {
  return [null, null];
};
