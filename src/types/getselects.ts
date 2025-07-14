export interface BrandModelComplectation {
    brands: string[];
    car_data: {
      [brand: string]: {
        [model: string]: string[];
      };
    };
  }
  