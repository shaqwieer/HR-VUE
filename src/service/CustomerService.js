export const ProductService = {
  getProductsData() {
    return [
      {
        id: "1000",
        code: "1",
        name: "محمد يسرى شوقى",
        category: "متزوج",
        quantity: 16000,
      },
      {
        id: "1001",
        code: "2",
        name: "احمد ايهاب مسعود",
        category: "اعزب",
        quantity: 66666,
      },
      {
        id: "1002",
        code: "3",
        name: "محمد احمد محمود",
        category: "اعزب",
        quantity: 87643,
      },
      {
        id: "1003",
        code: "4",
        name: "محمد شوقى يسرى ",
        category: "متزوج",
        quantity: 2345,
      },
      {
        id: "1004",
        code: "5",
        name: "محمد شوقى شوقى",
        category: "اعزب",
        quantity: 15678,
      },
      {
        id: "1005",
        code: "6",
        name: "محمد يسرى يسرى",
        category: "اعزب",
        quantity: 18790,
      },
      {
        id: "1006",
        code: "7",
        name: "يسرى يسرى شوقى",
        category: "متزوج",
        quantity: 16777,
      },
      {
        id: "1007",
        code: "8",
        name: "اسلام يسرى شوقى",
        category: "اعزب",
        quantity: 12366,
      },
      {
        id: "1008",
        code: "9",
        name: "محمد اسلام شوقى",
        category: "متزوج",
        quantity: 12886,
      },
      {
        id: "1009",
        code: "10",
        name: "محمد يسرى اسلام",
        category: "اعزب",
        quantity: 16000,
      },
      {
        id: "1010",
        code: "11",
        name: "محمود يسرى شوقى",
        category: "اعزب",
        quantity: 16000,
      },
      {
        id: "1011",
        code: "12",
        name: "محمد محمود شوقى",
        category: "متزوج",
        quantity: 14689,
      },
      {
        id: "1012",
        code: "13",
        name: "محمد يسرى محمود",
        category: "متزوج",
        quantity: 16523,
      },
      {
        id: "1013",
        code: "14",
        name: "السيد يسرى شوقى",
        category: "اعزب",
        quantity: 13689,
      },
      {
        id: "1014",
        code: "15",
        name: "محمد السيد شوقى",
        category: "متزوج",
        quantity: 95678,
      },
      {
        id: "1015",
        code: "16",
        name: "محمد يسرى السيد",
        category: "اعزب",
        quantity: 23456,
      },
      {
        id: "1016",
        code: "17",
        name: "على يسرى شوقى",
        category: "متزوج",
        quantity: 14567,
      },
      {
        id: "1017",
        code: "18",
        name: "محمد على شوقى",
        category: "اعزب",
        quantity: 78906,
      },
      {
        id: "1018",
        code: "19",
        name: "محمد يسرى على",
        category: "اعزب",
        quantity: 76543,
      },
      {
        id: "1019",
        code: "20",
        name: "مفتاح يسرى شوقى",
        category: "متزوج",
        quantity: 12345,
      },
      {
        id: "1020",
        code: "21",
        name: "محمد مفتاح شوقى",
        category: "اعزب",
        quantity: 13456,
      },
      {
        id: "1021",
        code: "22",
        name: "محمد يسرى مفتاح",
        category: "متزوج",
        quantity: 77777,
      },
      {
        id: "1022",
        code: "23",
        name: "محمد رضا شوقى",
        category: "اعزب",
        quantity: 77777,
      },
      {
        id: "1023",
        code: "23",
        name: "رضا يسرى شوقى",
        category: "اعزب",
        quantity: 23456,
      },
      {
        id: "1024",
        code: "25",
        name: "محمد يسرى رضا",
        category: "متزوج",
        quantity: 12345,
      },
      
    ];
  },

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  },

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  },

  getProducts() {
    return Promise.resolve(this.getProductsData());
  },

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  },

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  },
};
