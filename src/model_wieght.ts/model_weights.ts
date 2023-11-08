export class ModelWeight {
  public userTableMin(): Object {
    return {
      _id: 1,
      name: 1,
      email: 1,
    };
  }

  public userTableMedium(): Object {
    return {
      _id: 1,
      name: 1,
      email: 1,
      company: 1,
    };
  }


  public companyTableMin(): Object {
    return {
      _id: 1,
      companyName: 1,
    };
  }

  public companyTableMax(): Object {
    return {
      _id: 1,
      companyName: 1,
      industry: 1,
      ownerName: 1,
    };
  }
}
