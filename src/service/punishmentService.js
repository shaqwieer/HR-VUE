export const ProductService = {
    getProductsData() {
      return [
        {
          id: "1000",
          code: "18/3/2021",
          name: "محمد يسرى شوقى",
          category: "شديده",
          quantity: 8,
        },
        {
          id: "1001",
          code: "17/3/2021",
          name: "محمد يسرى شوقى",
          category: "خفيف",
          quantity: 7,
        },
        {
          id: "1002",
          code: "18/3/2022",
          name: "محمد احمد محمود",
          category: "متوسطه",
          quantity: 8,
        },
        {
          id: "1003",
          code: "18/3/2023",
          name: "محمد يسرى شوقى ",
          category: "شديده",
          quantity: 4,
        },
        {
          id: "1004",
          code: "14/3/2021",
          name: "محمد احمد محمود",
          category: "شديده",
          quantity: 3,
        },
        {
          id: "1005",
          code: "18/5/2021",
          name: "محمد احمد محمود",
          category: "خفيف",
          quantity: 7,
        },
        {
          id: "1006",
          code: "18/8/2021",
          name: "يسرى يسرى شوقى",
          category: "خفيف",
          quantity: 8,
        },
        {
          id: "1007",
          code: "18/7/2021",
          name: "يسرى يسرى شوقى",
          category: "شديده",
          quantity: 7,
        },
        {
          id: "1008",
          code: "18/9/2021",
          name: "يسرى يسرى شوقى",
          category: "خفيف",
          quantity: 3,
        },
        {
          id: "1009",
          code: "18/3/2013",
          name: "يسرى يسرى شوقى",
          category: "متوسطه",
          quantity: 6,
        },
        {
          id: "1010",
          code: "18/3/2015",
          name: "يسرى يسرى شوقى",
          category: "خفيف",
          quantity: 9,
        },
        {
          id: "1011",
          code: "18/1/2021",
          name: "يسرى يسرى شوقى",
          category: "شديده",
          quantity: 1,
        },
        {
          id: "1012",
          code: "18/2/2021",
          name: "يسرى يسرى شوقى",
          category: "متزوج",
          quantity: 3,
        },
        {
          id: "1013",
          code: "18/12/2021",
          name: "السيد يسرى شوقى",
          category: "خفيف",
          quantity: 9,
        },
        {
          id: "1014",
          code: "18/3/2021",
          name: "محمد السيد شوقى",
          category: "خفيف",
          quantity: 6,
        },
        {
          id: "1015",
          code: "18/3/2016",
          name: "محمد السيد شوقى",
          category: "متوسطه",
          quantity: 5,
        },
        {
          id: "1016",
          code: "18/5/2018",
          name: "محمد السيد شوقى",
          category: "متوسطه",
          quantity: 4,
        },
        {
          id: "1017",
          code: "18/7/2018",
          name: "محمد السيد شوقى",
          category: "متوسطه",
          quantity: 3,
        },
        {
          id: "1018",
          code: "18/3/2008",
          name: "محمد يسرى على",
          category: "متوسطه",
          quantity: 7,
        },
        {
          id: "1019",
          code: "18/11/2021",
          name: "محمد يسرى على",
          category: "متوسطه",
          quantity: 9,
        },
        {
          id: "1020",
          code: "18/3/2021",
          name: "محمد يسرى على",
          category: "شديده",
          quantity: 9,
        },
        {
          id: "1021",
          code: "18/3/2011",
          name: "محمد يسرى على",
          category: "متوسطه",
          quantity: 6,
        },
        {
          id: "1022",
          code: "18/3/2001",
          name: "محمد يسرى على",
          category: "متوسطه",
          quantity: 7,
        },
        {
          id: "1023",
          code: "18/3/2018",
          name: "محمد يسرى على",
          category: "شديده",
          quantity: 5,
        },
        {
          id: "1024",
          code: "18/3/2009",
          name: "محمد يسرى رضا",
          category: "متوسطه",
          quantity: 5,
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
  